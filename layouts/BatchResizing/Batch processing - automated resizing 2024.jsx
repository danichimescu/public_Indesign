
/* 

Batch Automated resizing v1 2024

This is a layout resizing script. From some master key visuals made in indesign and from an excel file with W and H, final name and other specific info will result a lot of version of masters with different dimensions

! Work in progress, not final version 

(c) Dan Ichimescu constantindan@gmail.com

last update:15 dec 2023

update: ia din excel, ia cu units cm, mm, px, poate compune final name, poate accepta eticheta la orice
How it works:
1. open one master 
2. start script

Condition:
1. excel header must respect this header:
	column 1 idNumber  | column 2 place/material etc  | column 3 WIDTH (VISIBLE)  | column 4 HEIGHT (VISIBLE)  | column 5 WIDTH (TOTAL)
	| column 6 HEIGHT (TOTAL)  | column 7 measurement units  | column 8 KV name  | column 9 Campaign name/short name  | column 10 final name(if)

2. Hw and dti must be copied from example files

*/

//#target indesign;


// de facut: 1. sa se compuna numele final cu coloanele 1 - casuta si ordine, 2, 3 etc, fiecare sa aiba casuta de input, pt ordine
// 2. la kv sa nu se scrie indd??

app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
// app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;// !!!!
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;



var nameOfWindow = 'Batch processing - automated resizing 2023 | Plus other useful operations';
var date = new Date();
var year = new String((date.getYear()) - 100);
var dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + year + "  ora: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateString_ziua = "" + date.getDate() + "_" + (date.getMonth() + 1) + "_" + year;
var dateZiOraMin = "_" + date.getDate() + "_ora_" + date.getHours() + "_min_" + date.getMinutes()

var dimensionsVisibilTotal = [];
var infoRaport = [];

try {
	batch_convert()
} catch (e) {
	alert(e.message + ' (line ' + e.line + ')');
};


function batch_convert() {

	function find_documents(params) {

		function find_opendocs(docs, params) {
			var a = [];
			for (var i = 0; i < docs.length; i++) {
				try {

					if (docs[i].saved == false) {
						docs[i].save(File(params.input_folder + docs[i].name));
					}
					a.push(docs[i].fullName);
				} catch (e) {
					batch_problems.push(docs[i].name + ': ' + e.message)
				}
			}
			return a;
		}


		if (app.documents.length > 0) { // collect names of open docs
			return find_opendocs(app.documents, params);
		} else {
			return find_files(params.input_folder, params.include_subdir, ["indd"]); //params.source_type);
		}
	}

	// BEGIN batch_convert

	var params = get_data(File(script_dir() + 'batch_process.txt')); //history=File(script_dir() + 'batch_process.txt')

	// alert(params.StartRedimensions)
	/// check
	// NEW BRANCH 1
	if (params.checkagainst_Indd || params.checkagainst_Tiff || params.StartRedimensions) {


		if (params.StartRedimensions == true) {


			resizingCheckExcelAndMasters(params.input_folder, params.hw10Check, params.hw15Check, params.hw20Check, params.dtiCheck);




		}

		if (params.checkagainst_Indd) {



			var defaultLocation = params.input_folder

			Folder.current = new Folder(defaultLocation);


			var txtFolderFilePhIndd = Folder(params.input_folder).selectDlg('Choose a folder')
			// alert(txtFolderFilePhIndd)
			var txtFileMaster = String(txtFolderFilePhIndd).replace(/\/_result/g, "")



			var txtfile_indd = find_files(txtFolderFilePhIndd, false, ["_indesign*.txt"]) // _indesing
			var txtfile_master = find_files(txtFileMaster, false, ["_master*.txt"])

			if (File(txtfile_master).exists == true) {

				var outputFiles = "indd";
				if (File(txtfile_indd).exists == true) {
					checkDimensionAgainst_master(txtfile_indd, txtfile_master, outputFiles);

					writeReport(infoRaport, params, outputFiles)
				} else {
					alert("indesing report not found!")
				}
			} else {
				alert("master report not found!")
			}

		}
		if (params.checkagainst_Tiff) {

			var txtFolderFilePhIndd = Folder(params.input_folder).selectDlg('Choose a folder')
			var txtFileMaster = String(txtFolderFilePhIndd).replace(/\/_result/g, "")
			var txtfile_ph = find_files(txtFolderFilePhIndd, false, ["_photoshop*.txt"]) //
			var txtfile_master = find_files(txtFileMaster, false, ["_master*.txt"])
			var outputFiles = "tif";
			// alert("txtfile_ph " + txtfile_ph)
			if (File(txtfile_master).exists == true) {
				if (File(txtfile_ph).exists == true) {
					checkDimensionAgainst_master(txtfile_ph, txtfile_master, outputFiles);
					writeReport(infoRaport, params, outputFiles)
				} else {
					alert("photoshop report not found!")
				}
			} else {
				alert("master report not found!")
			}


		}
		//// check}
	}
	//// END BRANCH 1
	else {

		var batch_problems = [];
		var all_docs = find_documents(params);
		batch_problems = process_docs(all_docs, params, batch_problems);
		try {
			Window.find('palette', 'Processing').close();
		} catch (_) {
			//$.bp();
		};
		// app.pdfExportPreferences.viewPDF = viewPdf;
		if (batch_problems.length > 0) {
			alert('Problems with:\r\r' + batch_problems.join('\r'));
		}
	}
} // end batch_convert

// End --------------------------------------------------------------------------------------------------

function process_docs(docs, params, batch_problems) {



	function strip_drive(doc) {

		return String(doc.filePath).replace(/\/[^\/]+\//, '');
	}




	var longest_name = get_longest(docs) + 6;
	var show_filename = create_message_window(longest_name);
	show_filename.show();
	show_filename.update(); // am adaugat eu
	var current_doc, output_name, outfile, outfolder, imgs, z;
	var re = /\.[^\.]+$/;



	for (var i = 0; i < docs.length; i++) {
		try {
			current_doc = open_doc(docs[i], params);

			try {
				show_filename.message.text = decodeURI(docs[i].fullName) + ' (' + Number(i + 1) + ' of ' + docs.length + ')';
			} catch (_) {
				show_filename.message.text = decodeURI(docs[i].fullName.replace(/%/g, '_')) + ' (' + Number(i + 1) + ' of ' + docs.length + ')';
			}



			if (params.update_links) {
				try {
					current_doc.links.everyItem().update();
				} catch (_) {
					batch_problems.push('Missing links in ' + decodeURI(docs[i]));
				}
			}



			if (params.close_visible) {

				current_doc.layers.itemByName("vizibil").visible = false

			}
			if (params.open_visible) {

				current_doc.layers.itemByName("vizibil").visible = true


			}




			///////-------------->>>>>>> -------------->>>>>>> -------------->>>>>>> do something useful here

			////// write visible and page dimension in a file


			if (params.write_Dimensions) { //dlg_data.


				writeDimensionsVisiblePageWH(current_doc);
				writeDimensions(dimensionsVisibilTotal, params);



			}

			////// write visible and page dimension in a file




			///////------ -------->>>>>>>-------->>>>>>>-------->>>>>>>-------->>>>>>>-------->>>>>>> do something useful here end



			current_doc.save(); //



			show_filename.update(); // 2 update eu // !! merge aici
		} catch (e) {
			batch_problems.push(decodeURI(docs[i]) + ': ' + e.message + ' (' + e.line + ')')
		}

		// if (params.save_docs) {
		// 	current_doc.save();
		// }
		if (params.close_open_docs) {
			try {
				current_doc.close(SaveOptions.NO);
			} catch (_) {
				batch_problems.push('Problem closing ' + decodeURI(docs[i]))
			}
		}
	}


	if (params.close_open_docs) {
		for (var i = app.documents.length - 1; i > -1; i--) {
			app.documents[i].close(SaveOptions.no);
		}
	}



	return batch_problems;
} // process_docs


//------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------------------

function open_doc(f, params) {
	if (params.ignore_errors) {
		app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
	} else {
		app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
	}

	if (app.documents.length > 0 || params.runscript_check || !params.ignore_errors) {
		app.open(f);
	} else {
		app.open(f, false);
	}
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
	return /\.indb$/.test(f.name) ? app.books[0] : app.documents[0];
}


//  longest file name
function get_longest(docs) {
	var longest = 0;
	for (var i = 0; i < docs.length; i++) {
		longest = Math.max(longest, docs[i].fullName.length);
	}
	return longest;
}

function create_message_window(le) {
	var w = new Window('palette {text: "Processing"}');
	w.message = w.add('statictext', undefined, '');
	w.message.characters = le;
	return w;
}


// The interface ===============================================================

function get_data(history) {

	tabs = [];
	var icons = define_icons();
	var w = new Window('dialog', nameOfWindow, undefined, { closeButton: false });
	w.orientation = 'row'; w.alignChildren = ['top', 'top'];
	var w1 = w.add('group');
	w1.alignChildren = 'fill';
	var main = w1.add('group {alignChildren: "fill", orientation: "column"}');

	tp = main.add('tabbedpanel {alignChildren: ["left", "top"], orientation: "column"}')
	tabs[0] = tp.add("tab");
	tabs[0].text = "Info Automated resizing";
	tabs[0].index = 1;

	tabs[1] = tp.add("tab");
	tabs[1].text = "Info Input folder";
	tabs[1].index = 0;

	tabs[2] = tp.add("tab");
	tabs[2].text = "Info export";
	tabs[2].index = 2;

	tabs[3] = tp.add("tab");
	tabs[3].text = "Useful things..";
	tabs[3].index = 3;

	tabs[0].alignChildren = "left";
	tabs[0].add('statictext  {text: "1. Excel file structure:"}');
	tabs[0].add('statictext  {text: "1st Column: idNumber | 2nd Column: place/material etc | 3nd Column:  width (visible) | 4rd Column: height (visible) | 5th Column: width (total) | 6th Column: height (total) | "}');
	tabs[0].add('statictext  {text: "7th Column: units | 8th Column: name of master | 9th Column: Campaign name / shortName | 10th Column: finalName-optional "}');
	tabs[0].add('statictext  {text: "2. In input folder select working folder with one excel file and master or masters indd files!"}');

	// tabs[1].margins = [10, 1, 1, 1];

	// ---------------input

	var folder = main.add('panel {text: "Input folder:", alignChildren: "left"}');
	var infolder = folder.add('group {_: StaticText {text: "Indd/pdf/tif/txt/xlx folder:"}}');
	var inp = infolder.add('group {alignChildren: "left", orientation: "stack"}');
	if (File.fs != 'Windows') {
		var inlist = inp.add('dropdownlist');
	}
	var infolder_name = inp.add('edittext');
	if (File.fs == 'Windows') {
		var inlist = inp.add('dropdownlist');
	}
	inlist.preferredSize = [630, 22];
	infolder_name.preferredSize = [610, 22];
	var infolder_button = infolder.add('iconbutton', undefined, icons.folder, { style: 'toolbutton' });

	var check_boxes = folder.add('group {orientation: "row"}');
	check_boxes.margins.right = 45;


	var ignore_errors = check_boxes.add('checkbox', undefined, 'Ignore errors');
	// ---------------input


	// // --------------- resizing
	var resizing = main.add('panel {text: "Automated resizing", alignChildren: ["left", "top"], orientation: "column"}');

	resizing.add('statictext  {text: "Plese be sure that in working folder are all masters and excel file! | All resizing files will be in <<result>> folder!"}');
	// resizing.add('statictext  {text: "All resinzing files will be in <<result>> folder!"}');

	var Redimensions = resizing.add('group {orientation: "row"}');
	Redimensions.margins.right = 5;
	var StartRedimensions = Redimensions.add('checkbox', undefined, 'S T A R T   R E S I Z I N G');
	var numberingFiles = Redimensions.add('checkbox', undefined, 'Number the files');
	var hw10Check = Redimensions.add('checkbox', undefined, 'HW=10%');
	var hw15Check = Redimensions.add('checkbox', undefined, 'HW=15%');
	var hw20Check = Redimensions.add('checkbox', undefined, 'HW=20%');
	var dtiCheck = Redimensions.add('checkbox', undefined, 'DTI');
	var iDCheck = Redimensions.add('checkbox', undefined, 'Id');
	var finalNameCheck = Redimensions.add('checkbox', undefined, 'Compose final name');
	var infolNameofCampain = Redimensions.add('staticText {text: "Name of campain"}');
	// var textNameofCampain = Redimensions.add('group {alignChildren: "left", orientation: "row"}');
	var infolder_textNameofCampain = Redimensions.add('edittext');
	infolder_textNameofCampain.preferredSize = [150, 22];
	// // --------------- resizing


	// // --------------- export
	var pdfOptions = main.add('panel {text: "Export", alignChildren: ["left", "top"], orientation: "row"}');
	var pdf_presets = app.pdfExportPresets.everyItem().name;
	var pdf_presetGroup = pdfOptions.add('group {alignChildren: ["left", "top"]}');
	pdf_presetGroup.add('statictext {text: "PDF preset:"}');
	pdf_presetlist = pdf_presetGroup.add('listbox', undefined, pdf_presets, { multiselect: true });
	pdf_presetlist.preferredSize.height = 100;
	pdf_presetlist.preferredSize.width = 300;
	pdf_presetlist.selection = 0;

	var exportGroup1 = pdfOptions.add('group {orientation: "column", alignChildren: "left"}'); //('group {alignChildren: ["left", "top"]}');
	var exportPdfCheck = exportGroup1.add('checkbox', undefined, "EXPORT PDF");

	// var exportGroup2 = pdfOptions.add('group {alignChildren: ["left", "top"]}');
	var exportTiffCheck = exportGroup1.add('checkbox', undefined, "MAKE TIF (from pdf)");
	var exportTiffDirectCheck = exportGroup1.add('checkbox', undefined, "MAKE Direct TIF (one clic for tif | indd->pdf->tif)");

	var exportJpgffCheck = exportGroup1.add('checkbox', undefined, "EXPORT JPG (from indd)");

	var exportJpgffCheck2 = exportGroup1.add('checkbox', undefined, "EXPORT Visible jpg (from indd)");


	var exportGroup2 = pdfOptions.add('group {orientation: "column", alignChildren: "left"}'); //('group {alignChildren: ["left", "top"]}');

	var makePdfFolderCheck = exportGroup2.add('checkbox', undefined, "make pdf folder");
	// var exportGroup2 = pdfOptions.add('group {alignChildren: ["left", "top"]}');

	var makeTifFolderCheck = exportGroup2.add('checkbox', undefined, "make tif folder");
	var makeTifdirectFolderCheck = exportGroup2.add('checkbox', undefined, "make directTif folder");

	var makeJpgFolderCheck = exportGroup2.add('checkbox', undefined, "make jpg folder");

	var makeJpgFolderCheck2 = exportGroup2.add('checkbox', undefined, "make jpgVisible folder");
	// // --------------- export end



	// // --------------- useful
	var miscOptions = main.add('panel {text: "Useful things..", alignChildren: ["left", "top"], orientation: "row"}');

	var miscOptions1 = miscOptions.add('group {orientation: "column", alignChildren: "left"}');
	miscOptions1.spacing = 2;
	/// close visible
	var close_visible = miscOptions1.add('checkbox', undefined, "Close visible layer");
	// close_visible.value = true;
	var open_visible = miscOptions1.add('checkbox', undefined, "Open visible layer");

	//write_Dimensions
	var writeReport = miscOptions.add('group {orientation: "column", alignChildren: "left"}');
	writeReport.spacing = 2;
	var write_DimensionsIndd = writeReport.add('checkbox', undefined, "Write report w h (visible) and W H (total) - from indd files");
	var write_DimensionsTiff = writeReport.add('checkbox', undefined, "Write report W H (total) - from tif files");
	// var save_docs = misc_options.add('checkbox', undefined, 'Save changed documents on closing');
	// check
	var checking = miscOptions.add('group {orientation: "column", alignChildren: "left"}');
	checking.spacing = 2;
	var checkagainst_Indd = checking.add('checkbox {text: "Check dimensions: excel(txt) <-> indd (txt)"}');
	var checkagainst_Tiff = checking.add('checkbox {text: "Check dimensions: excel(txt) <-> tiff (txt)"}');
	var writeReport_Links = checking.add('checkbox {text: "Write report for links effective dpi"}');

	// // --------------- useful end


	// // --------------- fix tif

	var fixTifPanel = main.add('panel {text: "Fix tif dimensions", alignChildren: ["left", "top"], orientation: "row"}');

	var fixtifGroup = fixTifPanel.add('group {orientation: "column", alignChildren: "left"}');
	var fixTifCheck = fixtifGroup.add('checkbox', undefined, "Fix tif from report");
	fixtifGroup.spacing = 2;


	// // --------------- fix tif end

	// // --------------- misc
	var options = main.add('panel {text: "Misc",  alignChildren: ["left", "top"], orientation: "row"}');
	var misc_options = options.add('group {orientation: "row", alignChildren: "left"}');
	var update_links = misc_options.add('checkbox', undefined, 'Update links');
	var close_open_docs = misc_options.add('checkbox', undefined, 'Close open documents');
	var save_docs = misc_options.add('checkbox', undefined, 'Save changed documents on closing');
	// // --------------- misc end

	var bpresets = get_batch_presets();


	var buttons = w.add('group {orientation: "column", alignChildren: "fill"}');
	var okButton = buttons.add('button', undefined, 'OK');
	buttons.add('button', undefined, 'Cancel', { name: 'cancel' });

	save_settings = buttons.add('checkbox {text: "Save settings"}');



	function get_batch_presets() {
		var p = [];
		var f = Folder(script_dir()).getFiles('*.batch_process');
		for (var i = 0; i < f.length; i++) {
			p.push(decodeURI(f[i].name.replace(/\.batch_process$/, '')));
		}
		if (p.length > 1) p.sort();
		p.unshift('[None]');
		return p;
	}

	// batch presets ----------------------------------------------------------------------------------------------------------------------------------


	function get_filename(str) {
		var path = script_dir();
		var name = get_name(str);
		if (name == '') return '';
		var f = File(path + name + '.batch_preset');
		while (f.exists && askYN('Preset exists -- replace?') == false) {
			name = get_name(str);
			if (name == '') return '';
			f = File(path + name + '.batch_preset');
		}
		return { file: f, menu_name: name };
	}


	function get_name(str) {
		var w = new Window('dialog {alignChildren: "right"}');
		var gr = w.add('group {_: StaticText {text: "Save preset as:"}}')
		var e = gr.add('edittext {characters: 20, active: true}');
		e.text = str;
		var buttons = w.add('group');
		buttons.add('button {text: "Cancel"}');
		var ok = buttons.add('button {text: "OK"}');

		if (w.show() == 1) {
			return e.text;
		}
		return '';
	}


	function askYN(s) {
		var w = new Window('dialog', '', undefined, { closeButton: false });
		w.add('group {_: StaticText {text: "' + s + '"}}');
		var buttons = w.add('group');
		buttons.add('button', undefined, 'No', { name: 'cancel' });
		buttons.add('button', undefined, 'Yes', { name: 'ok' });
		return w.show() == 1 ? true : false;
	}


	function insert_item(list_obj, new_item) {
		if (list_obj.find(new_item) == null) {
			var stop = list_obj.items.length;
			var i = 0;
			while (i < stop && new_item > list_obj.items[i].text) {
				i++;
			}
			list_obj.add('item', new_item, i);
		}
	}

	// end batch presets -------------------------------------------------------------------------------------------------------------------------------




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
		file_array.unshift('[None]');
		return file_array;
	}



	inlist.onChange = function () {


		infolder_name.text = inlist.selection.text
	}



	infolder_name.onChange = function () {

		if (Folder(this.text).exists == false) {
			this.text = 'Folder does not exist'.toUpperCase();
		} else {
			var f = Folder(this.text);
			infolder_name.text = f.fullName + '/';

		}
		this.active = true;
	}




	infolder_button.onClick = function () {
		// this.text = this.text.replace(/([^\/])$/, '$1/');
		var f = Folder(infolder_name.text).selectDlg('Choose a folder')
		if (f != null) {
			infolder_name.text = f.fullName + '/';
			// outfolder_name.text = f.fullName + '/';
			infolder_name.active = true;
		} else {
			return 0;
		}
	}




	varMyObjHw = {
		obj1: hw10Check.value = false,
		obj2: hw15Check.value = false,
		obj3: hw20Check.value = false
	}
	// Function to handle checkbox clicks Value
	function handleCheckboxClick(clickedCheckbox, otherCheckboxes) {
		if (clickedCheckbox.value) {
			// Uncheck other checkboxes
			for (var i = 0; i < otherCheckboxes.length; i++) {
				otherCheckboxes[i].value = false;
			}
		}
	}
	// Function to handle checkbox clicks Enable\Disable
	function handleCheckboxClickEnableDisable(clickedCheckbox, otherCheckboxes) {
		if (clickedCheckbox.value) {
			// Uncheck other checkboxes
			for (var i = 0; i < otherCheckboxes.length; i++) {
				otherCheckboxes[i].enabled = false;
			}
		} else {
			for (var i = 0; i < otherCheckboxes.length; i++) {
				otherCheckboxes[i].enabled = true;
			}
		}
	}
	// Function to handle checkbox clicks Value False
	function makeCheckboxFalse(otherCheckboxes) {

		// Uncheck other checkboxes
		for (var i = 0; i < otherCheckboxes.length; i++) {
			otherCheckboxes[i].value = false;
		}
	}
	function disableOtherGroups(groups, pdfOptions, arrBigGroups) {
		var arrTempGroups = [].concat(arrBigGroups);
		removeElement(arrTempGroups, pdfOptions);
		handleCheckboxClickEnableDisable(groups, arrTempGroups);
	}
	function moreHandleChecEnableDisable(exportPdfCheck, makePdfFolderCheck, arrExportPdf, arrExportPdfMakeFolder) {
		var arrTemp = [].concat(arrExportPdf);
		removeElement(arrTemp, exportPdfCheck);
		removeElement(arrTemp, makePdfFolderCheck);
		handleCheckboxClickEnableDisable(exportPdfCheck, arrTemp);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makePdfFolderCheck);
		makeCheckboxFalse(arrTempp);
	}





	// HW Assign onClick handlers for checkboxes
	hw10Check.onClick = function () {
		handleCheckboxClick(this, [hw15Check, hw20Check]);
	};

	hw15Check.onClick = function () {
		handleCheckboxClick(this, [hw10Check, hw20Check]);
	};

	hw20Check.onClick = function () {
		handleCheckboxClick(this, [hw10Check, hw15Check]);
	};

	var arrExportPdf = [exportPdfCheck, exportTiffCheck, exportTiffDirectCheck, exportJpgffCheck, exportJpgffCheck2, makePdfFolderCheck, makeTifFolderCheck, makeTifdirectFolderCheck, makeJpgFolderCheck, makeJpgFolderCheck2];
	var arrExportPdfMakeFolder = [makePdfFolderCheck, makeTifFolderCheck, makeTifdirectFolderCheck, makeJpgFolderCheck, makeJpgFolderCheck2];
	var arrBigGroups = [Redimensions, pdfOptions, miscOptions, fixTifPanel, close_open_docs, save_docs];

	// Function to remove an element from the array
	function removeElement(arr, element) {
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] === element) {
				arr.splice(i, 1);
				break; // Assuming each element is unique, you can exit the loop after the first removal
			}
		}
	}


	// StartRedimensions.onChange = function () {


	// };
	StartRedimensions.onClick = function () {
		moreHandleChecEnableDisable(exportPdfCheck, makePdfFolderCheck, arrExportPdf, arrExportPdfMakeFolder)
		disableOtherGroups(this, Redimensions, arrBigGroups);
		// alert(infolder_name.text)


	};

	//exportPdfCheck -- ok good
	exportPdfCheck.onChange = function () {


		moreHandleChecEnableDisable(exportPdfCheck, makePdfFolderCheck, arrExportPdf, arrExportPdfMakeFolder)
	};
	exportPdfCheck.onClick = function () {

		moreHandleChecEnableDisable(exportPdfCheck, makePdfFolderCheck, arrExportPdf, arrExportPdfMakeFolder)
		disableOtherGroups(this, pdfOptions, arrBigGroups);

	};



	//exportTiffCheck -- ok good
	exportTiffCheck.onChange = function () {

		var arrTemp1 = [].concat(arrExportPdf);
		removeElement(arrTemp1, exportTiffCheck);
		removeElement(arrTemp1, makeTifFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp1);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeTifFolderCheck);
		makeCheckboxFalse(arrTempp);
	};
	exportTiffCheck.onClick = function () {
		var arrTemp1 = [].concat(arrExportPdf);
		removeElement(arrTemp1, exportTiffCheck);
		removeElement(arrTemp1, makeTifFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp1);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeTifFolderCheck);
		makeCheckboxFalse(arrTempp);

		disableOtherGroups(this, pdfOptions, arrBigGroups);
	};

	//exportTiffDirectCheck -- ok good
	exportTiffDirectCheck.onChange = function () {
		var arrTemp2 = [].concat(arrExportPdf);
		removeElement(arrTemp2, exportTiffDirectCheck);
		removeElement(arrTemp2, makeTifdirectFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp2);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeTifdirectFolderCheck);
		makeCheckboxFalse(arrTempp);
	};
	exportTiffDirectCheck.onClick = function () {
		var arrTemp2 = [].concat(arrExportPdf);
		removeElement(arrTemp2, exportTiffDirectCheck);
		removeElement(arrTemp2, makeTifdirectFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp2);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeTifdirectFolderCheck);
		makeCheckboxFalse(arrTempp);

		disableOtherGroups(this, pdfOptions, arrBigGroups);
	};
	//exportJpgffCheck -- ok good
	exportJpgffCheck.onChange = function () {
		var arrTemp3 = [].concat(arrExportPdf);
		removeElement(arrTemp3, exportJpgffCheck);
		removeElement(arrTemp3, makeJpgFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp3);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeJpgFolderCheck);
		makeCheckboxFalse(arrTempp);
	};
	exportJpgffCheck.onClick = function () {
		var arrTemp3 = [].concat(arrExportPdf);
		removeElement(arrTemp3, exportJpgffCheck);
		removeElement(arrTemp3, makeJpgFolderCheck);
		handleCheckboxClickEnableDisable(this, arrTemp3);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeJpgFolderCheck);
		makeCheckboxFalse(arrTempp);

		disableOtherGroups(this, pdfOptions, arrBigGroups);
	};
	//exportJpgffCheck2 -- ok good
	exportJpgffCheck2.onChange = function () {
		var arrTemp4 = [].concat(arrExportPdf);
		removeElement(arrTemp4, exportJpgffCheck2);
		removeElement(arrTemp4, makeJpgFolderCheck2);
		handleCheckboxClickEnableDisable(this, arrTemp4);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeJpgFolderCheck2);
		makeCheckboxFalse(arrTempp);
	};
	exportJpgffCheck2.onClick = function () {
		var arrTemp4 = [].concat(arrExportPdf);
		removeElement(arrTemp4, exportJpgffCheck2);
		removeElement(arrTemp4, makeJpgFolderCheck2);
		handleCheckboxClickEnableDisable(this, arrTemp4);

		var arrTempp = [].concat(arrExportPdfMakeFolder);
		removeElement(arrTempp, makeJpgFolderCheck2);
		makeCheckboxFalse(arrTempp);

		disableOtherGroups(this, pdfOptions, arrBigGroups);
	};


	////----------------end export 


	////------------ misc

	var arrMiscCheck = [close_visible, open_visible, write_DimensionsIndd, write_DimensionsTiff, checkagainst_Indd, checkagainst_Tiff, writeReport_Links]


	//close_visible -- 
	close_visible.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, close_visible);
		handleCheckboxClickEnableDisable(this, arrTemp);

	};
	close_visible.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, close_visible);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);

	};

	//open_visible -- 
	open_visible.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, open_visible);
		handleCheckboxClickEnableDisable(this, arrTemp);


	};
	open_visible.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, open_visible);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);


	};


	//write_DimensionsIndd -- 
	write_DimensionsIndd.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, write_DimensionsIndd);
		handleCheckboxClickEnableDisable(this, arrTemp);


	};
	write_DimensionsIndd.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, write_DimensionsIndd);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);


	};

	//write_DimensionsTiff -- 
	write_DimensionsTiff.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, write_DimensionsTiff);
		handleCheckboxClickEnableDisable(this, arrTemp);


	};
	write_DimensionsTiff.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, write_DimensionsTiff);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);

	};

	//checkagainst_Indd -- 
	checkagainst_Indd.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, checkagainst_Indd);
		handleCheckboxClickEnableDisable(this, arrTemp);

	};
	checkagainst_Indd.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, checkagainst_Indd);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);

	};

	//checkagainst_Tiff -- 
	checkagainst_Tiff.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, checkagainst_Tiff);
		handleCheckboxClickEnableDisable(this, arrTemp);


	};
	checkagainst_Tiff.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, checkagainst_Tiff);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);


	};

	//writeReport_Links -- 
	writeReport_Links.onChange = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, writeReport_Links);
		handleCheckboxClickEnableDisable(this, arrTemp);


	};
	writeReport_Links.onClick = function () {
		var arrTemp = [].concat(arrMiscCheck);
		removeElement(arrTemp, writeReport_Links);
		handleCheckboxClickEnableDisable(this, arrTemp);

		disableOtherGroups(this, miscOptions, arrBigGroups);

	};



	////----------------end misc


	////// end clic MANAGEMENT-------------------------




	// Defaults -----------------------------------------------------------------------------------------
	var ID = parseFloat(app.version);


	// set some more things in the dialog, either from a file...
	if (history.exists == true) {
		var previous = get_previous(history); // get previous citeste txt cu variabile

		set_dialog(previous);

	} else {


	}

	// set dialog from file ------------------------------------------------------------------------------------------------------

	function set_dialog(previous) {
		infolder_name.text = fill_list(inlist, previous.input_folder);

		ignore_errors.value = previous.ignore_errors;

		if (app.documents.length > 0) {
			infolder_name.text = '';
		}


	}

	// end set dialog from file ---------------------------------------------------------------------------------------------------

	if (app.documents.length > 0) {

		infolder.enabled = false; // aici se da disable la info folders!!!

	} else {
		close_open_docs.value = true;
		close_open_docs.enabled = false;
	}



	w.onShow = function () {
		save_settings.value = true;
		pdf_presetlist.revealItem(previous.pdf_preset[0]);
		separate_PDF_pages.notify(); separate_PDF_pages.notify();
	}

	if (w.show() == 2) {
		w.close();

		exit();
	} else {
		if (infolder_name.text == 'FOLDER DOES NOT EXIST'  /*|| infolder_name.text == '' */) {
			exit();
		}


		var dlg_data = collect_dlg_data();


		if (save_settings.value) {
			store_settings(history, dlg_data);

		}
		w.close();
		dlg_data.input_folder = infolder_name.text;
		// alert(dlg_data.write_Dimensions)
		return dlg_data;
	}



	function collect_dlg_data() {
		var obj = {
			input_folder: create_string(inlist, infolder_name.text),

			ignore_errors: ignore_errors.value,

			StartRedimensions: StartRedimensions.value,
			numberingFiles: numberingFiles.value,
			hw10Check: hw10Check.value,
			hw15Check: hw15Check.value,
			hw20Check: hw20Check.value,
			dtiCheck: dtiCheck.value,
			iDCheck: iDCheck.value,
			finalNameCheck: finalNameCheck.value,
			infolder_textNameofCampain: infolder_textNameofCampain.value,

			exportPdfCheck: exportPdfCheck.value,
			exportTiffCheck: exportTiffCheck.value,
			exportTiffDirectCheck: exportTiffDirectCheck.value,
			exportJpgffCheck: exportJpgffCheck.value,
			exportJpgffCheck2: exportJpgffCheck2.value,

			makePdfFolderCheck: makePdfFolderCheck.value,
			makeTifFolderCheck: makeTifFolderCheck.value,
			makeTifdirectFolderCheck: makeTifdirectFolderCheck.value,
			makeJpgFolderCheck: makeJpgFolderCheck.value,
			makeJpgFolderCheck2: makeJpgFolderCheck2.value,

			close_visible: close_visible.value,
			open_visible: open_visible.value,
			// write_Dimensions
			write_Dimensions: write_DimensionsIndd.value,
			write_DimensionsTiff: write_DimensionsTiff.value,
			checkagainst_Indd: checkagainst_Indd.value,
			checkagainst_Tiff: checkagainst_Tiff.value,

			writeReport_Links: writeReport_Links.value,

			fixTifCheck: fixTifCheck.value,

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
		var listPathOk = [];
		var array = str.split('##');
		for (var i = 0; i < array.length; i++) {
			// check paths
			if (Folder(array[i]).exists == true) {
				// alert("!! arri" + array[i])

				var fld = Folder(array[i]);
				var pathFull = fld.fullName + '/';

				listPathOk.push(pathFull);
				list.add('item', pathFull);

			}

		}
		return listPathOk[0];
	}


	function create_string(list, new_mask) {
		if (parseInt(app.version) == 6) {
			return new_mask;
		}

		list.remove(list.find(new_mask));
		if (list.items.length > 0) {
			list.add('item', new_mask, 0);
		} else {
			list.add('item', new_mask);
		}
		var str = '';
		var stop = Math.min(list.items.length, 8) - 1;
		for (var i = 0; i < stop; i++) {
			str += list.items[i].text + '##';
		}
		str += list.items[i].text;
		return str
	}




	function array_index(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].value == true) {
				return i;
			}
		}
	}

} // *************************** get_data end


function get_previous(f) {
	var temp = {};
	if (f.exists) {
		f.open('r');
		temp = f.read();
		f.close();
	}
	return eval(temp);
}


function store_settings(f, obj) {
	f.open('w');
	f.write(obj.toSource());
	f.close();
}


function script_dir() {
	try {
		return File(app.activeScript).path + '/';
	} catch (e) {
		return File(e.fileName).path + '/';
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
	var f = Folder(dir).getFiles('*.*');
	for (var i = 0; i < f.length; i++) {
		// names starting with a dot are system files and folders
		if (f[i] instanceof Folder && f[i].name[0] != '.') {
			find_files_sub(f[i], array, mask);
		} else {
			if (f[i].name[0] != '.' && f[i].name.substr(-mask.length).toUpperCase() == mask) {
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
			arr = arr.concat(Folder(dir).getFiles('*' + mask_array[i]));
		}
	}
	return arr;
}


//--------------------------------------------------------------------------------------------------------

function unique_name(f) {
	function strip_base(s) {
		return s.replace(/_\d+$/, '');
	}

	var str = String(f);
	var pos = str.lastIndexOf('.');
	var base = str.slice(0, pos);
	var type = str.slice(pos, str.length)

	var n = 0;
	while (File(base + type).exists) {
		base = strip_base(base) + '_' + String(++n);
	}
	return base + type;
}


function define_icons() {
	var o = { folder: "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x12\b\x06\x00\x00\x00_%.-\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008E|\u00FBQ\u0093\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x02\u00DEIDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00@\x0011\u00D0\b\x00\x04\x10\u00CD\f\x06\b \x16\x18CFR\x12L\u00CF*\u0092e\u00FE\u00F7\u009F!\u008C\u0097\u008By\x19\u0088\u00FF\u00F7\u00EF\x7F\u0086\u00CF\u00DF\u00FE\u00C6dOz\u00B2\x1C\u00C8\u00FD\x0F\u00C5\x04\x01@\x00\u00A1\u00B8\x18f(##C\u00AD\u009Ak9\u0083\u008E_\x17\u0083i\u00D4<\x06\x16f\u00C6\u009A\t\u00D9\u00D21@%\u00CC@\u00CCH\u008C\u00C1\x00\x01\u00C4\b\u008B<\u0090\u008Bg\x14\u00CAF212,\u00D3q\u00CDb\u00E0\x16Rf`\u00E3\x14f`\u00E5\x14d\u00F8\u00FF\u00E7'\u00C3\u00FE\u00D9a\x18\u009A\u00FF\u00FE\u00FB\u009Fq\u00F3\u00F1\u00CF%\x13\u00D6\u00BE\u00FE\u0086\u00EE\x13\u0080\x00bA\u00B6\x04d\u00A8\u00A1_\x15\u00D8@\u0098\u00A1\u00AC\u00EC\u00FC\f\u00CC<\\\f^\u00A5\u00A7P\f\u00FD\u00F6\u00EE.\u00C3\u00DD\x03\x1D3\u00BE\u00FF<\u00FF\f\u00C8\u00DD\x01\u00C4\x7F\u0090\r\x07\b \x14\u0083A\x04\u00CCP6\x0E!\u0086\u00A3s\x03\x18XY\x19\x19\u00FE\x01\u00C3\x07\x14\u00D6\x7F\u00A1\u00F4\u009F\u00BF\f`\fb\x03}\u00BC\u00A9+U\u0092\u00E1\u00F9\u009B\u00BF\u00BA\u00FD\u00EB_]\u0083\u00C5\x03@\x00\u00B1\u00A0\u00877\u00CC\u00A5\u00F7\x0F\u00F72\u00C8\x1B\x052p\n(\u0080\u00A5\u00FE\u00FD\u00F9\u00C5\u00F0\u00F7\u00F7o\u0086?\u00BF\x7F1\u00FC\u00F9\x05\u00A1\u00FF\u00FE\u00F9\r\u00C6\u009F\u009E_\x00\u00C6\u00C3\u00FDI@\u0085^@\u00FC\x1B\x14J\x00\x01\u00C4\u0084\u00EEb\u0090\u00A1\u00BF>\u00BFd\u00F8\u00FC\u00EA:\x03\u00A7\u00A0\"\u00C3\u00BF\u00BF\u00BF\x19\u00FE\u00FF\u00FD\x034\u00F8\x0F\u00D8\u0090\x7F\u00BFAl \u00FD\u00EF/P\u00EE\x0FX\u00FE\u00C0\u00B1+\f\u008F^\u00FD<\b\u00D4\u00CE\x01\u008B`\u0080\x00\u00C2\b\n\x0E\x1EI\u0086\u009B\u00DB\u00CA\x19\u0084\u0094\u00EC\u0081\u0081\u00CE\u00CA\u00C0\u00C4\x04\u00F4\u00FE\u00AF_`\u0083A\u0086\u0082]\u00F9\x17j8\u0090\u00FE\u00F1\u00E9)\u00C3\u00D6\x13/\x19\u00EE\u00BFa\u00D8\u00C2\u00CE\u00C6\u00CE\n5\u00F8\x0F@\x00ad\u0090W7\u00B60\u00FC\u00FB\u00FF\u0087\u0081KX\x05\u00E8\u00D2\u00DF`\x03\u00FE\u0082]\x0Bq\u00DD\u00BF\u00BF0\u0097\u00FE\x05\u0086\u00EF_\u0086\u00C3G\u008E1\u00DCy\u00FE}9\u00D0\u00D0O\u00C8I\x11 \u00800\f~xr\x06\u0083\u00A0\u00825\u00C3\u00FF\x7FPW\x01\r\x04Y\x00q\u00E9_ \u0086\x1A\x0E\u0094\u00FF\t\f\u00B2\u0095\u00FB\u009F20\u00B3p\u00CC\u0082\u00A6\n\x10\u00FE\x07\u008A<\u0080\x00\u00C20\u0098\u009DO\u0082\u0081\u009DG\x02\x12\u00AE@\u00CD \u0083\u00C0^\x07bP\u00E4\u00FD\u0083\x1A\u00FE\x1F\u00E8\u00ABS'\u008F2\u00DC{\u00FE}\x1D;;\u00C7\x0B\u00A0\u00D6\u009F@\u00FC\x0B\x14q \u0083\x01\x02\u0088\x05\u00C5P6&\u0086\u00F6i\u00DB\x18^\u00BE[\x0FNJ\u00BF\u00FF\u00FCc\x00&\x00\u0086\u00DF\u00BF!l`\x10\x03\u0093\u00D9\x7F0\u00FE\x0B\u00CCX\u00DF\x7F\u00FEe`e\u00E3\u009C\t5\u00F0'\u0092\u008B\x19\x00\x02\b9\u00E7\u0081\x02\u009E\x0B\u0088\u00F9\u00A14+\x119\u00F7\x1F\u00D4\u00D0/P\u00FC\x1Dj8\x03@\x00!\u00BB\u00F8?T\u00F0'\u0096\u00CCC\u00C8\u00E0\u00EFP\u00FA\x1FL\x02 \u0080X\u00D0\x14\u00FD\u0086\u00DA\u00FC\u0083\u00C8\"\x15\u00E6\u0098\u00DF\u00C8\u00C1\x00\x02\x00\x01\x06\x000\u00B2{\u009A\u00B3\x1C#o\x00\x00\x00\x00IEND\u00AEB`\u0082" };
	if (parseInt(app.version) < 9) {
		o.bin = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x14\b\x02\x00\x00\x00\x0B\x00* \x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\nOiCCPPhotoshop ICC profile\x00\x00x\u00DA\u009DSgTS\u00E9\x16=\u00F7\u00DE\u00F4BK\u0088\u0080\u0094KoR\x15\b RB\u008B\u0080\x14\u0091&*!\t\x10J\u0088!\u00A1\u00D9\x15Q\u00C1\x11EE\x04\x1B\u00C8\u00A0\u0088\x03\u008E\u008E\u0080\u008C\x15Q,\f\u008A\n\u00D8\x07\u00E4!\u00A2\u008E\u0083\u00A3\u0088\u008A\u00CA\u00FB\u00E1{\u00A3k\u00D6\u00BC\u00F7\u00E6\u00CD\u00FE\u00B5\u00D7>\u00E7\u00AC\u00F3\u009D\u00B3\u00CF\x07\u00C0\b\f\u0096H3Q5\u0080\f\u00A9B\x1E\x11\u00E0\u0083\u00C7\u00C4\u00C6\u00E1\u00E4.@\u0081\n$p\x00\x10\b\u00B3d!s\u00FD#\x01\x00\u00F8~<<+\"\u00C0\x07\u00BE\x00\x01x\u00D3\x0B\b\x00\u00C0M\u009B\u00C00\x1C\u0087\u00FF\x0F\u00EAB\u0099\\\x01\u0080\u0084\x01\u00C0t\u00918K\b\u0080\x14\x00@z\u008EB\u00A6\x00@F\x01\u0080\u009D\u0098&S\x00\u00A0\x04\x00`\u00CBcb\u00E3\x00P-\x00`'\x7F\u00E6\u00D3\x00\u0080\u009D\u00F8\u0099{\x01\x00[\u0094!\x15\x01\u00A0\u0091\x00 \x13e\u0088D\x00h;\x00\u00AC\u00CFV\u008AE\x00X0\x00\x14fK\u00C49\x00\u00D8-\x000IWfH\x00\u00B0\u00B7\x00\u00C0\u00CE\x10\x0B\u00B2\x00\b\f\x000Q\u0088\u0085)\x00\x04{\x00`\u00C8##x\x00\u0084\u0099\x00\x14F\u00F2W<\u00F1+\u00AE\x10\u00E7*\x00\x00x\u0099\u00B2<\u00B9$9E\u0081[\b-q\x07WW.\x1E(\u00CEI\x17+\x146a\x02a\u009A@.\u00C2y\u0099\x192\u00814\x0F\u00E0\u00F3\u00CC\x00\x00\u00A0\u0091\x15\x11\u00E0\u0083\u00F3\u00FDx\u00CE\x0E\u00AE\u00CE\u00CE6\u008E\u00B6\x0E_-\u00EA\u00BF\x06\u00FF\"bb\u00E3\u00FE\u00E5\u00CF\u00ABp@\x00\x00\u00E1t~\u00D1\u00FE,/\u00B3\x1A\u0080;\x06\u0080m\u00FE\u00A2%\u00EE\x04h^\x0B\u00A0u\u00F7\u008Bf\u00B2\x0F@\u00B5\x00\u00A0\u00E9\u00DAW\u00F3p\u00F8~<<E\u00A1\u0090\u00B9\u00D9\u00D9\u00E5\u00E4\u00E4\u00D8J\u00C4B[a\u00CAW}\u00FEg\u00C2_\u00C0W\u00FDl\u00F9~<\u00FC\u00F7\u00F5\u00E0\u00BE\u00E2$\u00812]\u0081G\x04\u00F8\u00E0\u00C2\u00CC\u00F4L\u00A5\x1C\u00CF\u0092\t\u0084b\u00DC\u00E6\u008FG\u00FC\u00B7\x0B\u00FF\u00FC\x1D\u00D3\"\u00C4Ib\u00B9X*\x14\u00E3Q\x12q\u008ED\u009A\u008C\u00F32\u00A5\"\u0089B\u0092)\u00C5%\u00D2\u00FFd\u00E2\u00DF,\u00FB\x03>\u00DF5\x00\u00B0j>\x01{\u0091-\u00A8]c\x03\u00F6K'\x10Xt\u00C0\u00E2\u00F7\x00\x00\u00F2\u00BBo\u00C1\u00D4(\b\x03\u0080h\u0083\u00E1\u00CFw\u00FF\u00EF?\u00FDG\u00A0%\x00\u0080fI\u0092q\x00\x00^D$.T\u00CA\u00B3?\u00C7\b\x00\x00D\u00A0\u0081*\u00B0A\x1B\u00F4\u00C1\x18,\u00C0\x06\x1C\u00C1\x05\u00DC\u00C1\x0B\u00FC`6\u0084B$\u00C4\u00C2B\x10B\nd\u0080\x1Cr`)\u00AC\u0082B(\u0086\u00CD\u00B0\x1D*`/\u00D4@\x1D4\u00C0Qh\u0086\u0093p\x0E.\u00C2U\u00B8\x0E=p\x0F\u00FAa\b\u009E\u00C1(\u00BC\u0081\t\x04A\u00C8\b\x13a!\u00DA\u0088\x01b\u008AX#\u008E\b\x17\u0099\u0085\u00F8!\u00C1H\x04\x12\u008B$ \u00C9\u0088\x14Q\"K\u00915H1R\u008AT UH\x1D\u00F2=r\x029\u0087\\F\u00BA\u0091;\u00C8\x002\u0082\u00FC\u0086\u00BCG1\u0094\u0081\u00B2Q=\u00D4\f\u00B5C\u00B9\u00A87\x1A\u0084F\u00A2\x0B\u00D0dt1\u009A\u008F\x16\u00A0\u009B\u00D0r\u00B4\x1A=\u008C6\u00A1\u00E7\u00D0\u00ABh\x0F\u00DA\u008F>C\u00C70\u00C0\u00E8\x18\x073\u00C4l0.\u00C6\u00C3B\u00B18,\t\u0093c\u00CB\u00B1\"\u00AC\f\u00AB\u00C6\x1A\u00B0V\u00AC\x03\u00BB\u0089\u00F5c\u00CF\u00B1w\x04\x12\u0081E\u00C0\t6\x04wB a\x1EAHXLXN\u00D8H\u00A8 \x1C$4\x11\u00DA\t7\t\x03\u0084Q\u00C2'\"\u0093\u00A8K\u00B4&\u00BA\x11\u00F9\u00C4\x18b21\u0087XH,#\u00D6\x12\u008F\x13/\x10{\u0088C\u00C47$\x12\u0089C2'\u00B9\u0090\x02I\u00B1\u00A4T\u00D2\x12\u00D2F\u00D2nR#\u00E9,\u00A9\u009B4H\x1A#\u0093\u00C9\u00DAdk\u00B2\x079\u0094, +\u00C8\u0085\u00E4\u009D\u00E4\u00C3\u00E43\u00E4\x1B\u00E4!\u00F2[\n\u009Db@q\u00A4\u00F8S\u00E2(R\u00CAjJ\x19\u00E5\x10\u00E54\u00E5\x06e\u00982AU\u00A3\u009AR\u00DD\u00A8\u00A1T\x115\u008FZB\u00AD\u00A1\u00B6R\u00AFQ\u0087\u00A8\x134u\u009A9\u00CD\u0083\x16IK\u00A5\u00AD\u00A2\u0095\u00D3\x1Ah\x17h\u00F7i\u00AF\u00E8t\u00BA\x11\u00DD\u0095\x1EN\u0097\u00D0W\u00D2\u00CB\u00E9G\u00E8\u0097\u00E8\x03\u00F4w\f\r\u0086\x15\u0083\u00C7\u0088g(\x19\u009B\x18\x07\x18g\x19w\x18\u00AF\u0098L\u00A6\x19\u00D3\u008B\x19\u00C7T071\u00EB\u0098\u00E7\u0099\x0F\u0099oUX*\u00B6*|\x15\u0091\u00CA\n\u0095J\u0095&\u0095\x1B*/T\u00A9\u00AA\u00A6\u00AA\u00DE\u00AA\x0BU\u00F3U\u00CBT\u008F\u00A9^S}\u00AEFU3S\u00E3\u00A9\t\u00D4\u0096\u00ABU\u00AA\u009DP\u00EBS\x1BSg\u00A9;\u00A8\u0087\u00AAg\u00A8oT?\u00A4~Y\u00FD\u0089\x06Y\u00C3L\u00C3OC\u00A4Q\u00A0\u00B1_\u00E3\u00BC\u00C6 \x0Bc\x19\u00B3x,!k\r\u00AB\u0086u\u00815\u00C4&\u00B1\u00CD\u00D9|v*\u00BB\u0098\u00FD\x1D\u00BB\u008B=\u00AA\u00A9\u00A19C3J3W\u00B3R\u00F3\u0094f?\x07\u00E3\u0098q\u00F8\u009CtN\t\u00E7(\u00A7\u0097\u00F3~\u008A\u00DE\x14\u00EF)\u00E2)\x1B\u00A64L\u00B91e\\k\u00AA\u0096\u0097\u0096X\u00ABH\u00ABQ\u00ABG\u00EB\u00BD6\u00AE\u00ED\u00A7\u009D\u00A6\u00BDE\u00BBY\u00FB\u0081\x0EA\u00C7J'\\'Gg\u008F\u00CE\x05\u009D\u00E7S\u00D9S\u00DD\u00A7\n\u00A7\x16M=:\u00F5\u00AE.\u00AAk\u00A5\x1B\u00A1\u00BBDw\u00BFn\u00A7\u00EE\u0098\u009E\u00BE^\u0080\u009ELo\u00A7\u00DEy\u00BD\u00E7\u00FA\x1C}/\u00FDT\u00FDm\u00FA\u00A7\u00F5G\fX\x06\u00B3\f$\x06\u00DB\f\u00CE\x18<\u00C55qo<\x1D/\u00C7\u00DB\u00F1QC]\u00C3@C\u00A5a\u0095a\u0097\u00E1\u0084\u0091\u00B9\u00D1<\u00A3\u00D5F\u008DF\x0F\u008Ci\u00C6\\\u00E3$\u00E3m\u00C6m\u00C6\u00A3&\x06&!&KM\u00EAM\u00EE\u009ARM\u00B9\u00A6)\u00A6;L;L\u00C7\u00CD\u00CC\u00CD\u00A2\u00CD\u00D6\u00995\u009B=1\u00D72\u00E7\u009B\u00E7\u009B\u00D7\u009B\u00DF\u00B7`ZxZ,\u00B6\u00A8\u00B6\u00B8eI\u00B2\u00E4Z\u00A6Y\u00EE\u00B6\u00BCn\u0085Z9Y\u00A5XUZ]\u00B3F\u00AD\u009D\u00AD%\u00D6\u00BB\u00AD\u00BB\u00A7\x11\u00A7\u00B9N\u0093N\u00AB\u009E\u00D6g\u00C3\u00B0\u00F1\u00B6\u00C9\u00B6\u00A9\u00B7\x19\u00B0\u00E5\u00D8\x06\u00DB\u00AE\u00B6m\u00B6}agb\x17g\u00B7\u00C5\u00AE\u00C3\u00EE\u0093\u00BD\u0093}\u00BA}\u008D\u00FD=\x07\r\u0087\u00D9\x0E\u00AB\x1DZ\x1D~s\u00B4r\x14:V:\u00DE\u009A\u00CE\u009C\u00EE?}\u00C5\u00F4\u0096\u00E9/gX\u00CF\x10\u00CF\u00D83\u00E3\u00B6\x13\u00CB)\u00C4i\u009DS\u009B\u00D3Gg\x17g\u00B9s\u0083\u00F3\u0088\u008B\u0089K\u0082\u00CB.\u0097>.\u009B\x1B\u00C6\u00DD\u00C8\u00BD\u00E4Jt\u00F5q]\u00E1z\u00D2\u00F5\u009D\u009B\u00B3\u009B\u00C2\u00ED\u00A8\u00DB\u00AF\u00EE6\u00EEi\u00EE\u0087\u00DC\u009F\u00CC4\u009F)\u009EY3s\u00D0\u00C3\u00C8C\u00E0Q\u00E5\u00D1?\x0B\u009F\u00950k\u00DF\u00AC~OCO\u0081g\u00B5\u00E7#/c/\u0091W\u00AD\u00D7\u00B0\u00B7\u00A5w\u00AA\u00F7a\u00EF\x17>\u00F6>r\u009F\u00E3>\u00E3<7\u00DE2\u00DEY_\u00CC7\u00C0\u00B7\u00C8\u00B7\u00CBO\u00C3o\u009E_\u0085\u00DFC\x7F#\u00FFd\u00FFz\u00FF\u00D1\x00\u00A7\u0080%\x01g\x03\u0089\u0081A\u0081[\x02\u00FB\u00F8z|!\u00BF\u008E?:\u00DBe\u00F6\u00B2\u00D9\u00EDA\u008C\u00A0\u00B9A\x15A\u008F\u0082\u00AD\u0082\u00E5\u00C1\u00AD!h\u00C8\u00EC\u0090\u00AD!\u00F7\u00E7\u0098\u00CE\u0091\u00CEi\x0E\u0085P~\u00E8\u00D6\u00D0\x07a\u00E6a\u008B\u00C3~\f'\u0085\u0087\u0085W\u0086?\u008Ep\u0088X\x1A\u00D11\u00975w\u00D1\u00DCCs\u00DFD\u00FAD\u0096D\u00DE\u009Bg1O9\u00AF-J5*>\u00AA.j<\u00DA7\u00BA4\u00BA?\u00C6.fY\u00CC\u00D5X\u009DXIlK\x1C9.*\u00AE6nl\u00BE\u00DF\u00FC\u00ED\u00F3\u0087\u00E2\u009D\u00E2\x0B\u00E3{\x17\u0098/\u00C8]py\u00A1\u00CE\u00C2\u00F4\u0085\u00A7\x16\u00A9.\x12,:\u0096@L\u0088N8\u0094\u00F0A\x10*\u00A8\x16\u008C%\u00F2\x13w%\u008E\ny\u00C2\x1D\u00C2g\"/\u00D16\u00D1\u0088\u00D8C\\*\x1EN\u00F2H*Mz\u0092\u00EC\u0091\u00BC5y$\u00C53\u00A5,\u00E5\u00B9\u0084'\u00A9\u0090\u00BCL\rL\u00DD\u009B:\u009E\x16\u009Av m2=:\u00BD1\u0083\u0092\u0091\u0090qB\u00AA!M\u0093\u00B6g\u00EAg\u00E6fv\u00CB\u00ACe\u0085\u00B2\u00FE\u00C5n\u008B\u00B7/\x1E\u0095\x07\u00C9k\u00B3\u0090\u00AC\x05Y-\n\u00B6B\u00A6\u00E8TZ(\u00D7*\x07\u00B2geWf\u00BF\u00CD\u0089\u00CA9\u0096\u00AB\u009E+\u00CD\u00ED\u00CC\u00B3\u00CA\u00DB\u00907\u009C\u00EF\u009F\u00FF\u00ED\x12\u00C2\x12\u00E1\u0092\u00B6\u00A5\u0086KW-\x1DX\u00E6\u00BD\u00ACj9\u00B2<qy\u00DB\n\u00E3\x15\x05+\u0086V\x06\u00AC<\u00B8\u008A\u00B6*m\u00D5O\u00AB\u00EDW\u0097\u00AE~\u00BD&zMk\u0081^\u00C1\u00CA\u0082\u00C1\u00B5\x01k\u00EB\x0BU\n\u00E5\u0085}\u00EB\u00DC\u00D7\u00ED]OX/Y\u00DF\u00B5a\u00FA\u0086\u009D\x1B>\x15\u0089\u008A\u00AE\x14\u00DB\x17\u0097\x15\x7F\u00D8(\u00DCx\u00E5\x1B\u0087o\u00CA\u00BF\u0099\u00DC\u0094\u00B4\u00A9\u00AB\u00C4\u00B9d\u00CFf\u00D2f\u00E9\u00E6\u00DE-\u009E[\x0E\u0096\u00AA\u0097\u00E6\u0097\x0En\r\u00D9\u00DA\u00B4\r\u00DFV\u00B4\u00ED\u00F5\u00F6E\u00DB/\u0097\u00CD(\u00DB\u00BB\u0083\u00B6C\u00B9\u00A3\u00BF<\u00B8\u00BCe\u00A7\u00C9\u00CE\u00CD;?T\u00A4T\u00F4T\u00FAT6\u00EE\u00D2\u00DD\u00B5a\u00D7\u00F8n\u00D1\u00EE\x1B{\u00BC\u00F64\u00EC\u00D5\u00DB[\u00BC\u00F7\u00FD>\u00C9\u00BE\u00DBU\x01UM\u00D5f\u00D5e\u00FBI\u00FB\u00B3\u00F7?\u00AE\u0089\u00AA\u00E9\u00F8\u0096\u00FBm]\u00ADNmq\u00ED\u00C7\x03\u00D2\x03\u00FD\x07#\x0E\u00B6\u00D7\u00B9\u00D4\u00D5\x1D\u00D2=TR\u008F\u00D6+\u00EBG\x0E\u00C7\x1F\u00BE\u00FE\u009D\u00EFw-\r6\rU\u008D\u009C\u00C6\u00E2#pDy\u00E4\u00E9\u00F7\t\u00DF\u00F7\x1E\r:\u00DAv\u008C{\u00AC\u00E1\x07\u00D3\x1Fv\x1Dg\x1D/jB\u009A\u00F2\u009AF\u009BS\u009A\u00FB[b[\u00BAO\u00CC>\u00D1\u00D6\u00EA\u00DEz\u00FCG\u00DB\x1F\x0F\u009C4<YyJ\u00F3T\u00C9i\u00DA\u00E9\u0082\u00D3\u0093g\u00F2\u00CF\u008C\u009D\u0095\u009D}~.\u00F9\u00DC`\u00DB\u00A2\u00B6{\u00E7c\u00CE\u00DFj\x0Fo\u00EF\u00BA\x10t\u00E1\u00D2E\u00FF\u008B\u00E7;\u00BC;\u00CE\\\u00F2\u00B8t\u00F2\u00B2\u00DB\u00E5\x13W\u00B8W\u009A\u00AF:_m\u00EAt\u00EA<\u00FE\u0093\u00D3O\u00C7\u00BB\u009C\u00BB\u009A\u00AE\u00B9\\k\u00B9\u00EEz\u00BD\u00B5{f\u00F7\u00E9\x1B\u009E7\u00CE\u00DD\u00F4\u00BDy\u00F1\x16\u00FF\u00D6\u00D5\u009E9=\u00DD\u00BD\u00F3zo\u00F7\u00C5\u00F7\u00F5\u00DF\x16\u00DD~r'\u00FD\u00CE\u00CB\u00BB\u00D9w'\u00EE\u00AD\u00BCO\u00BC_\u00F4@\u00EDA\u00D9C\u00DD\u0087\u00D5?[\u00FE\u00DC\u00D8\u00EF\u00DC\x7Fj\u00C0w\u00A0\u00F3\u00D1\u00DCG\u00F7\x06\u0085\u0083\u00CF\u00FE\u0091\u00F5\u008F\x0FC\x05\u008F\u0099\u008F\u00CB\u0086\r\u0086\u00EB\u009E8>99\u00E2?r\u00FD\u00E9\u00FC\u00A7C\u00CFd\u00CF&\u009E\x17\u00FE\u00A2\u00FE\u00CB\u00AE\x17\x16/~\u00F8\u00D5\u00EB\u00D7\u00CE\u00D1\u0098\u00D1\u00A1\u0097\u00F2\u0097\u0093\u00BFm|\u00A5\u00FD\u00EA\u00C0\u00EB\x19\u00AF\u00DB\u00C6\u00C2\u00C6\x1E\u00BE\u00C9x31^\u00F4V\u00FB\u00ED\u00C1w\u00DCw\x1D\u00EF\u00A3\u00DF\x0FO\u00E4| \x7F(\u00FFh\u00F9\u00B1\u00F5S\u00D0\u00A7\u00FB\u0093\x19\u0093\u0093\u00FF\x04\x03\u0098\u00F3\u00FCc3-\u00DB\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F9\u00FF\x00\x00\u0080\u00E9\x00\x00u0\x00\x00\u00EA`\x00\x00:\u0098\x00\x00\x17o\u0092_\u00C5F\x00\x00\x02\u0087IDATx\u00DA\u0094\u0092\u00CFO\x13A\x14\u00C7\u00DF\u00CE\u00FE(Mw\u00BBK\x17vYcp\u00B1\u00D5\u0080\x07k(\u00A5\u0081\u00C6\u0090H\x1A95%&\u00BD\x10\u00943I/\u009C\u008C\t\u00FF\bG\x13\u0095\x03\u0089\u0089\\\u0094\u0094\x1A1U \x04\u00F1\u0082\u009At\r\u00A0mlS\t\u0089%\u00DB\u00EE\u00CCn=l)\u0082\u009A\u00E8;\u00BD\u0099\u00F9~\u00F2}\u00DF\u00C9\u00A3\u00AA\u00E5\u008F\u00F0?\u00C5\u00FC~\u00F5r\u00ED]\u00BB\x1F\u008E\x0E\u00FB\u00BC\u00F8\u00CF@\u00BD\u00DE0>\x7Fy\u00B5\u00B6\u00FE\u00FCE\u00F6\u00E0\u00E0\u00AB\u00E38\u0081N)\x1E\u008F\u008D\u008F\u00DF\x1C\u008A\\\u00F7\x0B\u00BC+\u00A3\u00DC\u0091\u008A\u00A5\u00F2\u00DB\u00F5\x1D\u00CE#\u00E4\u00F3y\u00CB\u00B2fff8\u008E[XX\u00A8V\u00AB\u00BA\u00AE[\u008D\x1F\u00F7\u00EE\u00A6\u00AF\r\\\x05\x00\u00E4r\u00AB\u00B97\u00DA\x05=\u0099L\u0086\u00C3\u00E1\u00E9\u00E9\u00E9p8\x1C\n\u0085\u00C6\u00C6\u00C6\b!SSS\u00DD\u00CA\u00C5\u00C7O\u009E\x12b7\u009B\u00CD\x16\u00B0\u00F3\u00FEC\x7F\x7F\u00BF,\u00CB\u0099L&\u0091H\u00C8\u00B2\u00DC\u00D3\u00D3\u00A3iZ\"\u0091\u00C0\x18\u0087B\u00A1\u00D5\u00DCk\u00D34\x1D\u00C7ie\u00F0\x0B\u009El6+\u008A\u00A2\u00AA\u00AA\x00P.\u0097\x01 \x12\u0089 \u0084J\u00A5\u00D2\u00D6\u00D6Vt\u00E8F\u00ADv\u00EC\u00F1p- \u0095\u00BC\u00FD\u00F0\u00D1\u00B3J\u00A5\u00A2iZWW\u0097\u00D7\u00EB%\u0084\x1C\x1E\x1E\x16\u008B\u00C5\u00CD\u00CD\u00CD\u00DD\u00DD\u00DD\x07\u00F73\u0098\x10\u00DB>q\x18\x18\u00B8b\x18\x06\u00C6xee\u00E5\u00E8\u00E8\b!\u00D4l6m\u00DB\x16E\u00B1\u00B7\u00B7\u00B7P(\x04\u0083:C\u00D34\u008DZ\x00\u00C30\u00F9|~nnncc#\x16\u008B\x01\u00C0\u00F6\u00F6\u00F6\u00E0\u00E0`.\u0097K\u00A7\u00D3KKK,\u00CBtx;h\u009An\u0085F\b\x01\u0080\u00AE\u00EB\x00099\u0099J\u00A5\x00 \x1E\u008F\x03\x00!\x04\x00\x10\u0085X\u0086A\u00E8\u00C4\u0081\u00A2(\u00B7\u0091$\u0089\u00A2(\u00F7\u00E8\u00F3\u00F9\x04A\u00B0,\u00CB\x15\u00B8\u0085\u00CE\u00ED\u0085\u00A2(n#\b\x02\x00\x04\x02\u0081F\u00A3\u00F1\u00D7]r\x1CGUU\u00D341\u00C6\u0092$\u00ED\u00ED\u00ED)\u008Ab\u00DB\u00F6\u00AF\u009AS\u0087\u0091\u0091\u0091\u00FD\u00FD}UU\u00EB\u00F5\u00BAi\u009A\u00AE\u00B4\u00AF\u00AF\u00AFR\u00A9D\u00A3\u00D1\u00B6\u008Cj\u00AF\u00F7\u00A7\u00C2\u00F7\u00F9\u00F9\u00F9\u0089\u0089\u0089`0\u00D8~6\fcyyyvv\u00F6\u00F2\u00A5NU\u00ED\u00E6y\u00DF)P\u00AB\x1D\x17\u00BF\u00D5\x17\x17\x171\u00C6\x00`\u00DB6!\u0084\u00E7\u00F9\u00D1\u00D1QE\u00E6x\u00DE\u00E7\x02\u00A7\x19\x18\u0086\u00F6z\u00EAwR\u00B7l\u00DB9\u00F7\x134\u008DX\u008Ee\x18\u00FALh\u0096eE\u00BF\x00\x00\u00D8\u00C2\u00E7\x00\u0096cE\u00BF\u00C0\u00B2\u00EC\u0099\f\u00FFX?\x07\x00\u0091\u00AA\u00FEE\u0098\u00C1\u00C4\u0084\x00\x00\x00\x00IEND\u00AEB`\u0082";
		o.save = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x12\b\x06\x00\x00\x00_%.-\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x00\x04gAMA\x00\x00\u00D8\u00EB\u00F5\x1C\x14\u00AA\x00\x00\x00 cHRM\x00\x00z%\x00\x00\u0080\u0083\x00\x00\u00F4%\x00\x00\u0084\u00D1\x00\x00m_\x00\x00\u00E8l\x00\x00<\u008B\x00\x00\x1BX\u0083\u00E7\x07x\x00\x00\x02\u00F2IDATx\u00DAb\u00FC\u00FF\u00FF?\x03-\x00@\x00\u00B1 sd\u00E5\u00CC\u0099\\\x03\u00A6\u00FEe`\x02r@\u0098\x19\u008A\x19\u00910\u00CC\x1D\u00FF!\u00FC\u00DD+\u00F3\u00B8\x18\u0098\u0098\u00FE00\u00FC\u00FE\u00FB\u00FF\u00CB\u00A3\x7F0\u00B3\x00\x02\b\u00C5`\x06&V\u00901\f\u00DD\u00F5z\f_\u00BF\u00FFaX\u00BAp\"CAA\x01\u00C3\u00BF\x7F\u00FF\u00C0\u0098\u008F\u008F\x0F\u00AC\u00EC\u00D5\u00ABW\fbbb\fiMg\x18\u00BE\u00FE\u00FC\u00F9\u008D\u009B\u008BC\u0084\u0081\u0089\u00FD+#\u00AF\u00DC\u00AF\u00FF\u009F!\u0086\x03\x04\x10\x13\u008A\u00C1\u00FF\u00FF\u00B1\u0080\\\u00F1\u00FD\u00C7_\u0086o@|\u00EC\u00F81\u00B8\u00A1\x7F\u00FF\u00C2\x1D\x03\u00E6\u0083\u00C0\u00C7\u00DF\u00BF\x19LB\u00FB\x19\u00BE\u00FE\u00F8\u00F1\u0086\u0081\u00F1??\x03\x0B;\x1B#\u009F\x1C\u00D8L\u0080\x00Bu1#3\u0098\u00FF\u00E5\u00DB\x1F\u00B0\u008B\u009F>y\n1\u00F4\u00DF_\u00B8a \u00F0\u00F7\u00EF_0\u00FD\u00E1\u00C7o\u0086\x1F\x7F\u00BE\u00C2\u0082I\u0094\u00E1\u00FF\u00DF?\f\u00CC\u00AC \u00C9\x7F\x00\x01\u00C4\u0082\u00E6bF\u00B0\u00C1_\u00FF0|\u00FA\u00F6\u009B\u00E1\u00DD\u00BBw\f\u00FF\u00FE\u00FE\u0085\u00BA\u00F8/\u00C3\u008B\x17/\u00C0\u00F4?\u00A8\u00EB\u00BF\u00FD\u00FA\u00CA\u00F0\u00FB\u00D7G\u00A8\u00C1L\"@\x03\u00BE0\u00FC\u00FB\u00FD\x1D\u00C8\u00FB\x03\x10@,\x18\u00D1\tT\u00F4\u00E9\u00CBo\u0086/@\x17\u00DBF\u00ADb\x10\x10\x14\u00C4\x1A\u00EB\x06\x11\x13\x18~\u00FF\u00F8\u00C0\u00F0\u00FB'\u00D4`\u0086\u00FF<@\u0082\x03\u00C8a\x05\u00D2\u00DF\x01\x02\u0088\x05\u009B&\u0090\u008B?\x02]l\u00A1/\u00CC\u00A0\u00B5\u00E0:\u00C3\u00C7\u00EF\u00BF\x19\u00DE\x7F\u00FD\u00C5\u00F0\x11\u00E8\u00F5\x0F_\x7F3|\u00FB\u00FE\x15b\u00E8\u008F\u008F\f\u00BF\u00BF\x7F\u0084:\u0088\u0091\x05\u0098RX\u00FE\u00FF\u00FF\x0B\ncF\u0080\x00\u00C2\u00EA\u00E2\u00CF\u00C00\u00DE\u00B0\u00EF\x19\u00C3\u00BAIVx\u00D3\u00AA\u009A{!\x033;\x17rX2\u00C2X\x00\x01\u00C4\u0082n(\b\x7F\u00F8\u00FC\x1Bl(<L\u00A1a\f\n\u00EF\u00BF\u00B0\u00C8\x04\u0086\u00B3\u0096\u0096\x16\u0083\u00AA[\x1E\u00D4L\u00A8\u00A1\u0090xb\x04\b L\x17\x03=\u00F2\x11\u00E8]X\u00EC\u00C3\f\u0085\u00B1A\x06\u00C2\u0092 \b\u00FC\u00FE\u00FE\t\u00C9\u00C1\b\x17\x03\x04\x10\u00D6\u00A0\u00F8\u00F8\u00E57<\u00BD\u00A2\x18\u00FA\x0F\u00E2bd\u0083\u00FF\u00FE\u00FA\u00865\u0098\x00\x02\u0088\t\u009B\u00C8\u00FB/\u00BF\u00E0.F\x18\n\u00C9$\u00FF\u00D0\f\u00FE\u00F3\u00F3+V\u0083\x01\x02\u0088\t#\u008C\u0081\"\u009F\u00BE\u00A3\x06\x05<\u008C\u0091\f\u0085\x15^\x7F\x7Fbw1@\x00aF\x1EPd\u00D7\u00FCl\x06AY#\x06\x13\u00C7PD\u00E1\u0083\x05\b*\x18!\u0092\x1B\x1A\x00\b F\u00E4bSV\u00C5\u0096\x17\u00E8bI`i\u00A5\u00C8\u00C0\u00C4(\n4\u0090\x0B\u0097\u00A1\u00A8\u00E0\u00FF\x0F\u00A0\x17\u00DE0\u00FC\u00FBs\u00FF\u00FF\u00BF\u00DF/\x18>=\u00F9\x04\x10@h\u0091\x07\u00CC\u00EB\u008C\u00CC@\u00BF\u00FD\u00FF\x00\u00C4\u00A0`\u00FA\u00CA@Tq\u00FD\u00FF\x170\u0099}\x00\u0096\x15?\x18\u00FE\u00FE\u00FE\x03\x12\x01\b \u00B4b\x13X\u00AE\u00FE\u00FF\u00FD\x19h\u00F8s\u00A0\x0B>1\u00FCc`\x03\u0096Z\u0084\u00DD\u00FC\u00FF?0R\u00FE\x7F\u00FF\u00FF\u00F7\u00D7gpA\x04\u00E4\x00\x04\x18\x00\u00CD&\u00AA2\fs\x1B\x05\x00\x00\x00\x00IEND\u00AEB`\u0082";
	} else {
		o.bin = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x11\x00\x00\x00\x13\b\x02\x00\x00\x00\u00F9\u00C7q\u00A6\x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\x00\u00CAIDAT(\u00CF\u00C5\u0093=\n\u00830\x18\u0086=\u008A\u008Bc\u0086\u0080H\u00A0\u00A2 \u008A\u0082\u00BD\u0082\u0092\x0B\u00E40^\u00C0-c\u00FC9\u0089[Gi\u00A1\x07\u00E9\u008B`\u0087\u00F2}m\u00A5C\u00DF\u00E1!\u00BC\u00C9C\u00F0\u0093x\u0097\u00E3\u00F1\u00FE\u00E7\x18cN{\u00B0\u00FE\u00CAI\u0092d\u00D9\u0093\u00E7\u00F9;\u00A7\u00EB:\u00AD\u00B5R\u00AAi\u009A8\u008E\u00D5\u0096\u00B6mA\u00F4\u00D8%\u009C(\u008ApCQ\x14eY\u00D6u}\u00DE\u00825\x1A\u00F4\u00D8%\u009C\u00EB\u00A7\u00D0\u00DF#\u00A5\u00B4\u00D6\u0092dg\u0090e\u00D9<\u00CF$Y'M\u00D3i\u009AH\u00B2\x0E~\bN\u0090d\x1D\u008Cu\x1CG\u0092\u00AC\x13\u0086\u00E10\f$Y\u00A7\u00AA*\u00E7\x1C\u00A6\u00F4B\u00F4\u00AC\u00D3\u00F7}\x10\x04B\b\u00DF\u00F7\u009FD\u0083\u009Eu\u00D6u\u00BDSA\u00FF\u00F3[\u00B8\x1D\u00CF\x03@,\u00A2\u00EFT\u009B`F\x00\x00\x00\x00IEND\u00AEB`\u0082";
		o.save = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x16\x00\x00\x00\x13\b\x02\x00\x00\x00\x1B\x1Bj\u00DF\x00\x00\x00\tpHYs\x00\x00\x12t\x00\x00\x12t\x01\u00DEf\x1Fx\x00\x00\x00\u00D9IDAT8\u00CB\u00C5\u0094A\n\u0082@\x14\u0086=N\x0B\u00C1\x16\u00A1\u009Bd\f\u00B1E\x0B\u00EF\u00E3\r\u00BC\u0082\u00D7h\x11\u00B4\x190\u0098\u008D\x07hp%#\u00B3\u00F1\x16\u00FD\x14\x13\u0099\x0Fze\u00D1\u00B7z\u00FC\u00F3\u00CF\u00C7\u00F0\x04\u00BD\u00F3<\u008C1\u00DE\u00CF\x15+\u00C7\u00E7\u008A\u009D\u00E3\x1F\u008A\u00A5c\u00EB\u00B8',\u0085\u00D6\u00BA\u00EF\u00FB4M7c\u0090 \u00E7\u00BE\u00A2m[km\x1C\u00C7k\x07f\u00DC\u0087\u00FD\u008D]\u00DC,\u00E1\u0095(\u008A0#y\u00B1\u008B<\u00CF\x17cp\u00B9,\u00CB \b\u008A\u00A2\u00C0\u00FCx\u00842\u00A1\u00F0}\u00FF4A)\u0085\u00A3\u00A6i\u009Er\u0094\tE\u0092$RJ\u00EC\\\u008E\u00A9\u00EBZN@\u0099P\b!\u008ElP&\x14X\u00FB\u0081\r\u00CA\u0084\x02_~\u00CF&\u00CB2BQU\x15\u009E\x172@\reB\u00D1u\u009De\u0083\u00F2W\u00FF\x17f\x1E\u00C30\\\x00T\u00DC\u0082\u00F9\u00ABm\u00B0\u0087\x00\x00\x00\x00IEND\u00AEB`\u0082";
	}
	return o;
}



////------------------------branch
function writeDimensionsVisiblePageWH(current_doc) {


	var fileName = current_doc.name;
	var myPage = app.documents[0].pages.item(0);
	var b_pgebounds = myPage.bounds;

	var w_t = Number(Math.round((b_pgebounds[3] - b_pgebounds[1]) + 'e2') + 'e-2');
	var h_t = Number(Math.round((b_pgebounds[2] - b_pgebounds[0]) + 'e2') + 'e-2');
	// alert("w_t "+w_t+"\n"+"h_t "+h_t+"\n"+"idNumar "+idNumar+"\n"+"vizibil_W_mm "+vizibil_W_mm+"\n"+"vizibil_H_mm "+vizibil_H_mm+
	// "\n"+"total_W_mm "+total_W_mm+"\n"+"total_H_mm "+total_H_mm)
	var m_left = myPage.marginPreferences.left; //mmyX2
	var m_right = myPage.marginPreferences.right; //mmyX1
	var m_top = myPage.marginPreferences.top; //mmyy2
	var m_bottom = myPage.marginPreferences.bottom; //mmyy1
	var w = Number(Math.round((w_t - (m_left + m_right)) + 'e2') + 'e-2'); // w vizibil
	var h = Number(Math.round((h_t - (m_top + m_bottom)) + 'e2') + 'e-2'); // h vizibil




	// return 
	dimensionsVisibilTotal.push([fileName, w, h, w_t, h_t]); //filesListTiffs[i]

}

function writeDimensions(dimensionsVisibilTotal, params) {
	for (var a = 0; a < dimensionsVisibilTotal.length; a++) {
		// alert(psdMasterListPathRatia[a][1]) 

		var message = dimensionsVisibilTotal[a]
		var filename = "_indesign_raport_dimensiuni_Vizibil_Total_" + dateString_ziua + "_" + ".txt"; // merge!

		var file = new File(params.input_folder + "/" + filename);

		// alert("file: " + filename + " filename: " + filename )

		file.encoding = 'UTF-8';

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		}
		else {
			file.open("w");
		}

		file.write(message + "\r");
		file.close();
	}
}


function checkDimensionAgainst_master(txtfile, txtfile_master, outputFiles) {
	// alert("checkagainst " + txtfile + " " + txtfile_master)

	var arrMaster = [];
	arrMaster = readFileTxt(txtfile_master)
	var arrtxtfile = [];
	arrtxtfile = readFileTxt(txtfile)


	compareArrays(arrMaster, arrtxtfile, outputFiles);
	// alert(arr1[1][2])


};



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
		var denumireFinalaMaster = String(str.replace(/\'/g, "_") + "_." + outputFiles); //"indd" "tif" //_.tif



		// var str1 = str.replace(/[\.\,\:\;`\!\?\>\<\\[\\\|\]\{\}\*\^\$\&\"\']/g, "_"); // some errors


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
					infoRaport.push(["OK", "master:" + denumireFinalaMaster, "master:" + num1, outputFiles + ":" + num5, "master:" + num2, outputFiles + ":" + num6, "master:" + num3, outputFiles + ":" + num7, "master:" + num4, outputFiles + ":" + num8]);
				} else {
					infoRaport.push(["BAD Dimensions", "master:" + denumireFinalaMaster, "master:" + num1, outputFiles + ":" + num5, "master:" + num2, outputFiles + ":" + num6, "master:" + num3, outputFiles + ":" + num7, "master:" + num4, outputFiles + ":" + num8]);
					// alert("NO match found for" + denumireFinalaMaster);
				}
			} else { // photoshop:
				// psdMasterListPathRatia.push([fileName, "w from name:" + WfromName, "h from name:" + HfromName, rounded_docWidth, rounded_docHeight, OK]); 
				if (num3 === num7 && num4 === num8) {
					// alert("Yes match found for " + denumireFinalaMaster);
					infoRaport.push(["OK", "master:" + denumireFinalaMaster, "master:" + num3, outputFiles + ":" + num7, "master:" + num4, outputFiles + ":" + num8]);
				} else {
					infoRaport.push(["OK", "master:" + denumireFinalaMaster, "master:" + num3, outputFiles + ":" + num7, "master:" + num4, outputFiles + ":" + num8]);
					// alert("NO match found for" + denumireFinalaMaster);
				}

			}
		} else {
			infoRaport.push(["No match found for", "master:" + denumireFinalaMaster, "master:" + num1, "master:" + num2, "master:" + num3, "master:" + num4]);

			// // alert("No match found for " + denumireFinalaMaster);
		}
	}
}

function writeReport(dimensionsVisibilTotal, params, outputFiles) {
	for (var a = 0; a < dimensionsVisibilTotal.length; a++) {
		// alert(psdMasterListPathRatia[a][1]) 

		var message = dimensionsVisibilTotal[a]
		var filename = "_raport_Master--" + outputFiles + "--dimensiuni_Visibil_Total_" + dateZiOraMin + "_" + ".txt"; // merge!

		var file = new File(params.input_folder + "/" + filename);

		// alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

		file.encoding = 'UTF-8';

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		}
		else {
			file.open("w");
		}

		// file.open('w');
		file.write(message + "\r");
		file.close();
	}
	alert("report done!")
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
	var file = File(filetxt)
	if (file) {
		// Read the contents of the file
		file.open("r");
		var fileContents = file.read();
		file.close();

		// Parse tab-delimited data into a multidimensional array
		if (String(filetxt).indexOf("_master") !== -1) {
			var splitsign = "\t";
		}
		else {
			var splitsign = ",";
		}

		var dataArray = parseTabDelimited(fileContents, splitsign);

	} else {
		alert("No file selected.");
	}

	return dataArray;
}

function parseTabDelimited(data, splitsign) {
	var lines = data.split('\n');
	var dataArray = [];

	for (var i = 0; i < lines.length; i++) {
		// alert(lines[i])
		// var line = String(lines[i]);
		var line = lines[i];
		// var line = trim(line0);

		// alert("dupa trim:" + line)

		if (line === '') {
			continue; // Skip empty lines
		}

		var values0 = line.split(splitsign);

		var dataArrayTrimed = [];
		for (var k = 0; k < values0.length; k++) {

			// alert("i " + i + "\nzero " + dataArray[k][0] + "\nwv " + dataArray[k][1] + "\nhv " + dataArray[k][2] + "\nw " + dataArray[k][3] + "\nt " + dataArray[k][4]) // ok
			vartrimedvalue = trim(values0[k]);
			// alert("vartrimedvalue:" + vartrimedvalue + "---")
			dataArrayTrimed.push(vartrimedvalue);
		}




		dataArray.push(dataArrayTrimed);
	}

	return dataArray;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}
function resizingCheckFolder(InputPath) {

	//alert(InputPath)
	InputPath = InputPath.replace(/([^\/])$/, '$1/');
	//alert(InputPath)

	if (Folder(InputPath).exists == false && !app.documents.length > 0) {
		alert("Chose input folder or Please open any master file!")
		try {
			var win = Window.find('dialog', nameOfWindow);//.close("0");

		} catch (_) {
			//$.bp();
		};
		// exit();

	} else {
		// 
	}


}

function resizingCheckMasters() { // old test

	// var nameOfMaster...

	var data = ["unu", "doi", "trei", "patru", "cinci", "sase", "sapte", "opt", "noua", "zece", "unspe", "doispe", "treispe", "paispe", "cincispe"];
	var anim = ["─", "\\", "|", "/"];
	var counteranimlength = anim.length;
	var counteranim = 0;
	var pbWidth = data.length;
	var progressBar = new ProgressBar("Checking masters ", pbWidth);
	progressBar.reset(data.length);
	for (var i = 0; i < data.length; i++) {
		// progressBar.update(line + 1, decodeURI(targetFile.name));
		progressBar.update(i + 1, anim[counteranim] + "   " + data[i]);

		// counteranim = (counteranim + 1) % data.length;
		counteranim = counteranim + 1;
		// alert(counteranim)
		if (counteranim >= counteranimlength) {
			counteranim = 0;
		}

		$.sleep(1000);
	}
	progressBar.close();


}


function resizingCheckExcelAndMasters(workingPath, hw10Check, hw15Check, hw20Check, dtiCheck) {




	var errors = [], errorline


	// var data = ["Check number of xlsx files", "Get data from xlsx file ", "trei", "patru", "cinci", "sase", "sapte", "opt", "noua", "zece", "unspe", "doispe", "treispe", "paispe", "cincispe"];
	var anim = ["─", "\\", "|", "/"];
	var counteranimlength = anim.length;
	var counteranim = 0;
	var pbWidth = 8//data.length;
	var progressBar = new ProgressBar("Working ", pbWidth);
	progressBar.reset(8);//(data.length);

	//*** excel

	//progress bar update--------------
	var info_bar = "Check number of xlsx files";
	var m = 0
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1250);
	//progress bar update--------------


	// 1  check number of xlsx files
	var mask_array = [".xlsx"]
	var excelFilePathArr = find_files_Simple(workingPath, mask_array);

	if (excelFilePathArr.length === 1) {
		var excelFilePath = decodeURI(String(excelFilePathArr[0]).replace(/^\/(.)/, "$1:").replace(/\//g, "\\\\"));
		// alert("excel file path " + excelFilePath);
	} else {
		alert("Please keep one excel file in same folder like master files!\nOr close the opened excel file!")
		progressBar.close();
		exit();
	}


	//progress bar update--------------
	info_bar = "Get data from xlsx file";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1000);
	//progress bar update--------------

	// 2 get data from xlsx file
	var LiniaExcel = 1
	// [Optional] the character to use for splitting the columns in the spreadsheed: e.g. semicolon (;) or tab (\t)
	// If it isn't set, semicolon will be used by default
	var splitChar = ";";
	// [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
	var sheetNumber = "1";
	var dataList = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
	// alert(dataList[LiniaExcel][0] + "\n" + dataList[LiniaExcel][1] + "\n" + dataList[LiniaExcel][2] + "\n" + dataList[LiniaExcel][3] +
	//     "\n" + dataList[LiniaExcel][4] + "\n" + dataList[LiniaExcel][5] + "\n" + dataList[LiniaExcel][6] + "\n" + dataList[LiniaExcel][7])
	// exit();



	//progress bar update--------------
	info_bar = "Check number of files to be created";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1000);
	//progress bar update--------------

	// 3 check number of files to be created

	var numberOfFiles = dataList.length - 1;
	// alert(numberOfFiles)
	// if (!confirm("Plese confirm number of files to be created!\rNumber of files: " + numberOfFiles + "\r(If number of files are bigger than expected, copy and paste your data in a new sheet in excel)")) exit();
	// alert("go")
	// exit();



	//progress bar update--------------
	info_bar = "Check content of data";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1000);
	//progress bar update--------------

	// 4 check content of data
	for (var i = 1; i < dataList.length; i++) {

		errorline = "Line " + i + ": ";

		// var dataXlsxColumn0 = dataList[i][0] // 
		// var dataXlsxColumn1 = dataList[i][1] // character
		var dataXlsxColumn2 = dataList[i][2] // number
		var dataXlsxColumn3 = dataList[i][3] // number
		var dataXlsxColumn4 = dataList[i][4] // number
		var dataXlsxColumn5 = dataList[i][5] // number
		var dataXlsxColumn6 = dataList[i][6] // measurement units
		// var dataXlsxColumn7 = dataList[i][7] // character
		// var dataXlsxColumn8 = dataList[i][8] // character
		// var dataXlsxColumn9 = dataList[i][9] // character

		if (Number(dataXlsxColumn2)) { errors.push(errorline + "Visible width (col. 3) is not a number!") }
		if (Number(dataXlsxColumn3)) { errors.push(errorline + "Visible height (col. 4) is not a number!") }
		if (Number(dataXlsxColumn4)) { errors.push(errorline + "Total width (col. 5) is not a number!") }
		if (Number(dataXlsxColumn5)) { errors.push(errorline + "Total height (col. 6) is not a number!") }
		dataXlsxColumn6 = dataXlsxColumn6.replace(/ /g, "") //replace(" ","") 
		if ((dataXlsxColumn6) == "cm" || (dataXlsxColumn6) == "mm" || (dataXlsxColumn6) == "px") { errors.push(errorline + "Not a measurement unit (col. 7) is mm, cm or px!") }

	}


	//progress bar update--------------
	info_bar = "Check master files";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1000);
	//progress bar update--------------

	// 5 check masters
	//*** masters 

	var arrMasterName1 = new Array;

	for (var i = 1; i < dataList.length; i++) {
		var masterName = dataList[i][7];
		arrMasterName1.push(masterName)

	}

	//*** 

	var arrMasterName = removeDuplicates(arrMasterName1);

	// check masters in folder against master in excel!! // or check in fodler for masters files
	var mastersInFolder = find_files_Simple(workingPath, [".indd"])
	// test:
	// for (var l = 1; l < mastersInFolder.length; l++) {
	// 	alert("master in folder " + mastersInFolder[l])
	// }

	arrMasterName.sort();
	mastersInFolder.sort();

	var arrayMastersEqual = arraysAreEqual(arrMasterName, mastersInFolder);

	if (!arrayMastersEqual) { errors.push("Masters indd found in working path are not matching with list found in excel!") }
	// myArray.sort(function(a, b) {
	// 	return a.toLowerCase().localeCompare(b.toLowerCase());
	//   });


	//progress bar update--------------
	info_bar = "Check master order page";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(1000);
	//progress bar update--------------

	// 6 open masters
	for (var i = 0; i < arrMasterName.length; i++) {
		// alert(arrMasterName[i])
		if (File(workingPath + "/" + arrMasterName[i]).exists == true) {
			app.open(File(workingPath + "/" + arrMasterName[i]), false);
		}
		else {
			errors.push(arrMasterName[i] + " file not found!")
		}
		// 7 order pages in masters
		ordoneazaPagini_dupa_Ratie();


		//progress bar update--------------
		info_bar = "Check elements in master files";
		m++
		progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
		counteranim = counteranim + 1;
		if (counteranim >= counteranimlength) {
			counteranim = 0;
		}
		$.sleep(1000);
		//progress bar update--------------

		// 8 check elements in masters

		if (hw10Check || hw15Check || hw20Check) { findElementName(errors, "hwul") };
		if (dtiCheck) {
			findElementName(errors, "dt4");
			findElementName(errors, "linedthw")
		}
		app.documents[0].save();
		app.documents[0].close(SaveOptions.no);
	}

	// if(errors.length>0)

	//progress bar update--------------
	info_bar = "Start batch resizing ";
	m++
	progressBar.update(m + 1, anim[counteranim] + "   " + info_bar);
	counteranim = counteranim + 1;
	if (counteranim >= counteranimlength) {
		counteranim = 0;
	}
	$.sleep(2000);
	//progress bar update--------------




	progressBar.close();

	exit();



}



function ProgressBar(title, width) {
	var pb = new Window("palette", title);
	pb.bar = pb.add("progressbar", undefined, 0, undefined);
	if (!!width) { // Mini progress bar if no width
		pb.msg = pb.add("statictext", undefined, undefined, { truncate: "middle" });
		pb.msg.characters = Math.max(width, 50);
		pb.layout.layout();
		pb.bar.bounds = [12, 12, pb.msg.bounds[2], 24];
	} else
		pb.bar.bounds = [12, 12, 476, 24];
	this.reset = function (max) {
		pb.bar.value = 0;
		pb.bar.maxvalue = max || 0;
		pb.bar.visible = !!max;
		pb.show();
	}
	this.update = function (val, msg) {
		pb.bar.value = val;
		if (!!width) {
			pb.msg.visible = !!msg;
			!!msg && (pb.msg.text = msg);
		}
		pb.text = title + " - " + val + "/" + pb.bar.maxvalue;
		pb.show(); pb.update();
	}
	this.hide = function () { pb.hide() }
	this.close = function () { pb.close() }
}

function GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber) {
	try {
		if (typeof splitChar === "undefined") var splitChar = ";";
		if (typeof sheetNumber === "undefined") var sheetNumber = "1";
		var appVersionNum = Number(String(app.version).split(".")[0]),
			data = [];

		var vbs = 'Public s, excelFilePath\r';
		vbs += 'Function ReadFromExcel()\r';
		vbs += 'On Error Resume Next\r';
		vbs += 'Err.Clear\r';
		vbs += 'Set objExcel = CreateObject("Excel.Application")\r';
		vbs += 'Set objBook = objExcel.Workbooks.Open("' + excelFilePath + '")\r';
		vbs += 'Set objSheet =  objExcel.ActiveWorkbook.WorkSheets(' + sheetNumber + ')\r';
		vbs += 's = s & "[" & objSheet.Name & "]"\r';
		vbs += 'objExcel.Visible = True\r';
		vbs += 'matrix = objSheet.UsedRange\r';
		vbs += 'maxDim0 = UBound(matrix, 1)\r';
		vbs += 'maxDim1 = UBound(matrix, 2)\r';
		vbs += 'For i = 1 To maxDim0\r';
		vbs += 'For j = 1 To maxDim1\r';
		vbs += 'If j = maxDim1 Then\r';
		vbs += 's = s & matrix(i, j)\r';
		vbs += 'Else\r';
		vbs += 's = s & matrix(i, j) & "' + splitChar + '"\r';
		vbs += 'End If\r';
		vbs += 'Next\r';
		vbs += 's = s & vbCr\r';
		vbs += 'Next\r';
		vbs += 'objBook.close\r';
		vbs += 'Set objSheet = Nothing\r';
		vbs += 'Set objBook = Nothing\r';
		vbs += 'Set objExcel = Nothing\r';
		vbs += 'SetArgValue()\r';
		vbs += 'On Error Goto 0\r';
		vbs += 'End Function\r';
		vbs += 'Function SetArgValue()\r';
		vbs += 'Set objInDesign = CreateObject("InDesign.Application")\r';
		vbs += 'objInDesign.ScriptArgs.SetValue "excelData", s\r';
		vbs += 'End Function\r';
		vbs += 'ReadFromExcel()\r';
		0
		if (appVersionNum > 5) { // CS4 and above
			app.doScript(vbs, ScriptLanguage.VISUAL_BASIC, undefined, UndoModes.FAST_ENTIRE_SCRIPT);
		}
		else { // CS3 and below
			app.doScript(vbs, ScriptLanguage.VISUAL_BASIC);
		}

		var str = app.scriptArgs.getValue("excelData");
		app.scriptArgs.clear();

		var tempArrLine, line, match, name,
			tempArrData = str.split("\r");

		for (var i = 0; i < tempArrData.length; i++) {
			line = tempArrData[i];
			if (line == "") continue;

			match = line.match(/^\[.+\]/);

			if (match != null) {
				name = match[0].replace(/\[|\]/g, "");
				line = line.replace(/^\[.+\]/, "");
			}

			tempArrLine = line.split(splitChar);

			data.name = name;
			data.push(tempArrLine);


			// delete empty
			nonEmptyArrays = [];
			// Function to check if all elements in a line are equal
			function areElementsEqual(linef) {
				for (var i = 1; i < linef.length; i++) {
					if (linef[i] !== linef[0]) {
						return false;
					}
				}
				return true;
			}

			// Check each line in the multi-array
			for (var j = 0; j < data.length; j++) {
				var currentLine = data[j];
				if (areElementsEqual(currentLine)) {
					// console.log(`All elements in line ${j + 1} are equal.`);
				} else {
					// console.log(`Line ${j + 1} has different elements.`);
					nonEmptyArrays.push(currentLine);
				}
			}

		}

		// return data;
		return nonEmptyArrays;
	}
	catch (err) {
		$.writeln(err.message + ", line: " + err.line);
	}
}
// Function to remove duplicates
function removeDuplicates(array) {
	var uniqueArray = [];

	for (var i = 0; i < array.length; i++) {
		var currentValue = array[i];
		var isUnique = true;

		for (var j = 0; j < uniqueArray.length; j++) {
			if (currentValue === uniqueArray[j]) {
				isUnique = false;
				break;
			}
		}

		if (isUnique) {
			uniqueArray.push(currentValue);
		}
	}
	return uniqueArray;
}

function padWithZeros(number, length) {
	var str = number.toString();
	var nrLength = length.toString();
	while (str.length < nrLength.length) {
		str = "0" + str;
	}
	return str;
}

function find_files_Simple(dir, mask_array) {
	var arr = [];
	for (var i = 0; i < mask_array.length; i++) {

		arr = arr.concat(Folder(dir).getFiles('*' + mask_array[i]));

	}
	return arr;
}

function arraysAreEqual(array1, array2) {
	if (array1.length !== array2.length) {
		return false;
	}

	for (var i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}

	return true;
}
function findElementName(errors, elementname) {

	//dt4 //linedthw //hwul
	for (var i = 0; i < app.documents[0].pages.length; i++) {

		myPage = app.documents[0].pages.item(i);

		// ok:
		var numbersItems = myPage.pageItems.length;
		var finds = 0;
		for (var j = 0; j < myPage.pageItems.length; j++) {
			var pageItem = myPage.pageItems[j];
			// alert("|" + pageItem.name + "|")
			// Check if the page item is a rectangle and has the specified name
			if (pageItem.name === elementname) { //dt4 //linedthw

				// alert("pagina " + myPage.name + " este dt4")
			} else {
				// alert("pagina " + myPage.name + " NU este dt4")
				finds++
			}
			// alert("finds " + finds + " numbersItems " + numbersItems)
		}
		if (finds < numbersItems) {
			// alert("pagina " + myPage.name + " este dt4")
		} else {
			// alert("pagina " + myPage.name + " NU este " + elementname)
			errors.push(elementname + " element not found on page " + myPage.name + " in document " + app.documents[0].name)
		}
		// ok final
	}

}
function ordoneazaPagini_dupa_Ratie() {

	//********************************** ORDONEAZA PAGINI DUPA RATIE START   

	app.documents[0].documentPreferences.facingPages = false;
	var spread = app.documents[0].spreads.everyItem()
	spread.allowPageShuffle = true;
	app.documents[0].documentPreferences.allowPageShuffle = true;

	var myRatiaUnu = new Array;

	citestepaginile(myRatiaUnu)

	function citestepaginile(myRatiaUnu) {

		for (var i = 0; i < app.documents[0].pages.length; i++) {

			myPage = app.documents[0].pages.item(i);

			var b = myPage.bounds;
			var W_ = b[3] - b[1]; // 
			var H_ = b[2] - b[0]; // 
			var ratia = W_ / H_;
			myRatiaUnu.push(ratia);
		}
		// alert("ratia din for din functia citeste " + myRatia)
		// alert("ratia length " + myRatia.length)
		comparaRatia_simuta(myRatiaUnu)
	}

	function comparaRatia_simuta(myRatiaUnu) {
		for (var myCounter = 0; myCounter < (myRatiaUnu.length - 1); myCounter++) {

			if (myRatiaUnu[myCounter] > myRatiaUnu[(myCounter + 1)]) {
				app.documents[0].spreads.item(myCounter).move(LocationOptions.AFTER, app.documents[0].spreads.item(myCounter + 1));
				myRatiaUnu = [];
				citestepaginile(myRatiaUnu)
			}

		}
	}

	app.documents[0].save();

	//**********************************  ORDONEAZA PAGINI DUPA RATIE END    
}