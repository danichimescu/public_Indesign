/*

PDF Export Folder
Copyright 2020 William Campbell
All Rights Reserved
https://www.marspremedia.com/contact

Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

//@target indesign

(function () {

	// Preserve preferences.
	var scriptPreferencesUserInteractionLevel = app.scriptPreferences.userInteractionLevel;
	var pdfExportPreferencesViewPDF = app.pdfExportPreferences.viewPDF;

	// Script variables.
	var doneMessage;
	var folderInput; // Folder
	var pdfPreset; // PDFExportPreset
	var pdfPresetNames = [];

	// Reusable UI variables.
	var g; // group
	var p; // panel
	var w; // window

	// Permanent UI variables.
	// Prefixes:
	//   btn  = "button"
	//   cb   = "checkbox"
	//   txt  = "statictext"
	//   inp  = "edittext"
	//   list = "dropdownlist"
	var btnCancel;
	var btnOk;
	var btnFolderInput;
	var cbReplaceOutput;
	var cbSubfolders;
	var inpSuffix;
	var listPdfPresets;
	var txtFolderInput;

	// Load application PDF presets.
	pdfPresetNames = app.pdfExportPresets.everyItem().name;
	pdfPresetNames.sort();

	// CREATE USER INTERFACE

	w = new Window("dialog", "PDF Export Folder");
	w.alignChildren = "fill";

	// Panel 'Process'
	p = w.add("panel", undefined, "Process");
	p.alignChildren = "left";
	p.margins = [18, 24, 18, 12];
	g = p.add("group");
	btnFolderInput = g.add("button", undefined, "Folder...");
	txtFolderInput = g.add("statictext", undefined, "", {
		truncate: "middle"
	});
	txtFolderInput.characters = 41;
	g = p.add("group");
	g.margins = [36, 6, 0, 0];
	cbSubfolders = g.add("checkbox", undefined, "Include subfolders");

	// Panel 'Options'
	p = w.add("panel", undefined, "Options");
	p.alignChildren = "left";
	p.margins = [18, 18, 18, 12];
	g = p.add("group");
	g.add("statictext", undefined, "PDF Preset:");
	listPdfPresets = g.add("dropdownlist", undefined, undefined, {
		items: pdfPresetNames
	});
	listPdfPresets.preferredSize = [246, -1]; // 246 pixels wide, default height.
	g = p.add("group");
	g.add("statictext", undefined, "Original file name  +");
	inpSuffix = g.add("edittext");
	inpSuffix.characters = 18;
	g = p.add("group");
	g.margins = [0, 6, 0, 0];
	cbReplaceOutput = g.add("checkbox", undefined, "Replace existing output files");

	// Action Buttons
	g = w.add("group");
	g.alignment = "center";
	btnOk = g.add("button", undefined, "OK");
	btnCancel = g.add("button", undefined, "Cancel");

	// UI ELEMENT EVENT HANDLERS

	// Panel 'Process'
	btnFolderInput.onClick = function () {
		var f = Folder.selectDialog("Select folder to process");
		if (f) {
			txtFolderInput.text = Folder.decode(f.fsName);
			folderInput = f;
		}
	};

	// Panel 'Options'
	inpSuffix.onChange = function () {
		// Trim.
		this.text = this.text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		// Remove any periods.
		this.text = this.text.replace(/\.+/g, "");
		// Remove illegal characters.
		var s = this.text.replace(/[\/\\:*?"<>|]/g, "");
		if (this.text != s) {
			this.text = s;
			alert("Illegal characters detected and removed.");
		}
	};

	// Action Buttons
	btnOk.onClick = function () {
		if (!txtFolderInput.text) {
			alert("Select folder to processs.");
			return;
		}
		if (!listPdfPresets.selection) {
			alert("Select PDF Preset.");
			return;
		}
		w.close(1);
	};
	btnCancel.onClick = function () {
		w.close(0);
	};

	// DISPLAY THE DIALOG

	if (w.show() == 1) {
		try {
			// Suppress app messages, i.e. profile mismatch.
			app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
			process();
			if (!doneMessage) {
				doneMessage = "Processing complete.";
			}
			alert(doneMessage);
		} catch (e) {
			alert("An error has occurred.\nLine " + e.line + ": " + e.message);
		}
		// Restore preferences.
		app.scriptPreferences.userInteractionLevel = scriptPreferencesUserInteractionLevel;
		app.pdfExportPreferences.viewPDF = pdfExportPreferencesViewPDF;
		// Restore PDF export preferences to all pages.
		// (must set twice, once text another enumerated value).
		app.pdfExportPreferences.pageRange = "All Pages";
		app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
	}

	//====================================================================
	//               END PROGRAM EXECUTION, BEGIN FUNCTIONS
	//====================================================================

	function getFiles(folder, subfolders) {
		// folder = folder object, not folder name.
		// subfolders = bool, true = include subfolders.
		var d = [];
		var f;
		var files;
		var i;
		files = folder.getFiles();
		for (i = 0; i < files.length; i++) {
			f = files[i];
			if (f instanceof Folder && subfolders) {
				// Recursive (function calls itself).
				d = d.concat(getFiles(f, subfolders));
			} else if (f instanceof File && !f.hidden) {
				if (/indd$/i.test(f.name)) {
					// InDesign file.
					d.push(f);
				}
			}
		}
		return d;
	}

	function process() {
		// var doneMessage, parent scope.
		// var folderInput, parent scope.
		// var pdfPreset, parent scope.
		var files;
		var i;
		pdfPreset = app.pdfExportPresets.item(String(listPdfPresets.selection));
		files = getFiles(folderInput, cbSubfolders.value);
		if (!files.length) {
			// Nothing to process.
			doneMessage = "No InDesign files found in selected folder.";
			return;
		}
		// Don't view PDFs after export.
		app.pdfExportPreferences.viewPDF = false;
		progress(files.length);
		for (i = 0; i < files.length; i++) {
			processFile(files[i]);
			progress.increment();
		}
		progress.close();
	}

	function processFile(file) {
		// var pdfPreset, parent scope.
		var doc;
		var filePdf;
		var name;
		var replace;
		doc = app.open(file);
		filePdf = new File(file.fullName.replace(/\.indd$/i, "") + inpSuffix.text + ".pdf");
		name = File.decode(filePdf.name);
		progress.message("Exporting " + name);
		replace = true;
		if (!cbReplaceOutput.value && filePdf.exists) {
			replace = confirm("File exists. Replace?\n" + name, true);
		}
		if (replace) {
			app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
			doc.exportFile(ExportFormat.PDF_TYPE, filePdf, false, pdfPreset);
		}
		doc.close(SaveOptions.NO);
	}

	function progress(steps) {
		var b;
		var t;
		var w;
		w = new Window("palette", "Progress", undefined, {
			closeButton: false
		});
		t = w.add("statictext");
		t.preferredSize = [450, -1]; // 450 pixels wide, default height.
		if (steps) {
			b = w.add("progressbar", undefined, 0, steps);
			b.preferredSize = [450, -1]; // 450 pixels wide, default height.
		}
		progress.close = function () {
			w.close();
		};
		progress.increment = function () {
			b.value++;
		};
		progress.message = function (message) {
			t.text = message;
			w.update();
		};
		w.show();
	}

})();
