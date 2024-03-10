/*
This is an Work in progress project!
Do something useful here
batch process for multiple indesing file

if you know some script you can use it here for batch


This is a work in progress!

An modified version of open source BatchConvert by Peter Kahrel - Thank you very much Peter :)

Copyright 2024 Dan Ichimescu 
All Rights are not Reserved
constantindan@gmail.com

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

//#target indesign;

var date = new Date();
var year = new String(date.getYear() - 100);
var dateString =
	date.getDate() +
	"-" +
	(date.getMonth() + 1) +
	"-" +
	year +
	"  ora: " +
	date.getHours() +
	":" +
	date.getMinutes() +
	":" +
	date.getSeconds();
var dateString_ziua =
	"" + date.getDate() + "_" + (date.getMonth() + 1) + "_" + year;
var dateZiOraMin =
	"_" +
	date.getDate() +
	"_ora_" +
	date.getHours() +
	"_min_" +
	date.getMinutes();

var dimensionsVisibilTotal = [];
var effectivePPiarray = [];
var infoRaport = [];

try {
	batch_convert();
} catch (e) {
	alert(e.message + " (line " + e.line + ")");
}
// batch_convert()

function batch_convert() {
	function find_documents(params) {
		function find_opendocs(docs, params) {
			var a = [];
			for (var i = 0; i < docs.length; i++) {
				try {
					// Documents that have never been saved have no full name (they have a name,
					// but not a path, so we save them to give them a fullName
					if (docs[i].saved == false) {
						docs[i].save(File(params.input_folder + docs[i].name));
					}
					a.push(docs[i].fullName);
				} catch (e) {
					batch_problems.push(docs[i].name + ": " + e.message);
				}
			}
			return a;
		}

		// BEGIN find_documents
		if (app.documents.length > 0) {
			// collect names of open docs
			return find_opendocs(app.documents, params);
		} else {
			// or get a folder from the user
			return find_files(params.input_folder, params.include_subdir, ["indd"]); //params.source_type);
		}
	}

	// BEGIN batch_convert

	var params = get_data(File(script_dir() + "batch_process.txt"));

	/// check
	if (params.checkagainst_Indd || params.checkagainst_Tiff) {
		if (params.checkagainst_Indd) {
			// var txtFileMaster = find_files(params.input_folder, false, ["txt"]);
			// var txtFileIndd = find_files(params.input_folder, false, ["txt"]);
			// var originalPath = Folder.current.toString();
			// alert(originalPath)
			// Set the desired default location
			//d:\lucru\sovis\vets\mape stanta\
			// "/C/Users/YourUsername/Documents"

			///E/lucru/marcu/PMI_RO_ILUMA_T.F.UIC BR + IR orders/test
			// var defaultLocation = "\"" + params.input_folder + "\""; // Change this to your desired path

			var defaultLocation = params.input_folder;
			// Change the current working directory
			Folder.current = new Folder(defaultLocation);

			// alert(infolder_name.text)
			// var txtFileMaster = File(Folder.current).selectDlg("Select master txt file", "*.txt")

			var txtFolderFilePhIndd = Folder(params.input_folder).selectDlg(
				"Choose a folder"
			);
			// alert(txtFolderFilePhIndd)
			var txtFileMaster = String(txtFolderFilePhIndd).replace(/\/_result/g, "");
			// alert(txtFileMaster)
			// var txtFileMaster=Path(txtFileMasterStr)
			// var newPath = originalPath.replace(/_result/g, "");

			var txtfile_indd = find_files(txtFolderFilePhIndd, false, [
				"_indesign*.txt",
			]); // _indesing
			var txtfile_master = find_files(txtFileMaster, false, ["_master*.txt"]);

			if (File(txtfile_master).exists == true) {
				// for (var i = 0; i < arrtxtfile.length; i++) {
				// 	alert("i " + i + "  " + arrtxtfile[i].name)

				// }

				// var txtFileMaster = File(params.input_folder).selectDlg("Select master txt file", "*.txt")
				// var txtFileMaster = File.openDialog("Select master txt file", "*.txt");
				var outputFiles = "indd";
				if (File(txtfile_indd).exists == true) {
					checkDimensionAgainst_master(
						txtfile_indd,
						txtfile_master,
						outputFiles
					);

					writeReport(infoRaport, params, outputFiles);
				} else {
					alert("indesing report not found!");
				}
			} else {
				alert("master report not found!");
			}
		}
		if (params.checkagainst_Tiff) {
			var txtFolderFilePhIndd = Folder(params.input_folder).selectDlg(
				"Choose a folder"
			);
			var txtFileMaster = String(txtFolderFilePhIndd).replace(/\/_result/g, "");
			var txtfile_ph = find_files(txtFolderFilePhIndd, false, [
				"_photoshop*.txt",
			]); //
			var txtfile_master = find_files(txtFileMaster, false, ["_master*.txt"]);
			var outputFiles = "tif";
			// alert("txtfile_ph " + txtfile_ph)
			if (File(txtfile_master).exists == true) {
				if (File(txtfile_ph).exists == true) {
					checkDimensionAgainst_master(txtfile_ph, txtfile_master, outputFiles);
					writeReport(infoRaport, params, outputFiles);
				} else {
					alert("photoshop report not found!");
				}
			} else {
				alert("master report not found!");
			}
		}
		//// check}
	} else {
		// Collect the names of the files that couldn't be processed -- keep this one global
		var batch_problems = [];
		var all_docs = find_documents(params);
		batch_problems = process_docs(all_docs, params, batch_problems);
		try {
			Window.find("palette", "Processing").close();
		} catch (_) {
			//$.bp();
		}
		// app.pdfExportPreferences.viewPDF = viewPdf;
		if (batch_problems.length > 0) {
			alert("Problems with:\r\r" + batch_problems.join("\r"));
		}
	}
} // end batch_convert

// End --------------------------------------------------------------------------------------------------

function process_docs(docs, params, batch_problems) {
	// var iaPdfView = app.interactivePDFExportPreferences.viewPDF;
	// app.interactivePDFExportPreferences.viewPDF = false;

	function strip_drive(doc) {
		// Remove the drive from a path: /d/test/ > test/
		return String(doc.filePath).replace(/\/[^\/]+\//, "");
	}

	// function getScriptLanguage(s) {
	// 	// Get the file type, then standardise js/jsx/jsxbin
	// 	var fileType = s.toLowerCase().replace(/.+\./, '').replace(/jsx?(bin)?/, 'js');
	// 	switch (fileType) {
	// 		case 'js': return ScriptLanguage.JAVASCRIPT;
	// 		case 'scpt': return ScriptLanguage.APPLESCRIPT_LANGUAGE;
	// 		case 'vbs': return ScriptLanguage.VISUAL_BASIC;
	// 		default: return null;
	// 	}
	// }

	var longest_name = get_longest(docs) + 6;
	var show_filename = create_message_window(longest_name);
	show_filename.show();
	show_filename.update(); // am adaugat eu
	var current_doc, output_name, outfile, outfolder, imgs, z;
	var re = /\.[^\.]+$/; // Match any file extension, i.e. anything between the last dot and the end of the string

	for (var i = 0; i < docs.length; i++) {
		try {
			current_doc = open_doc(docs[i], params);

			try {
				show_filename.message.text =
					decodeURI(docs[i].fullName) +
					" (" +
					Number(i + 1) +
					" of " +
					docs.length +
					")";
			} catch (_) {
				show_filename.message.text =
					decodeURI(docs[i].fullName.replace(/%/g, "_")) +
					" (" +
					Number(i + 1) +
					" of " +
					docs.length +
					")";
			}

			// if (params.overwrite == false) {
			// 	outfile = File(unique_name(outfile));
			// }

			if (params.update_links) {
				try {
					current_doc.links.everyItem().update();
				} catch (_) {
					batch_problems.push("Missing links in " + decodeURI(docs[i]));
				}
			}

			if (params.close_visible) {
				current_doc.layers.itemByName("vizibil").visible = false;
				current_doc.save();
			}
			if (params.open_visible) {
				current_doc.layers.itemByName("vizibil").visible = true;
				current_doc.save();
			}

			//current_doc.layers.itemByName("id").visible = true

			///////-------------->>>>>>> -------------->>>>>>> -------------->>>>>>> do something useful here

			if (params.tempUseful) {
				var sourceSpreads = current_doc.spreads;
				for (var i = 0; i < sourceSpreads.length; i++) {
					var item,
						items = sourceSpreads[i].allPageItems;

					for (var j = 0; j < items.length; j++) {
						// try { items[j].locked = false } catch (_) { };
						// try {
						if (items[j].label === "Vizibil") {
							current_doc.layers.itemByName("vizibil").locked = false;
							current_doc.layers.itemByName("vizibil").visible = true;

							var myItem_vizibil = items[j];

							// myItem_vizibil.label = "Vizibil";
							myItem_vizibil.name = "RectangleVizibil";
							myItem_vizibil.fillColor = "None";
							// myItem_vizibil.strokeColor = myColorforvizibil;
							// myItem_vizibil.strokeWeight = 1;
							// myItem_vizibil.strokeTint = 100;
							// myItem_vizibil.strokeAlignment = StrokeAlignment.INSIDE_ALIGNMENT;
							// myItem_vizibil.overprintFill = false;
							myItem_vizibil.transparencySettings.blendingSettings.opacity = 100;
							myItem_vizibil.transparencySettings.blendingSettings.blendMode =
								BlendMode.NORMAL;

							current_doc.layers.itemByName("id").visible = true;
							current_doc.layers.itemByName("vizibil").locked = true;
						}
						// } catch (_) { };
					}
				}
			}

			////// write visible and page dimension in a file

			if (params.write_Dimensions) {
				writeDimensionsVisiblePageWH(current_doc);
			}

			////// write visible and page dimension in a file

			if (params.write_effectivePPI) {
				writeEffectivePpi(current_doc);
			}

			///////------ -------->>>>>>>-------->>>>>>>-------->>>>>>>-------->>>>>>>-------->>>>>>>

			// current_doc.save(); //

			show_filename.update(); // 2 update eu // !! merge aici
		} catch (e) {
			batch_problems.push(
				decodeURI(docs[i]) + ": " + e.message + " (" + e.line + ")"
			);
		}

		// if (params.save_docs) {
		// 	current_doc.save();
		// }
		if (params.close_open_docs) {
			try {
				current_doc.close(SaveOptions.NO);
			} catch (_) {
				batch_problems.push("Problem closing " + decodeURI(docs[i]));
			}
		}
	}
	//show_filename.update(); // 2 update eu // nu merge aici

	if (params.close_open_docs) {
		for (var i = app.documents.length - 1; i > -1; i--) {
			app.documents[i].close(SaveOptions.no);
		}
	}
	// app.interactivePDFExportPreferences.viewPDF = iaPdfView;
	if (params.write_Dimensions) {
		writeDimensions(dimensionsVisibilTotal, params);
	}
	// writeDimensions(dimensionsVisibilTotal, params);

	if (params.write_effectivePPI) {
		writeEffectivePPi_file(effectivePPiarray, params);
	}

	return batch_problems;
} // process_docs

//------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------

function open_doc(f, params) {
	if (params.ignore_errors) {
		app.scriptPreferences.userInteractionLevel =
			UserInteractionLevels.NEVER_INTERACT;
	} else {
		app.scriptPreferences.userInteractionLevel =
			UserInteractionLevels.INTERACT_WITH_ALL;
	}
	// If any documents are open or if a script should run, the 'false' parameter shouldn't be used
	if (
		app.documents.length > 0 ||
		params.runscript_check ||
		!params.ignore_errors
	) {
		app.open(f);
	} else {
		app.open(f, false);
	}
	app.scriptPreferences.userInteractionLevel =
		UserInteractionLevels.INTERACT_WITH_ALL;
	return /\.indb$/.test(f.name) ? app.books[0] : app.documents[0];
}

// Return the longest file name
function get_longest(docs) {
	var longest = 0;
	for (var i = 0; i < docs.length; i++) {
		longest = Math.max(longest, docs[i].fullName.length);
	}
	return longest;
}

function create_message_window(le) {
	var w = new Window('palette {text: "Processing"}');
	w.message = w.add("statictext", undefined, "");
	w.message.characters = le;
	return w;
}

// The interface ===============================================================

function get_data(history) {
	// if (history.exists == true) {
	// 	alert("history exists")
	// }
	var icons = define_icons();
	var w = new Window("dialog", "Batch process do something useful", undefined, {
		closeButton: false,
	});
	w.orientation = "row";
	w.alignChildren = ["top", "top"];
	var w1 = w.add("group");
	w1.alignChildren = "fill";
	var main = w1.add('group {alignChildren: "fill", orientation: "column"}');
	var folder = main.add('panel {alignChildren: "right"}');

	var infolder = folder.add(
		'group {_: StaticText {text: "Indd/txt Input folder:"}}'
	);
	var inp = infolder.add('group {alignChildren: "left", orientation: "stack"}');
	if (File.fs != "Windows") {
		var inlist = inp.add("dropdownlist");
	}
	var infolder_name = inp.add("edittext");
	if (File.fs == "Windows") {
		var inlist = inp.add("dropdownlist");
	}
	inlist.preferredSize = [330, 22];
	infolder_name.preferredSize = [310, 22];

	var infolder_button = infolder.add("iconbutton", undefined, icons.folder, {
		style: "toolbutton",
	});

	// outfolder_name
	// var outfolder = folder.add('group {orientation: "row", _: StaticText {text: "Output folder:"}}');
	// var outfolder_name = outfolder.add('edittext');
	// outfolder_name.preferredSize.width = 330;
	// var outfolder_button = outfolder.add('iconbutton', undefined, icons.folder, { style: 'toolbutton' });

	var check_boxes = folder.add('group {orientation: "row"}');
	check_boxes.margins.right = 45;
	var subfolders = check_boxes.add("checkbox", undefined, "Include subfolders");
	subfolders.enabled = app.documents.length == 0;
	var ignore_errors = check_boxes.add("checkbox", undefined, "Ignore errors");
	// overwrite
	// var overwrite = check_boxes.add('checkbox', undefined, 'Overwrite existing files');

	// var source_list = (['InDesign'])
	// var target_list = (['InDesign'])

	// var swapFormats = "X";

	var miscOptions = main.add(
		'panel {text: "Useful things..", alignChildren: ["left", "top"], orientation: "row"}'
	);

	// var miscOptions1 = miscOptions.add('group {alignChildren: ["left", "top"]}');
	var miscOptions1 = miscOptions.add(
		'group {orientation: "column", alignChildren: "left"}'
	);
	// var pdf_presetGroup = pdfOptions.add('group {alignChildren: ["left", "top"]}');
	miscOptions1.spacing = 2;
	/// close visible
	var close_visible = miscOptions1.add(
		"checkbox",
		undefined,
		"Close visible layer"
	);
	// close_visible.value = true;
	var open_visible = miscOptions1.add(
		"checkbox",
		undefined,
		"Open visible layer"
	);

	//write_Dimensions
	var write_Dimensions = miscOptions1.add(
		"checkbox",
		undefined,
		"Write report W H (total) and w h (visible)"
	);
	var write_effectivePPI = miscOptions1.add(
		"checkbox",
		undefined,
		"Write report Effective PPI"
	);
	// var save_docs = misc_options.add('checkbox', undefined, 'Save changed documents on closing');

	var tempUseful = miscOptions1.add("checkbox", undefined, "some script temp");

	// check
	var checking = miscOptions.add(
		'group {orientation: "column", alignChildren: "left"}'
	);
	checking.spacing = 2;

	var checkagainst_Indd = checking.add(
		'checkbox {text: "Check dimensions: excel(txt) <-> indd (txt)"}'
	);
	var checkagainst_Tiff = checking.add(
		'checkbox {text: "Check dimensions: excel(txt) <-> tiff (txt)"}'
	);

	var options = main.add(
		'panel {text: "Miscellaneous", alignChildren: "left"}'
	);

	var misc_options = options.add(
		'group {alignChildren: "left", orientation: "column"}'
	);

	var update_links = misc_options.add(
		"checkbox",
		undefined,
		"Update modified links before exporting (missing links are always ignored)"
	);
	var close_open_docs = misc_options.add(
		"checkbox",
		undefined,
		"Close open documents"
	);
	var save_docs = misc_options.add(
		"checkbox",
		undefined,
		"Save changed documents on closing"
	);

	var bpresets = get_batch_presets();
	var batch_preset_panel = main.add('panel {orientation: "row"}');
	batch_preset_panel.add('statictext {text: "Batch processor preset:"}');
	var batch_presets = batch_preset_panel.add(
		"dropdownlist",
		undefined,
		bpresets
	);
	var save_preset_icon = batch_preset_panel.add(
		"iconbutton",
		undefined,
		icons.save,
		{ style: "toolbutton" }
	);
	var delete_preset_icon = batch_preset_panel.add(
		"iconbutton",
		undefined,
		icons.bin,
		{ style: "toolbutton" }
	);
	batch_presets.selection = 0;
	batch_presets.preferredSize.width = 220;

	var buttons = w.add('group {orientation: "column", alignChildren: "fill"}');
	var okButton = buttons.add("button", undefined, "OK");
	buttons.add("button", undefined, "Cancel", { name: "cancel" });
	// helptip_button = buttons.add('checkbox {text: "Show tool tips"}');
	save_settings = buttons.add('checkbox {text: "Save settings"}');

	function get_batch_presets() {
		var p = [];
		var f = Folder(script_dir()).getFiles("*.batch_process");
		for (var i = 0; i < f.length; i++) {
			p.push(decodeURI(f[i].name.replace(/\.batch_process$/, "")));
		}
		if (p.length > 1) p.sort();
		p.unshift("[None]");
		return p;
	}

	// batch presets ----------------------------------------------------------------------------------------------------------------------------------

	batch_presets.onChange = function () {
		if (batch_presets.selection.text == "[None]") return;
		var path = script_dir();
		var previous = get_previous(
			File(path + batch_presets.selection.text + ".batch_preset")
		);
		set_dialog(previous);
	};

	delete_preset_icon.onClick = function () {
		var path = script_dir();
		if (askYN("Delete " + batch_presets.selection.text + "?") == true) {
			try {
				File(
					path + "/" + batch_presets.selection.text + ".batch_preset"
				).remove();
				batch_presets.remove(batch_presets.find(batch_presets.selection.text));
				batch_presets.selection = 0;
			} catch (_) {
				alert("Could not remove " + batch_presets.selection.text);
			}
		}
	}; // delete_preset.onClick

	save_preset_icon.onClick = function () {
		// var outfile = get_filename(batch_presets.selection.text);
		// if (outfile == '') return;
		// if (batch_presets.find(outfile.menu_name) == null) {
		// 	insert_item(batch_presets, outfile.menu_name);
		// }
		// batch_presets.selection = batch_presets.find(outfile.menu_name);
		var dlg_data = collect_dlg_data();
		// store_settings(outfile.file, dlg_data);
		store_settings(dlg_data);
	};

	function get_filename(str) {
		var path = script_dir();
		var name = get_name(str);
		if (name == "") return "";
		var f = File(path + name + ".batch_preset");
		while (f.exists && askYN("Preset exists -- replace?") == false) {
			name = get_name(str);
			if (name == "") return "";
			f = File(path + name + ".batch_preset");
		}
		return { file: f, menu_name: name };
	}

	function get_name(str) {
		var w = new Window('dialog {alignChildren: "right"}');
		var gr = w.add('group {_: StaticText {text: "Save preset as:"}}');
		var e = gr.add("edittext {characters: 20, active: true}");
		e.text = str;
		var buttons = w.add("group");
		buttons.add('button {text: "Cancel"}');
		var ok = buttons.add('button {text: "OK"}');

		if (w.show() == 1) {
			return e.text;
		}
		return "";
	}

	function askYN(s) {
		var w = new Window("dialog", "", undefined, { closeButton: false });
		w.add('group {_: StaticText {text: "' + s + '"}}');
		var buttons = w.add("group");
		buttons.add("button", undefined, "No", { name: "cancel" });
		buttons.add("button", undefined, "Yes", { name: "ok" });
		return w.show() == 1 ? true : false;
	}

	function insert_item(list_obj, new_item) {
		if (list_obj.find(new_item) == null) {
			var stop = list_obj.items.length;
			var i = 0;
			while (i < stop && new_item > list_obj.items[i].text) {
				i++;
			}
			list_obj.add("item", new_item, i);
		}
	}

	// end batch presets -------------------------------------------------------------------------------------------------------------------------------

	// helptip_button.onClick = function () { set_helptips(helptip_button.value) }

	//------------------------------------------------------------------------------------------------------------------------------------

	function find_scripts() {
		// scpt, js, jsx, jsxbin, vbs
		var script_files = Folder(script_dir()).getFiles(function (f) {
			return f.name.search(/\.scpt|\.jsx?(?:bin)?|\.vbs/i) > 0; // scpt, js, jsx, jsxbin, vbs
		});

		var file_array = [];
		var le = script_files.length;
		for (var i = 0; i < le; i++) {
			file_array[i] = script_files[i].name;
		}
		file_array.unshift("[None]");
		return file_array;
	}

	// pack_pdf.onClick = function () {
	// 	pdfOptions.enabled = this.value;
	// 	//pdf_presetGroup.enabled = true;
	// }

	inlist.onChange = function () {
		// infolder_name.text = outfolder_name.text = inlist.selection.text
	};

	infolder_name.onChange = function () {
		// add slash if necessary
		this.text = this.text.replace(/([^\/])$/, "$1/");
		if (Folder(this.text).exists == false) {
			this.text = "Folder does not exist".toUpperCase();
		} else {
			// outfolder_name.text = this.text;
		}
		this.active = true;
	};

	// outfolder_name.onChange = function () {
	// 	if (this.text != '' && Folder(this.text).exists == false) {
	// 		this.text = 'Folder does not exist';
	// 	} else if (this.text != '' && Folder(this.text).exists == true) {
	// 		this.text = this.text.replace(/([^\/])$/, '$1/');
	// 	} else {
	// 		this.active = true;
	// 	}
	// }

	infolder_button.onClick = function () {
		var f = Folder(infolder_name.text).selectDlg("Choose a folder");
		if (f != null) {
			infolder_name.text = f.fullName + "/";
			outfolder_name.text = f.fullName + "/";
			infolder_name.active = true;
		} else {
			return 0;
		}
	};

	// outfolder_button.onClick = function () {
	// 	var f = Folder(outfolder_name.text).selectDlg('Choose a folder');
	// 	if (f != null) {
	// 		outfolder_name.text = f.fullName + '/';
	// 		outfolder_name.active = true;
	// 	} else {
	// 		return 0;
	// 	}
	// }
	// close_visible.enabled = true;
	// close_visible.value = true;

	close_visible.onClick = function () {
		// closeVisibleLayer = true;
		// openVisibleLayer = false;
		if (this.value) {
			open_visible.value = false;
		}
		// alert(closeVisibleLayer + " " + openVisibleLayer)
	};
	open_visible.onClick = function () {
		// closeVisibleLayer = false;
		// openVisibleLayer = true;
		if (this.value) {
			close_visible.value = false;
		}
		// alert(closeVisibleLayer + " " + openVisibleLayer)
	};
	//~ 	pdf_per_page.onClick = function () {
	//~ 		if (this.value) {
	//~ 			pdf_per_offset.value = false;
	//~ 		}
	//~ 	}

	//~ 	pdf_per_offset.onClick = function () {
	//~ 		if (this.value) {
	//~ 			pdf_per_page.value = false;
	//~ 		}
	//~ 	}

	// Defaults -----------------------------------------------------------------------------------------
	var ID = parseFloat(app.version);

	// set some more things in the dialog, either from a file...
	if (history.exists == true) {
		var previous = get_previous(history);
		set_dialog(previous);
		// if (previous.helptips == undefined) {
		// 	helptip_button.value = true;
		// } else {
		// 	helptip_button.value = previous.helptips;
		// }
	} else {
		//... or some defaults
		// source_list.selection = source_list.find('InDesign');
		// target_list.selection = target_list.find('PDF');
		// outlines.enabled = false;
		//scriptdropdown.selection = 0;
		// runscriptScript.text = '';
	}

	// set dialog from file ------------------------------------------------------------------------------------------------------

	function set_dialog(previous) {
		infolder_name.text = fill_list(inlist, previous.input_folder);
		// outfolder_name.text = previous.output_folder;
		subfolders.value = previous.include_subdir;
		ignore_errors.value = previous.ignore_errors;
		open_visible.value = previous.open_visible;
		//write_Dimensions
		write_Dimensions.value = previous.write_Dimensions;
		tempUseful.value = previous.tempUseful;
		write_effectivePPI.value = previous.write_effectivePPI;
		close_visible.value = previous.close_visible;
		checkagainst_Indd.value = previous.checkagainst_Indd;
		checkagainst_Tiff.value = previous.checkagainst_Tiff;

		update_links.value = previous.update_links;
		// outlines.value = previous.outlines;
		if (app.documents.length > 0) {
			infolder_name.text = "";
		}

		save_docs.value = previous.save_docs;
		if (previous.batch_preset != null) {
			batch_presets.selection = batch_presets.find(previous.batch_preset) || 0;
		}
	}

	// end set dialog from file ---------------------------------------------------------------------------------------------------

	if (app.documents.length > 0) {
		subfolders.value = false;
		infolder.enabled = false;
		// source_list.selection = source_list.find('InDesign');
		// source_group.enabled = false;
		// outfolder_name.active = true;
	} else {
		close_open_docs.value = true;
		close_open_docs.enabled = false;
	}

	w.onShow = function () {
		save_settings.value = true;
		pdf_presetlist.revealItem(previous.pdf_preset[0]);
		separate_PDF_pages.notify();
		separate_PDF_pages.notify();
	};

	if (w.show() == 2) {
		// 2 inseamna cancel
		var dlg_data = collect_dlg_data();
		if (save_settings.value) {
			store_settings(history, dlg_data);
			// Need to store the preset, it overwrites the default presets.
			store_settings(
				File(
					script_dir() +
					batch_presets.selection.text.replace(/[\[\]]/g, "") +
					".batch_process"
				),
				dlg_data
			);
		}
		w.close();
		// dlg_data.input_folder = infolder_name.text;
		// return dlg_data;
		exit();
	} else {
		if (
			infolder_name.text ==
			"FOLDER DOES NOT EXIST" /*|| infolder_name.text == '' */
		) {
			exit();
		}
		// if (infolder_name.text == outfolder_name.text && target_list.selection.text == 'Package' && preserve_structure_for_package == false) {
		// 	alert('Package output folder cannot be the same as the input folder.');
		// 	exit();
		// }

		var dlg_data = collect_dlg_data();
		// dlg_data.helptips = helptip_button.value;  // ?
		//app.pdfExportPreferences.viewPDF = view_pdf.value;  // ?
		if (save_settings.value) {
			store_settings(history, dlg_data);
			// Need to store the preset, it overwrites the default presets.
			store_settings(
				File(
					script_dir() +
					batch_presets.selection.text.replace(/[\[\]]/g, "") +
					".batch_process"
				),
				dlg_data
			);
		}
		w.close();
		dlg_data.input_folder = infolder_name.text;
		return dlg_data;
	}

	function collect_dlg_data() {
		var obj = {
			input_folder: create_string(inlist, infolder_name.text),
			// output_folder: outfolder_name.text,
			// source_type: get_source_extension(source_list.selection.text),
			// source_name: source_list.selection.text,
			// target_type: get_target_extension(target_list.selection.text),
			// target_name: target_list.selection.text,
			// overwrite: overwrite.value,
			close_visible: close_visible.value,
			open_visible: open_visible.value,
			//write_Dimensions
			write_Dimensions: write_Dimensions.value,
			tempUseful: tempUseful.value,
			write_effectivePPI: write_effectivePPI.value,
			checkagainst_Indd: checkagainst_Indd.value,
			checkagainst_Tiff: checkagainst_Tiff.value,
			include_subdir: subfolders.value,
			ignore_errors: ignore_errors.value,
			update_links: update_links.value,
			save_docs: save_docs.value,
			close_open_docs: close_open_docs.value,
		};

		return obj;
	}

	function fill_list(list, str) {
		for (var i = list.items.length - 1; i > -1; i--) {
			list.remove(list.items[i]);
		}
		var array = str.split("##"); //£$£
		for (var i = 0; i < array.length; i++) {
			list.add("item", array[i]);
		}
		return array[0];
	}

	function create_string(list, new_mask) {
		if (parseInt(app.version) == 6) {
			return new_mask;
		}

		list.remove(list.find(new_mask));
		if (list.items.length > 0) {
			list.add("item", new_mask, 0);
		} else {
			list.add("item", new_mask);
		}
		var str = "";
		var stop = Math.min(list.items.length, 8) - 1;
		for (var i = 0; i < stop; i++) {
			str += list.items[i].text + "##"; //£$£
		}
		str += list.items[i].text;
		return str;
	}

	function get_source_extension(s) {
		switch (s) {
			case "InDesign":
				return ["INDD"];
			case "InDesign book":
				return ["INDB"];
			case "InDesign (template)":
				return ["INDT"];
			case "IDML":
				return ["IDML"];
			case "INX":
				return ["INX"];
			case "PageMaker":
				return ["PMD", "PM6", "P65"];
			case "QuarkExpress":
				return ["QXD"];
			case "Word":
				return ["RTF", "DOC", "DOCX"];
		}
	}

	function get_target_extension(s) {
		switch (s) {
			case "InDesign":
				return "INDD";
			case "InDesign (template)":
				return "INDT";
			case "Package":
				return "PACK";
			case "Tagged text":
				return "TAGGED_TEXT";
			case "PDF (Interactive)":
				return "PDF";
			case "AEM (Adobe Experience Manager)":
				return "AEM";
			default:
				return s;
		}
	}

	function array_index(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].value == true) {
				return i;
			}
		}
	}
} // get_data

function get_previous(f) {
	var temp = {};
	if (f.exists) {
		f.open("r");
		temp = f.read();
		f.close();
	}
	return eval(temp);
}

function store_settings(f, obj) {
	f.open("w");
	f.write(obj.toSource());
	f.close();
}

function script_dir() {
	try {
		return File(app.activeScript).path + "/";
	} catch (e) {
		return File(e.fileName).path + "/";
	}
}

// Look for a string in an array and return its index

function array_item(s, array) {
	for (var i = 0; i < array.length; i++) {
		if (s == array[i]) {
			return i;
		}
	}
	return 0;
}

function find_files_sub(dir, array, mask) {
	var f = Folder(dir).getFiles("*.*");
	for (var i = 0; i < f.length; i++) {
		// names starting with a dot are system files and folders
		if (f[i] instanceof Folder && f[i].name[0] != ".") {
			find_files_sub(f[i], array, mask);
		} else {
			if (
				f[i].name[0] != "." &&
				f[i].name.substr(-mask.length).toUpperCase() == mask
			) {
				array.push(f[i]);
			}
		}
	}
	return array;
}

function find_files(dir, incl_sub, mask_array) {
	var arr = [];
	for (var i = 0; i < mask_array.length; i++) {
		if (incl_sub == true) {
			arr = arr.concat(find_files_sub(dir, [], mask_array[i]));
		} else {
			arr = arr.concat(Folder(dir).getFiles("*" + mask_array[i]));
		}
	}
	return arr;
}

//--------------------------------------------------------------------------------------------------------

function unique_name(f) {
	function strip_base(s) {
		return s.replace(/_\d+$/, "");
	}

	var str = String(f);
	var pos = str.lastIndexOf(".");
	var base = str.slice(0, pos);
	var type = str.slice(pos, str.length);

	var n = 0;
	while (File(base + type).exists) {
		base = strip_base(base) + "_" + String(++n);
	}
	return base + type;
}

function define_icons() {
	var o = {
		folder:
			"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x12\b\x06\x00\x00\x00_%.-\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008E|\u00FBQ\u0093\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x02\u00DEIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00@\x0011\u00D0\b\x00\x04\x10\u00CD\f\x06\b \x16\x18CFR\x12L\u00CF*\u0092e\u00FE\u00F7\u009F!\u008C\u0097\u008By\x19\u0088\u00FF\u00F7\u00EF\x7F\u0086\u00CF\u00DF\u00FE\u00C6dOz\u00B2\x1C\u00C8\u00FD\x0F\u00C5\x04\x01@\x00\u00A1\u00B8\x18f(##C\u00AD\u009Ak9\u0083\u008E_\x17\u0083i\u00D4<\x06\x16f\u00C6\u009A\t\u00D9\u00D21@%\u00CC@\u00CCH\u008C\u00C1\x00\x01\u00C4\b\u008B<\u0090\u008Bg\x14\u00CAF212,\u00D3q\u00CDb\u00E0\x16Rf`\u00E3\x14f`\u00E5\x14d\u00F8\u00FF\u00E7'\u00C3\u00FE\u00D9a\x18\u009A\u00FF\u00FE\u00FB\u009Fq\u00F3\u00F1\u00CF%\x13\u00D6\u00BE\u00FE\u0086\u00EE\x13\u0080\x00bA\u00B6\x04d\u00A8\u00A1_\x15\u00D8@\u0098\u00A1\u00AC\u00EC\u00FC\f\u00CC<\\\f^\u00A5\u00A7P\f\u00FD\u00F6\u00EE.\u00C3\u00DD\x03\x1D3\u00BE\u00FF<\u00FF\f\u00C8\u00DD\x01\u00C4\x7F\u0090\r\x07\b \x14\u0083A\x04\u00CCP6\x0E!\u0086\u00A3s\x03\x18XY\x19\x19\u00FE\x01\u00C3\x07\x14\u00D6\x7F\u00A1\u00F4\u009F\u00BF\f`\fb\x03}\u00BC\u00A9+U\u0092\u00E1\u00F9\u009B\u00BF\u00BA\u00FD\u00EB_]\u0083\u00C5\x03@\x00\u00B1\u00A0\u00877\u00CC\u00A5\u00F7\x0F\u00F72\u00C8\x1B\x052p\n(\u0080\u00A5\u00FE\u00FD\u00F9\u00C5\u00F0\u00F7\u00F7o\u0086?\u00BF\x7F1\u00FC\u00F9\x05\u00A1\u00FF\u00FE\u00F9\r\u00C6\u009F\u009E_\x00\u00C6\u00C3\u00FDI@\u0085^@\u00FC\x1B\x14J\x00\x01\u00C4\u0084\u00EEb\u0090\u00A1\u00BF>\u00BFd\u00F8\u00FC\u00EA:\x03\u00A7\u00A0\"\u00C3\u00BF\u00BF\u00BF\x19\u00FE\u00FF\u00FD\x034\u00F8\x0F\u00D8\u0090\x7F\u00BFAl \u00FD\u00EF/P\u00EE\x0FX\u00FE\u00C0\u00B1+\f\u008F^\u00FD<\b\u00D4\u00CE\x01\u008B`\u0080\x00\u00C2\b\n\x0E\x1EI\u0086\u009B\u00DB\u00CA\x19\u0084\u0094\u00EC\u0081\u0081\u00CE\u00CA\u00C0\u00C4\x04\u00F4\u00FE\u00AF_`\u0083A\u0086\u0082]\u00F9\x17j8\u0090\u00FE\u00F1\u00E9)\u00C3\u00D6\x13/\x19\u00EE\u00BFa\u00D8\u00C2\u00CE\u00C6\u00CE\n5\u00F8\x0F@\x00ad\u0090W7\u00B60\u00FC\u00FB\u00FF\u0087\u0081KX\x05\u00E8\u00D2\u00DF`\x03\u00FE\u0082]\x0Bq\u00DD\u00BF\u00BF0\u0097\u00FE\x05\u0086\u00EF_\u0086\u00C3G\u008E1\u00DCy\u00FE}9\u00D0\u00D0O\u00C8I\x11 \u00800\f~xr\x06\u0083\u00A0\u00825\u00C3\u00FF\x7FPW\x01\r\x04Y\x00q\u00E9_ \u0086\x1A\x0E\u0094\u00FF\t\f\u00B2\u0095\u00FB\u009F20\u00B3p\u00CC\u0082\u00A6\n\x10\u00FE\x07\u008A<\u0080\x00\u00C20\u0098\u009DO\u0082\u0081\u009DG\x02\x12\u00AE@\u00CD \u0083\u00C0^\x07bP\u00E4\u00FD\u0083\x1A\u00FE\x1F\u00E8\u00ABS'\u008F2\u00DC{\u00FE}\x1D;;\u00C7\x0B\u00A0\u00D6\u009F@\u00FC\x0B\x14q \u0083\x01\x02\u0088\x05\u00C5P6&\u0086\u00F6i\u00DB\x18^\u00BE[\x0FNJ\u00BF\u00FF\u00FCc\x00&\x00\u0086\u00DF\u00BF!l`\x10\x03\u0093\u00D9\x7F0\u00FE\x0B\u00CCX\u00DF\x7F\u00FEe`e\u00E3\u009C\t5\u00F0'\u0092\u008B\x19\x00\x02\b9\u00E7\u0081\x02\u009E\x0B\u0088\u00F9\u00A14+\x119\u00F7\x1F\u00D4\u00D0/P\u00FC\x1Dj8\x03@\x00!\u00BB\u00F8?T\u00F0'\u0096\u00CCC\u00C8\u00E0\u00EFP\u00FA\x1FL\x02 \u0080X\u00D0\x14\u00FD\u0086\u00DA\u00FC\u0083\u00C8\"\x15\u00E6\u0098\u00DF\u00C8\u00C1\x00\x02\x00\x01\x06\x000\u00B2{\u009A\u00B3\x1C#o\x00\x00\x00\x00IEND\u00AEB`\u0082",
	};
	if (parseInt(app.version) < 9) {
		o.bin =
			"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x14\b\x02\x00\x00\x00\x0B\x00* \x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\nOiCCPPhotoshop ICC profile\x00\x00x\u00DA\u009DSgTS\u00E9\x16=\u00F7\u00DE\u00F4BK\u0088\u0080\u0094KoR\x15\b RB\u008B\u0080\x14\u0091&*!\t\x10J\u0088!\u00A1\u00D9\x15Q\u00C1\x11EE\x04\x1B\u00C8\u00A0\u0088\x03\u008E\u008E\u0080\u008C\x15Q,\f\u008A\n\u00D8\x07\u00E4!\u00A2\u008E\u0083\u00A3\u0088\u008A\u00CA\u00FB\u00E1{\u00A3k\u00D6\u00BC\u00F7\u00E6\u00CD\u00FE\u00B5\u00D7>\u00E7\u00AC\u00F3\u009D\u00B3\u00CF\x07\u00C0\b\f\u0096H3Q5\u0080\f\u00A9B\x1E\x11\u00E0\u0083\u00C7\u00C4\u00C6\u00E1\u00E4.@\u0081\n$p\x00\x10\b\u00B3d!s\u00FD#\x01\x00\u00F8~<<+\"\u00C0\x07\u00BE\x00\x01x\u00D3\x0B\b\x00\u00C0M\u009B\u00C00\x1C\u0087\u00FF\x0F\u00EAB\u0099\\\x01\u0080\u0084\x01\u00C0t\u00918K\b\u0080\x14\x00@z\u008EB\u00A6\x00@F\x01\u0080\u009D\u0098&S\x00\u00A0\x04\x00`\u00CBcb\u00E3\x00P-\x00`'\x7F\u00E6\u00D3\x00\u0080\u009D\u00F8\u0099{\x01\x00[\u0094!\x15\x01\u00A0\u0091\x00 \x13e\u0088D\x00h;\x00\u00AC\u00CFV\u008AE\x00X0\x00\x14fK\u00C49\x00\u00D8-\x000IWfH\x00\u00B0\u00B7\x00\u00C0\u00CE\x10\x0B\u00B2\x00\b\f\x000Q\u0088\u0085)\x00\x04{\x00`\u00C8##x\x00\u0084\u0099\x00\x14F\u00F2W<\u00F1+\u00AE\x10\u00E7*\x00\x00x\u0099\u00B2<\u00B9$9E\u0081[\b-q\x07WW.\x1E(\u00CEI\x17+\x146a\x02a\u009A@.\u00C2y\u0099\x192\u00814\x0F\u00E0\u00F3\u00CC\x00\x00\u00A0\u0091\x15\x11\u00E0\u0083\u00F3\u00FDx\u00CE\x0E\u00AE\u00CE\u00CE6\u008E\u00B6\x0E_-\u00EA\u00BF\x06\u00FF\"bb\u00E3\u00FE\u00E5\u00CF\u00ABp@\x00\x00\u00E1t~\u00D1\u00FE,/\u00B3\x1A\u0080;\x06\u0080m\u00FE\u00A2%\u00EE\x04h^\x0B\u00A0u\u00F7\u008Bf\u00B2\x0F@\u00B5\x00\u00A0\u00E9\u00DAW\u00F3p\u00F8~<<E\u00A1\u0090\u00B9\u00D9\u00D9\u00E5\u00E4\u00E4\u00D8J\u00C4B[a\u00CAW}\u00FEg\u00C2_\u00C0W\u00FDl\u00F9~<\u00FC\u00F7\u00F5\u00E0\u00BE\u00E2$\u00812]\u0081G\x04\u00F8\u00E0\u00C2\u00CC\u00F4L\u00A5\x1C\u00CF\u0092\t\u0084b\u00DC\u00E6\u008FG\u00FC\u00B7\x0B\u00FF\u00FC\x1D\u00D3\"\u00C4Ib\u00B9X*\x14\u00E3Q\x12q\u008ED\u009A\u008C\u00F32\u00A5\"\u0089B\u0092)\u00C5%\u00D2\u00FFd\u00E2\u00DF,\u00FB\x03>\u00DF5\x00\u00B0j>\x01{\u0091-\u00A8]c\x03\u00F6K'\x10Xt\u00C0\u00E2\u00F7\x00\x00\u00F2\u00BBo\u00C1\u00D4(\b\x03\u0080h\u0083\u00E1\u00CFw\u00FF\u00EF?\u00FDG\u00A0%\x00\u0080fI\u0092q\x00\x00^D$.T\u00CA\u00B3?\u00C7\b\x00\x00D\u00A0\u0081*\u00B0A\x1B\u00F4\u00C1\x18,\u00C0\x06\x1C\u00C1\x05\u00DC\u00C1\x0B\u00FC`6\u0084B$\u00C4\u00C2B\x10B\nd\u0080\x1Cr`)\u00AC\u0082B(\u0086\u00CD\u00B0\x1D*`/\u00D4@\x1D4\u00C0Qh\u0086\u0093p\x0E.\u00C2U\u00B8\x0E=p\x0F\u00FAa\b\u009E\u00C1(\u00BC\u0081\t\x04A\u00C8\b\x13a!\u00DA\u0088\x01b\u008AX#\u008E\b\x17\u0099\u0085\u00F8!\u00C1H\x04\x12\u008B$ \u00C9\u0088\x14Q\"K\u00915H1R\u008AT UH\x1D\u00F2=r\x029\u0087\\F\u00BA\u0091;\u00C8\x002\u0082\u00FC\u0086\u00BCG1\u0094\u0081\u00B2Q=\u00D4\f\u00B5C\u00B9\u00A87\x1A\u0084F\u00A2\x0B\u00D0dt1\u009A\u008F\x16\u00A0\u009B\u00D0r\u00B4\x1A=\u008C6\u00A1\u00E7\u00D0\u00ABh\x0F\u00DA\u008F>C\u00C70\u00C0\u00E8\x18\x073\u00C4l0.\u00C6\u00C3B\u00B18,\t\u0093c\u00CB\u00B1\"\u00AC\f\u00AB\u00C6\x1A\u00B0V\u00AC\x03\u00BB\u0089\u00F5c\u00CF\u00B1w\x04\x12\u0081E\u00C0\t6\x04wB a\x1EAHXLXN\u00D8H\u00A8 \x1C$4\x11\u00DA\t7\t\x03\u0084Q\u00C2'\"\u0093\u00A8K\u00B4&\u00BA\x11\u00F9\u00C4\x18b21\u0087XH,#\u00D6\x12\u008F\x13/\x10{\u0088C\u00C47$\x12\u0089C2'\u00B9\u0090\x02I\u00B1\u00A4T\u00D2\x12\u00D2F\u00D2nR#\u00E9,\u00A9\u009B4H\x1A#\u0093\u00C9\u00DAdk\u00B2\x079\u0094, +\u00C8\u0085\u00E4\u009D\u00E4\u00C3\u00E43\u00E4\x1B\u00E4!\u00F2[\n\u009Db@q\u00A4\u00F8S\u00E2(R\u00CAjJ\x19\u00E5\x10\u00E54\u00E5\x06e\u00982AU\u00A3\u009AR\u00DD\u00A8\u00A1T\x115\u008FZB\u00AD\u00A1\u00B6R\u00AFQ\u0087\u00A8\x134u\u009A9\u00CD\u0083\x16IK\u00A5\u00AD\u00A2\u0095\u00D3\x1Ah\x17h\u00F7i\u00AF\u00E8t\u00BA\x11\u00DD\u0095\x1EN\u0097\u00D0W\u00D2\u00CB\u00E9G\u00E8\u0097\u00E8\x03\u00F4w\f\r\u0086\x15\u0083\u00C7\u0088g(\x19\u009B\x18\x07\x18g\x19w\x18\u00AF\u0098L\u00A6\x19\u00D3\u008B\x19\u00C7T071\u00EB\u0098\u00E7\u0099\x0F\u0099oUX*\u00B6*|\x15\u0091\u00CA\n\u0095J\u0095&\u0095\x1B*/T\u00A9\u00AA\u00A6\u00AA\u00DE\u00AA\x0BU\u00F3U\u00CBT\u008F\u00A9^S}\u00AEFU3S\u00E3\u00A9\t\u00D4\u0096\u00ABU\u00AA\u009DP\u00EBS\x1BSg\u00A9;\u00A8\u0087\u00AAg\u00A8oT?\u00A4~Y\u00FD\u0089\x06Y\u00C3L\u00C3OC\u00A4Q\u00A0\u00B1_\u00E3\u00BC\u00C6 \x0Bc\x19\u00B3x,!k\r\u00AB\u0086u\u00815\u00C4&\u00B1\u00CD\u00D9|v*\u00BB\u0098\u00FD\x1D\u00BB\u008B=\u00AA\u00A9\u00A19C3J3W\u00B3R\u00F3\u0094f?\x07\u00E3\u0098q\u00F8\u009CtN\t\u00E7(\u00A7\u0097\u00F3~\u008A\u00DE\x14\u00EF)\u00E2)\x1B\u00A64L\u00B91e\\k\u00AA\u0096\u0097\u0096X\u00ABH\u00ABQ\u00ABG\u00EB\u00BD6\u00AE\u00ED\u00A7\u009D\u00A6\u00BDE\u00BBY\u00FB\u0081\x0EA\u00C7J'\\'Gg\u008F\u00CE\x05\u009D\u00E7S\u00D9S\u00DD\u00A7\n\u00A7\x16M=:\u00F5\u00AE.\u00AAk\u00A5\x1B\u00A1\u00BBDw\u00BFn\u00A7\u00EE\u0098\u009E\u00BE^\u0080\u009ELo\u00A7\u00DEy\u00BD\u00E7\u00FA\x1C}/\u00FDT\u00FDm\u00FA\u00A7\u00F5G\fX\x06\u00B3\f$\x06\u00DB\f\u00CE\x18<\u00C55qo<\x1D/\u00C7\u00DB\u00F1QC]\u00C3@C\u00A5a\u0095a\u0097\u00E1\u0084\u0091\u00B9\u00D1<\u00A3\u00D5F\u008DF\x0F\u008Ci\u00C6\\\u00E3$\u00E3m\u00C6m\u00C6\u00A3&\x06&!&KM\u00EAM\u00EE\u009ARM\u00B9\u00A6)\u00A6;L;L\u00C7\u00CD\u00CC\u00CD\u00A2\u00CD\u00D6\u00995\u009B=1\u00D72\u00E7\u009B\u00E7\u009B\u00D7\u009B\u00DF\u00B7`ZxZ,\u00B6\u00A8\u00B6\u00B8eI\u00B2\u00E4Z\u00A6Y\u00EE\u00B6\u00BCn\u0085Z9Y\u00A5XUZ]\u00B3F\u00AD\u009D\u00AD%\u00D6\u00BB\u00AD\u00BB\u00A7\x11\u00A7\u00B9N\u0093N\u00AB\u009E\u00D6g\u00C3\u00B0\u00F1\u00B6\u00C9\u00B6\u00A9\u00B7\x19\u00B0\u00E5\u00D8\x06\u00DB\u00AE\u00B6m\u00B6}agb\x17g\u00B7\u00C5\u00AE\u00C3\u00EE\u0093\u00BD\u0093}\u00BA}\u008D\u00FD=\x07\r\u0087\u00D9\x0E\u00AB\x1DZ\x1D~s\u00B4r\x14:V:\u00DE\u009A\u00CE\u009C\u00EE?}\u00C5\u00F4\u0096\u00E9/gX\u00CF\x10\u00CF\u00D83\u00E3\u00B6\x13\u00CB)\u00C4i\u009DS\u009B\u00D3Gg\x17g\u00B9s\u0083\u00F3\u0088\u008B\u0089K\u0082\u00CB.\u0097>.\u009B\x1B\u00C6\u00DD\u00C8\u00BD\u00E4Jt\u00F5q]\u00E1z\u00D2\u00F5\u009D\u009B\u00B3\u009B\u00C2\u00ED\u00A8\u00DB\u00AF\u00EE6\u00EEi\u00EE\u0087\u00DC\u009F\u00CC4\u009F)\u009EY3s\u00D0\u00C3\u00C8C\u00E0Q\u00E5\u00D1?\x0B\u009F\u00950k\u00DF\u00AC~OCO\u0081g\u00B5\u00E7#/c/\u0091W\u00AD\u00D7\u00B0\u00B7\u00A5w\u00AA\u00F7a\u00EF\x17>\u00F6>r\u009F\u00E3>\u00E3<7\u00DE2\u00DEY_\u00CC7\u00C0\u00B7\u00C8\u00B7\u00CBO\u00C3o\u009E_\u0085\u00DFC\x7F#\u00FFd\u00FFz\u00FF\u00D1\x00\u00A7\u0080%\x01g\x03\u0089\u0081A\u0081[\x02\u00FB\u00F8z|!\u00BF\u008E?:\u00DBe\u00F6\u00B2\u00D9\u00EDA\u008C\u00A0\u00B9A\x15A\u008F\u0082\u00AD\u0082\u00E5\u00C1\u00AD!h\u00C8\u00EC\u0090\u00AD!\u00F7\u00E7\u0098\u00CE\u0091\u00CEi\x0E\u0085P~\u00E8\u00D6\u00D0\x07a\u00E6a\u008B\u00C3~\f'\u0085\u0087\u0085W\u0086?\u008Ep\u0088X\x1A\u00D11\u00975w\u00D1\u00DCCs\u00DFD\u00FAD\u0096D\u00DE\u009Bg1O9\u00AF-J5*>\u00AA.j<\u00DA7\u00BA4\u00BA?\u00C6.fY\u00CC\u00D5X\u009DXIlK\x1C9.*\u00AE6nl\u00BE\u00DF\u00FC\u00ED\u00F3\u0087\u00E2\u009D\u00E2\x0B\u00E3{\x17\u0098/\u00C8]py\u00A1\u00CE\u00C2\u00F4\u0085\u00A7\x16\u00A9.\x12,:\u0096@L\u0088N8\u0094\u00F0A\x10*\u00A8\x16\u008C%\u00F2\x13w%\u008E\ny\u00C2\x1D\u00C2g\"/\u00D16\u00D1\u0088\u00D8C\\*\x1EN\u00F2H*Mz\u0092\u00EC\u0091\u00BC5y$\u00C53\u00A5,\u00E5\u00B9\u0084'\u00A9\u0090\u00BCL\rL\u00DD\u009B:\u009E\x16\u009Av m2=:\u00BD1\u0083\u0092\u0091\u0090qB\u00AA!M\u0093\u00B6g\u00EAg\u00E6fv\u00CB\u00ACe\u0085\u00B2\u00FE\u00C5n\u008B\u00B7/\x1E\u0095\x07\u00C9k\u00B3\u0090\u00AC\x05Y-\n\u00B6B\u00A6\u00E8TZ(\u00D7*\x07\u00B2geWf\u00BF\u00CD\u0089\u00CA9\u0096\u00AB\u009E+\u00CD\u00ED\u00CC\u00B3\u00CA\u00DB\u00907\u009C\u00EF\u009F\u00FF\u00ED\x12\u00C2\x12\u00E1\u0092\u00B6\u00A5\u0086KW-\x1DX\u00E6\u00BD\u00ACj9\u00B2<qy\u00DB\n\u00E3\x15\x05+\u0086V\x06\u00AC<\u00B8\u008A\u00B6*m\u00D5O\u00AB\u00EDW\u0097\u00AE~\u00BD&zMk\u0081^\u00C1\u00CA\u0082\u00C1\u00B5\x01k\u00EB\x0BU\n\u00E5\u0085}\u00EB\u00DC\u00D7\u00ED]OX/Y\u00DF\u00B5a\u00FA\u0086\u009D\x1B>\x15\u0089\u008A\u00AE\x14\u00DB\x17\u0097\x15\x7F\u00D8(\u00DCx\u00E5\x1B\u0087o\u00CA\u00BF\u0099\u00DC\u0094\u00B4\u00A9\u00AB\u00C4\u00B9d\u00CFf\u00D2f\u00E9\u00E6\u00DE-\u009E[\x0E\u0096\u00AA\u0097\u00E6\u0097\x0En\r\u00D9\u00DA\u00B4\r\u00DFV\u00B4\u00ED\u00F5\u00F6E\u00DB/\u0097\u00CD(\u00DB\u00BB\u0083\u00B6C\u00B9\u00A3\u00BF<\u00B8\u00BCe\u00A7\u00C9\u00CE\u00CD;?T\u00A4T\u00F4T\u00FAT6\u00EE\u00D2\u00DD\u00B5a\u00D7\u00F8n\u00D1\u00EE\x1B{\u00BC\u00F64\u00EC\u00D5\u00DB[\u00BC\u00F7\u00FD>\u00C9\u00BE\u00DBU\x01UM\u00D5f\u00D5e\u00FBI\u00FB\u00B3\u00F7?\u00AE\u0089\u00AA\u00E9\u00F8\u0096\u00FBm]\u00ADNmq\u00ED\u00C7\x03\u00D2\x03\u00FD\x07#\x0E\u00B6\u00D7\u00B9\u00D4\u00D5\x1D\u00D2=TR\u008F\u00D6+\u00EBG\x0E\u00C7\x1F\u00BE\u00FE\u009D\u00EFw-\r6\rU\u008D\u009C\u00C6\u00E2#pDy\u00E4\u00E9\u00F7\t\u00DF\u00F7\x1E\r:\u00DAv\u008C{\u00AC\u00E1\x07\u00D3\x1Fv\x1Dg\x1D/jB\u009A\u00F2\u009AF\u009BS\u009A\u00FB[b[\u00BAO\u00CC>\u00D1\u00D6\u00EA\u00DEz\u00FCG\u00DB\x1F\x0F\u009C4<YyJ\u00F3T\u00C9i\u00DA\u00E9\u0082\u00D3\u0093g\u00F2\u00CF\u008C\u009D\u0095\u009D}~.\u00F9\u00DC`\u00DB\u00A2\u00B6{\u00E7c\u00CE\u00DFj\x0Fo\u00EF\u00BA\x10t\u00E1\u00D2E\u00FF\u008B\u00E7;\u00BC;\u00CE\\\u00F2\u00B8t\u00F2\u00B2\u00DB\u00E5\x13W\u00B8W\u009A\u00AF:_m\u00EAt\u00EA<\u00FE\u0093\u00D3O\u00C7\u00BB\u009C\u00BB\u009A\u00AE\u00B9\\k\u00B9\u00EEz\u00BD\u00B5{f\u00F7\u00E9\x1B\u009E7\u00CE\u00DD\u00F4\u00BDy\u00F1\x16\u00FF\u00D6\u00D5\u009E9=\u00DD\u00BD\u00F3zo\u00F7\u00C5\u00F7\u00F5\u00DF\x16\u00DD~r'\u00FD\u00CE\u00CB\u00BB\u00D9w'\u00EE\u00AD\u00BCO\u00BC_\u00F4@\u00EDA\u00D9C\u00DD\u0087\u00D5?[\u00FE\u00DC\u00D8\u00EF\u00DC\x7Fj\u00C0w\u00A0\u00F3\u00D1\u00DCG\u00F7\x06\u0085\u0083\u00CF\u00FE\u0091\u00F5\u008F\x0FC\x05\u008F\u0099\u008F\u00CB\u0086\r\u0086\u00EB\u009E8>99\u00E2?r\u00FD\u00E9\u00FC\u00A7C\u00CFd\u00CF&\u009E\x17\u00FE\u00A2\u00FE\u00CB\u00AE\x17\x16/~\u00F8\u00D5\u00EB\u00D7\u00CE\u00D1\u0098\u00D1\u00A1\u0097\u00F2\u0097\u0093\u00BFm|\u00A5\u00FD\u00EA\u00C0\u00EB\x19\u00AF\u00DB\u00C6\u00C2\u00C6\x1E\u00BE\u00C9x31^\u00F4V\u00FB\u00ED\u00C1w\u00DCw\x1D\u00EF\u00A3\u00DF\x0FO\u00E4| \x7F(\u00FFh\u00F9\u00B1\u00F5S\u00D0\u00A7\u00FB\u0093\x19\u0093\u0093\u00FF\x04\x03\u0098\u00F3\u00FCc3-\u00DB\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x02\u0087IDATx\u00DA\u0094\u0092\u00CFO\x13A\x14\u00C7\u00DF\u00CE\u00FE(Mw\u00BBK\x17vYcp\u00B1\u00D5\u0080\x07k(\u00A5\u0081\u00C6\u0090H\x1A95%&\u00BD\x10\u00943I/\u009C\u008C\t\u00FF\bG\x13\u0095\x03\u0089\u0089\\\u0094\u0094\x1A1U \x04\u00F1\u0082\u009At\r\u00A0mlS\t\u0089%\u00DB\u00EE\u00CCn=l)\u0082\u009A\u00E8;\u00BD\u0099\u00F9~\u00F2}\u00DF\u00C9\u00A3\u00AA\u00E5\u008F\u00F0?\u00C5\u00FC~\u00F5r\u00ED]\u00BB\x1F\u008E\x0E\u00FB\u00BC\u00F8\u00CF@\u00BD\u00DE0>\x7Fy\u00B5\u00B6\u00FE\u00FCE\u00F6\u00E0\u00E0\u00AB\u00E38\u0081N)\x1E\u008F\u008D\u008F\u00DF\x1C\u008A\\\u00F7\x0B\u00BC+\u00A3\u00DC\u0091\u008A\u00A5\u00F2\u00DB\u00F5\x1D\u00CE#\u00E4\u00F3y\u00CB\u00B2fff8\u008E[XX\u00A8V\u00AB\u00BA\u00AE[\u008D\x1F\u00F7\u00EE\u00A6\u00AF\r\\\x05\x00\u00E4r\u00AB\u00B97\u00DA\x05=\u0099L\u0086\u00C3\u00E1\u00E9\u00E9\u00E9p8\x1C\n\u0085\u00C6\u00C6\u00C6\b!SSS\u00DD\u00CA\u00C5\u00C7O\u009E\x12b7\u009B\u00CD\x16\u00B0\u00F3\u00FEC\x7F\x7F\u00BF,\u00CB\u0099L&\u0091H\u00C8\u00B2\u00DC\u00D3\u00D3\u00A3iZ\"\u0091\u00C0\x18\u0087B\u00A1\u00D5\u00DCk\u00D34\x1D\u00C7ie\u00F0\x0B\u009El6+\u008A\u00A2\u00AA\u00AA\x00P.\u0097\x01 \x12\u0089 \u0084J\u00A5\u00D2\u00D6\u00D6Vt\u00E8F\u00ADv\u00EC\u00F1p- \u0095\u00BC\u00FD\u00F0\u00D1\u00B3J\u00A5\u00A2iZWW\u0097\u00D7\u00EB%\u0084\x1C\x1E\x1E\x16\u008B\u00C5\u00CD\u00CD\u00CD\u00DD\u00DD\u00DD\x07\u00F73\u0098\x10\u00DB>q\x18\x18\u00B8b\x18\x06\u00C6xee\u00E5\u00E8\u00E8\b!\u00D4l6m\u00DB\x16E\u00B1\u00B7\u00B7\u00B7P(\x04\u0083:C\u00D34\u008DZ\x00\u00C30\u00F9|~nnncc#\x16\u008B\x01\u00C0\u00F6\u00F6\u00F6\u00E0\u00E0`.\u0097K\u00A7\u00D3KKK,\u00CBtx;h\u009An\u0085F\b\x01\u0080\u00AE\u00EB\x00099\u0099J\u00A5\x00 \x1E\u008F\x03\x00!\x04\x00\x10\u0085X\u0086A\u00E8\u00C4\u0081\u00A2(\u00B7\u0091$\u0089\u00A2(\u00F7\u00E8\u00F3\u00F9\x04A\u00B0,\u00CB\x15\u00B8\u0085\u00CE\u00ED\u0085\u00A2(n#\b\x02\x00\x04\x02\u0081F\u00A3\u00F1\u00D7]r\x1CGUU\u00D341\u00C6\u0092$\u00ED\u00ED\u00ED)\u008Ab\u00DB\u00F6\u00AF\u009AS\u0087\u0091\u0091\u0091\u00FD\u00FD}UU\u00EB\u00F5\u00BAi\u009A\u00AE\u00B4\u00AF\u00AF\u00AFR\u00A9D\u00A3\u00D1\u00B6\u008Cj\u00AF\u00F7\u00A7\u00C2\u00F7\u00F9\u00F9\u00F9\u0089\u0089\u0089`0\u00D8~6\fcyyyvv\u00F6\u00F2\u00A5NU\u00ED\u00E6y\u00DF)P\u00AB\x1D\x17\u00BF\u00D5\x17\x17\x171\u00C6\x00`\u00DB6!\u0084\u00E7\u00F9\u00D1\u00D1QE\u00E6x\u00DE\u00E7\x02\u00A7\x19\x18\u0086\u00F6z\u00EAwR\u00B7l\u00DB9\u00F7\x134\u008DX\u008Ee\x18\u00FALh\u0096eE\u00BF\x00\x00\u00D8\u00C2\u00E7\x00\u0096cE\u00BF\u00C0\u00B2\u00EC\u0099\f\u00FFX?\x07\x00\u0091\u00AA\u00FEE\u0098\u00C1\u00C4\u0084\x00\x00\x00\x00IEND\u00AEB`\u0082";
		o.save =
			'\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x12\b\x06\x00\x00\x00_%.-\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x00\x04gAMA\x00\x00\u00D8\u00EB\u00F5\x1C\x14\u00AA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F4%\x00\x00\u0084\u00D1\x00\x00m_\x00\x00\u00E8l\x00\x00<\u008B\x00\x00\x1BX\u0083\u00E7\x07x\x00\x00\x02\u00F2IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00@\x00\u00B1 sd\u00E5\u00CC\u0099\\\x03\u00A6\u00FEe`\x02r@\u0098\x19\u008A\x19\u00910\u00CC\x1D\u00FF!\u00FC\u00DD+\u00F3\u00B8\x18\u0098\u0098\u00FE00\u00FC\u00FE\u00FB\u00FF\u00CB\u00A3\x7F0\u00B3\x00\x02\b\u00C5`\x06&V\u00901\f\u00DD\u00F5z\f_\u00BF\u00FFaX\u00BAp"CAA\x01\u00C3\u00BF\x7F\u00FF\u00C0\u0098\u008F\u008F\x0F\u00AC\u00EC\u00D5\u00ABW\fbbb\fiMg\x18\u00BE\u00FE\u00FC\u00F9\u008D\u009B\u008BC\u0084\u0081\u0089\u00FD+#\u00AF\u00DC\u00AF\u00FF\u009F!\u0086\x03\x04\x10\x13\u008A\u00C1\u00FF\u00FF\u00B1\u0080\\\u00F1\u00FD\u00C7_\u0086o@|\u00EC\u00F81\u00B8\u00A1\x7F\u00FF\u00C2\x1D\x03\u00E6\u0083\u00C0\u00C7\u00DF\u00BF\x19LB\u00FB\x19\u00BE\u00FE\u00F8\u00F1\u0086\u0081\u00F1??\x03\x0B;\x1B#\u009F\x1C\u00D8L\u0080\x00Bu1#3\u0098\u00FF\u00E5\u00DB\x1F\u00B0\u008B\u009F>y\n1\u00F4\u00DF_\u00B8a \u00F0\u00F7\u00EF_0\u00FD\u00E1\u00C7o\u0086\x1F\x7F\u00BE\u00C2\u0082I\u0094\u00E1\u00FF\u00DF?\f\u00CC\u00AC \u00C9\x7F\x00\x01\u00C4\u0082\u00E6bF\u00B0\u00C1_\u00FF0|\u00FA\u00F6\u009B\u00E1\u00DD\u00BBw\f\u00FF\u00FE\u00FE\u0085\u00BA\u00F8/\u00C3\u008B\x17/\u00C0\u00F4?\u00A8\u00EB\u00BF\u00FD\u00FA\u00CA\u00F0\u00FB\u00D7G\u00A8\u00C1L"@\x03\u00BE0\u00FC\u00FB\u00FD\x1D\u00C8\u00FB\x03\x10@,\x18\u00D1\tT\u00F4\u00E9\u00CBo\u0086/@\x17\u00DBF\u00ADb\x10\x10\x14\u00C4\x1A\u00EB\x06\x11\x13\x18~\u00FF\u00F8\u00C0\u00F0\u00FB\'\u00D4`\u0086\u00FF<@\u0082\x03\u00C8a\x05\u00D2\u00DF\x01\x02\u0088\x05\u009B&\u0090\u008B?\x02]l\u00A1/\u00CC\u00A0\u00B5\u00E0:\u00C3\u00C7\u00EF\u00BF\x19\u00DE\x7F\u00FD\u00C5\u00F0\x11\u00E8\u00F5\x0F_\x7F3|\u00FB\u00FE\x15b\u00E8\u008F\u008F\f\u00BF\u00BF\x7F\u0084:\u0088\u0091\x05\u0098RX\u00FE\u00FF\u00FF\x0B\ncF\u0080\x00\u00C2\u00EA\u00E2\u00CF\u00C00\u00DE\u00B0\u00EF\x19\u00C3\u00BAIVx\u00D3\u00AA\u009A{!\x033;\x17rX2\u00C2X\x00\x01\u00C4\u0082n(\b\x7F\u00F8\u00FC\x1Bl(<L\u00A1a\f\n\u00EF\u00BF\u00B0\u00C8\x04\u0086\u00B3\u0096\u0096\x16\u0083\u00AA[\x1E\u00D4L\u00A8\u00A1\u0090xb\x04\b L\x17\x03=\u00F2\x11\u00E8]X\u00EC\u00C3\f\u0085\u00B1A\x06\u00C2\u0092 \b\u00FC\u00FE\u00FE\t\u00C9\u00C1\b\x17\x03\x04\x10\u00D6\u00A0\u00F8\u00F8\u00E57<\u00BD\u00A2\x18\u00FA\x0F\u00E2bd\u0083\u00FF\u00FE\u00FA\u00865\u0098\x00\x02\u0088\t\u009B\u00C8\u00FB/\u00BF\u00E0.F\x18\n\u00C9$\u00FF\u00D0\f\u00FE\u00F3\u00F3+V\u0083\x01\x02\u0088\t#\u008C\u0081"\u009F\u00BE\u00A3\x06\x05<\u008C\u0091\f\u0085\x15^\x7F\x7Fbw1@\x00aF\x1EPd\u00D7\u00FCl\x06AY#\x06\x13\u00C7PD\u00E1\u0083\x05\b*\x18!\u0092\x1B\x1A\x00\b F\u00E4bSV\u00C5\u0096\x17\u00E8bI`i\u00A5\u00C8\u00C0\u00C4(\n4\u0090\x0B\u0097\u00A1\u00A8\u00E0\u00FF\x0F\u00A0\x17\u00DE0\u00FC\u00FBs\u00FF\u00FF\u00BF\u00DF/\x18>=\u00F9\x04\x10@h\u0091\x07\u00CC\u00EB\u008C\u00CC@\u00BF\u00FD\u00FF\x00\u00C4\u00A0`\u00FA\u00CA@Tq\u00FD\u00FF\x170\u0099}\x00\u0096\x15?\x18\u00FE\u00FE\u00FE\x03\x12\x01\b \u00B4b\x13X\u00AE\u00FE\u00FF\u00FD\x19h\u00F8s\u00A0\x0B>1\u00FCc`\x03\u0096Z\u0084\u00DD\u00FC\u00FF?0R\u00FE\x7F\u00FF\u00FF\u00F7\u00D7gpA\x04\u00E4\x00\x04\x18\x00\u00CD&\u00AA2\fs\x1B\x05\x00\x00\x00\x00IEND\u00AEB`\u0082';
	} else {
		o.bin =
			"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x11\x00\x00\x00\x13\b\x02\x00\x00\x00\u00F9\u00C7q\u00A6\x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\x00\u00CAIDAT(\u00CF\u00C5\u0093=\n\u00830\x18\u0086=\u008A\u008Bc\u0086\u0080H\u00A0\u00A2 \u008A\u0082\u00BD\u0082\u0092\x0B\u00E40^\u00C0-c\u00FC9\u0089[Gi\u00A1\x07\u00E9\u008B`\u0087\u00F2}m\u00A5C\u00DF\u00E1!\u00BC\u00C9C\u00F0\u0093x\u0097\u00E3\u00F1\u00FE\u00E7\x18cN{\u00B0\u00FE\u00CAI\u0092d\u00D9\u0093\u00E7\u00F9;\u00A7\u00EB:\u00AD\u00B5R\u00AAi\u009A8\u008E\u00D5\u0096\u00B6mA\u00F4\u00D8%\u009C(\u008ApCQ\x14eY\u00D6u}\u00DE\u00825\x1A\u00F4\u00D8%\u009C\u00EB\u00A7\u00D0\u00DF#\u00A5\u00B4\u00D6\u0092dg\u0090e\u00D9<\u00CF$Y'M\u00D3i\u009AH\u00B2\x0E~\bN\u0090d\x1D\u008Cu\x1CG\u0092\u00AC\x13\u0086\u00E10\f$Y\u00A7\u00AA*\u00E7\x1C\u00A6\u00F4B\u00F4\u00AC\u00D3\u00F7}\x10\x04B\b\u00DF\u00F7\u009FD\u0083\u009Eu\u00D6u\u00BDSA\u00FF\u00F3[\u00B8\x1D\u00CF\x03@,\u00A2\u00EFT\u009B`F\x00\x00\x00\x00IEND\u00AEB`\u0082";
		o.save =
			"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x13\b\x02\x00\x00\x00\x1B\x1Bj\u00DF\x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\x00\u00D9IDAT8\u00CB\u00C5\u0094A\n\u0082@\x14\u0086=N\x0B\u00C1\x16\u00A1\u009Bd\f\u00B1E\x0B\u00EF\u00E3\r\u00BC\u0082\u00D7h\x11\u00B4\x190\u0098\u008D\x07hp%#\u00B3\u00F1\x16\u00FD\x14\x13\u0099\x0Fze\u00D1\u00B7z\u00FC\u00F3\u00CF\u00C7\u00F0\x04\u00BD\u00F3<\u008C1\u00DE\u00CF\x15+\u00C7\u00E7\u008A\u009D\u00E3\x1F\u008A\u00A5c\u00EB\u00B8',\u0085\u00D6\u00BA\u00EF\u00FB4M7c\u0090 \u00E7\u00BE\u00A2m[km\x1C\u00C7k\x07f\u00DC\u0087\u00FD\u008D]\u00DC,\u00E1\u0095(\u008A0#y\u00B1\u008B<\u00CF\x17cp\u00B9,\u00CB \b\u008A\u00A2\u00C0\u00FCx\u00842\u00A1\u00F0}\u00FF4A)\u0085\u00A3\u00A6i\u009Er\u0094\tE\u0092$RJ\u00EC\\\u008E\u00A9\u00EBZN@\u0099P\b!\u008ElP&\x14X\u00FB\u0081\r\u00CA\u0084\x02_~\u00CF&\u00CB2BQU\x15\u009E\x172@\reB\u00D1u\u009De\u0083\u00F2W\u00FF\x17f\x1E\u00C30\\\x00T\u00DC\u0082\u00F9\u00ABm\u00B0\u0087\x00\x00\x00\x00IEND\u00AEB`\u0082";
	}
	return o;
}

function writeDimensionsVisiblePageWH(current_doc) {
	// var fileName = app.documents[0].name;//current_doc
	var fileName = current_doc.name;
	var myPage = app.documents[0].pages.item(0);
	var b_pgebounds = myPage.bounds;

	var w_t = Number(Math.round(b_pgebounds[3] - b_pgebounds[1] + "e2") + "e-2");
	var h_t = Number(Math.round(b_pgebounds[2] - b_pgebounds[0] + "e2") + "e-2");
	// alert("w_t "+w_t+"\n"+"h_t "+h_t+"\n"+"idNumar "+idNumar+"\n"+"vizibil_W_mm "+vizibil_W_mm+"\n"+"vizibil_H_mm "+vizibil_H_mm+
	// "\n"+"total_W_mm "+total_W_mm+"\n"+"total_H_mm "+total_H_mm)
	var m_left = myPage.marginPreferences.left; //mmyX2
	var m_right = myPage.marginPreferences.right; //mmyX1
	var m_top = myPage.marginPreferences.top; //mmyy2
	var m_bottom = myPage.marginPreferences.bottom; //mmyy1
	var w = Number(Math.round(w_t - (m_left + m_right) + "e2") + "e-2"); // w vizibil
	var h = Number(Math.round(h_t - (m_top + m_bottom) + "e2") + "e-2"); // h vizibil

	// H_p_abs = Math.abs(b[2]-b[0])/2.83464567; //
	// W_p = Number(Math.round(W_p_abs + 'e2') + 'e-2')

	dimensionsVisibilTotal.push([fileName, w, h, w_t, h_t]); //filesListTiffs[i]
}

function writeEffectivePpi(current_doc) {
	// var fileName = app.documents[0].name;//current_doc
	// alert("writeEffectivePpi")
	var fileName = current_doc.name;
	var myPage = app.documents[0].pages.item(0);
	// alert("fileName\t" + fileName)
	var sourcePages = current_doc.pages;
	// alert("sourcePages[i] " + sourcePages[0].name)

	var graphics = current_doc.allGraphics;

	for (var i = 0; i < graphics.length; i++) {
		// var itemsOnPage = sourcePages[i].pageItems;
		var myObj = graphics[i].parent;
		// for (var j = 0; j < itemsOnPage.length; j++) {
		// var myObj = app.selection[0];
		// var myObj = itemsOnPage[j]
		// alert(myObj.constructor.name)
		// app.select(itemsOnPage[j])

		// var myObj = app.selection[0];
		// if (myObj instanceof Rectangle && myObj.images.length == 1) {

		try {
			var imageName = myObj.graphics[0].itemLink.name;
			var myefectivePPi = myObj.graphics[0].effectivePpi;
			// alert(imageName + "\t" + myefectivePPi[0] + "\t" + myefectivePPi[1])
		} catch (e) {
			// alert(e)
		}
		// alert(imageName + "\t" + myefectivePPi[0] + "\t" + myefectivePPi[1])
		// }
		// }
	}

	effectivePPiarray.push([
		fileName,
		imageName,
		myefectivePPi[0],
		myefectivePPi[1],
	]);
}

function writeEffectivePPi_file(effectivePPiarray, params) {
	for (var a = 0; a < effectivePPiarray.length; a++) {
		// alert(psdMasterListPathRatia[a][1])

		var message = effectivePPiarray[a];
		var filename =
			"_indesign_raport_effectivePPi_" + dateString_ziua + "_" + ".txt"; // merge!
		// alert("filename " + filename)
		// alert("params.input_folder" + params.input_folder)
		var file = new File(params.input_folder + "/" + filename);

		// alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

		file.encoding = "UTF-8";

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		} else {
			file.open("w");
		}

		// file.open('w');
		file.write(message + "\r");
		file.close();
	}
}

function writeDimensions(dimensionsVisibilTotal, params) {
	for (var a = 0; a < dimensionsVisibilTotal.length; a++) {
		// alert(psdMasterListPathRatia[a][1])

		var message = dimensionsVisibilTotal[a];
		var filename =
			"_indesign_raport_dimensiuni_Vizibil_Total_" +
			dateString_ziua +
			"_" +
			".txt"; // merge!

		var file = new File(params.input_folder + "/" + filename);

		// alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

		file.encoding = "UTF-8";

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		} else {
			file.open("w");
		}

		// file.open('w');
		file.write(message + "\r");
		file.close();
	}
}

function checkDimensionAgainst_master(txtfile, txtfile_master, outputFiles) {
	// alert("checkagainst " + txtfile + " " + txtfile_master)

	var arrMaster = [];
	arrMaster = readFileTxt(txtfile_master);
	var arrtxtfile = [];
	arrtxtfile = readFileTxt(txtfile);

	// for (var i = 0; i < arrMaster.length; i++) {
	// 	// alert("i " + i + " wv " + arrMaster[i][1] + " hv " + arrMaster[i][2] + " w " + arrMaster[i][3] + " t " + arrMaster[i][4]) // ok
	// }
	//var finalFileName = finalFileName.replace(/[.,:;`!?>/<\[\\|}\]*^$&"'']/g, "_");

	compareArrays(arrMaster, arrtxtfile, outputFiles);
	// alert(arr1[1][2])
}

function compareArrays(arrMaster, arr2, outputFiles) {
	for (var i = 0; i < arrMaster.length; i++) {
		var num1 = Number(arrMaster[i][1]); // w vizibil
		var num2 = Number(arrMaster[i][2]); // h vizibil
		var num3 = Number(arrMaster[i][3]); // w total
		var num4 = Number(arrMaster[i][4]); // h total
		var str = arrMaster[i][7]; // denumirea

		var str = str.replace(/\./g, "_");
		var str = str.replace(/\,/g, "_");
		var str = str.replace(/\:/g, "_");
		var str = str.replace(/\;/g, "_");
		var str = str.replace(/`/g, "_");
		var str = str.replace(/\!/g, "_");
		var str = str.replace(/\?/g, "_");
		var str = str.replace(/\>/g, "_");
		var str = str.replace(/\</g, "_");
		var str = str.replace(/\//g, "_");
		var str = str.replace(/\[/g, "_");
		var str = str.replace(/\\/g, "_");
		var str = str.replace(/\|/g, "_");
		var str = str.replace(/\]/g, "_");
		var str = str.replace(/\{/g, "_");
		var str = str.replace(/\}/g, "_");
		var str = str.replace(/\*/g, "_");
		var str = str.replace(/\^/g, "_");
		var str = str.replace(/\$/g, "_");
		var str = str.replace(/\&/g, "_");
		var str = str.replace(/\"/g, "_");
		var denumireFinalaMaster = String(
			str.replace(/\'/g, "_") + "_." + outputFiles
		); //"indd" "tif" //_.tif

		// var str1 = str.replace(/[\.\,\:\;`\!\?\>\<\\[\\\|\]\{\}\*\^\$\&\"\']/g, "_");
		// var [str1, num1, num2] = arr1[i];

		// Find the matching element in arr2
		var matchingElement = findMatchingElement(arr2, denumireFinalaMaster);

		if (matchingElement) {
			// var str2 = matchingElement[i][0];
			var num5 = Number(matchingElement[1]); // w vizibil
			var num6 = Number(matchingElement[2]); // h vizibil
			var num7 = Number(matchingElement[3]); // w total
			var num8 = Number(matchingElement[4]); // h total
			//alert("num1: " + num1 + "\n" + "num3: " + num3 + "\n" + "num2: " + num2 + "\n" + "num4: " + num4)
			// var [, num3, num4] = matchingElement;
			if (outputFiles == "indd") {
				// dimensionsVisibilTotal.push([fileName, w, h, w_t, h_t]); //indd

				// Compare the numbers for indd
				if (num1 === num5 && num2 === num6 && num3 === num7 && num4 === num8) {
					// alert("Yes match found for " + denumireFinalaMaster);
					infoRaport.push([
						"OK",
						"master:" + denumireFinalaMaster,
						"master:" + num1,
						outputFiles + ":" + num5,
						"master:" + num2,
						outputFiles + ":" + num6,
						"master:" + num3,
						outputFiles + ":" + num7,
						"master:" + num4,
						outputFiles + ":" + num8,
					]);
				} else {
					infoRaport.push([
						"BAD Dimensions",
						"master:" + denumireFinalaMaster,
						"master:" + num1,
						outputFiles + ":" + num5,
						"master:" + num2,
						outputFiles + ":" + num6,
						"master:" + num3,
						outputFiles + ":" + num7,
						"master:" + num4,
						outputFiles + ":" + num8,
					]);
					// alert("NO match found for" + denumireFinalaMaster);
				}
			} else {
				// photoshop:
				// psdMasterListPathRatia.push([fileName, "w from name:" + WfromName, "h from name:" + HfromName, rounded_docWidth, rounded_docHeight, OK]);
				if (num3 === num7 && num4 === num8) {
					// alert("Yes match found for " + denumireFinalaMaster);
					infoRaport.push([
						"OK",
						"master:" + denumireFinalaMaster,
						"master:" + num3,
						outputFiles + ":" + num7,
						"master:" + num4,
						outputFiles + ":" + num8,
					]);
				} else {
					infoRaport.push([
						"OK",
						"master:" + denumireFinalaMaster,
						"master:" + num3,
						outputFiles + ":" + num7,
						"master:" + num4,
						outputFiles + ":" + num8,
					]);
					// alert("NO match found for" + denumireFinalaMaster);
				}
			}
		} else {
			infoRaport.push([
				"No match found for",
				"master:" + denumireFinalaMaster,
				"master:" + num1,
				"master:" + num2,
				"master:" + num3,
				"master:" + num4,
			]);
			// outputFiles + ":" + num7, "master:" + num2, outputFiles + ":" + num8, "master:" + num3,
			// outputFiles + ":" + num5, "master:" + num4, outputFiles + ":" + num6]);
			// // alert("No match found for " + denumireFinalaMaster);
		}
	}
}

function writeReport(dimensionsVisibilTotal, params, outputFiles) {
	for (var a = 0; a < dimensionsVisibilTotal.length; a++) {
		// alert(psdMasterListPathRatia[a][1])

		var message = dimensionsVisibilTotal[a];
		var filename =
			"_raport_Master--" +
			outputFiles +
			"--dimensiuni_Visibil_Total_" +
			dateZiOraMin +
			"_" +
			".txt"; // merge!

		var file = new File(params.input_folder + "/" + filename);

		// alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

		file.encoding = "UTF-8";

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		} else {
			file.open("w");
		}

		// file.open('w');
		file.write(message + "\r");
		file.close();
	}
	alert("report done!");
}

function findMatchingElement(arr2, str1) {
	for (var i = 0; i < arr2.length; i++) {
		var innerArray = arr2[i];
		var str2 = String(innerArray[0]);
		// alert("str2\n" + str2 + "--" + "\nstr1" + str1 + "--")
		if (str2 === str1) {
			// alert("MATCH\n" + str1)
			return innerArray;
		}
	}

	return null; // Return null if no match is found
}

function readFileTxt(filetxt) {
	var file = File(filetxt);
	if (file) {
		// Read the contents of the file
		file.open("r");
		var fileContents = file.read();
		file.close();

		// Parse tab-delimited data into a multidimensional array
		if (String(filetxt).indexOf("_master") !== -1) {
			var splitsign = "\t";
		} else {
			var splitsign = ",";
		}

		var dataArray = parseTabDelimited(fileContents, splitsign);
		// Do something with the dataArray
		// for (var i = 0; i < dataArray.length; i++) {
		// 	alert("i " + i + "\nzero " + dataArray[i][0]
		// 	+ "\nwv " + dataArray[i][1] +
		// 	"\nhv " + dataArray[i][2] +
		// 	"\nw " + dataArray[i][3] +
		// 	"\nt " + dataArray[i][4]) // ok
		// }
		// alert(dataArray);
	} else {
		alert("No file selected.");
	}

	return dataArray;
}

function parseTabDelimited(data, splitsign) {
	var lines = data.split("\n");
	var dataArray = [];

	for (var i = 0; i < lines.length; i++) {
		// alert(lines[i])
		// var line = String(lines[i]);
		var line = lines[i];
		// var line = trim(line0);

		// alert("dupa trim:" + line)

		if (line === "") {
			continue; // Skip empty lines
		}

		var values0 = line.split(splitsign);
		// alert("values0:" + values0)
		// if (splitsign == ",") {
		// 	for (var l = 0; l < values0.length; l++) {
		// 		alert("valoareainddsauphtxt" + i + ":" + values0[l])
		// 	}
		// }
		var dataArrayTrimed = [];
		for (var k = 0; k < values0.length; k++) {
			// alert("i " + i + "\nzero " + dataArray[k][0] + "\nwv " + dataArray[k][1] + "\nhv " + dataArray[k][2] + "\nw " + dataArray[k][3] + "\nt " + dataArray[k][4]) // ok
			vartrimedvalue = trim(values0[k]);
			// alert("vartrimedvalue:" + vartrimedvalue + "---")
			dataArrayTrimed.push(vartrimedvalue);
		}
		// for (var m = 0; m < dataArrayTrimed.length; m++) {
		// 	alert("dataArrayTrimed-" + m + "-:" + dataArrayTrimed[m] + "--")
		// }

		dataArray.push(dataArrayTrimed);
	}

	return dataArray;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}
