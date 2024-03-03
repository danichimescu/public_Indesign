app.scriptPreferences.enableRedraw = false;




var files;
var folder = Folder.selectDialog("Select a folder with InDesign documents");
if (folder != null) {
	files = GetFiles(folder);
	if (files.length > 0) {
		alert("Found " + files.length + " PMD documents");


		// ==================================================START PROGRESS BAR
		var countLines_l = files.length
		// alert(countLines_l)
		var countLines = 0
		var progressWin = CreateProgressBar();
		progressWin.show();
		progressWin.update(); // poate merge pe windows
		progressWin.pb.minvalue = 0;
		progressWin.pb.maxvalue = countLines_l;
		app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
		CreateProgressBar()


		function CreateProgressBar() {
			var w = new Window("window", "Se implementeaza..");
			w.pb = w.add("progressbar", [12, 12, 650, 24], 0, undefined);
			w.st = w.add("statictext");
			w.st.bounds = [0, 0, 640, 20];
			w.st.alignment = "left";
			return w;
		}
		// ================================================== END PROGRESS BAR 1





		gogoEpubMod(files);
	}
	else {
		alert("Found no pmd documents");
	}
}

function GetFiles(theFolder) {
	var files = [],
		fileList = theFolder.getFiles(),
		i, file;

	for (i = 0; i < fileList.length; i++) {
		file = fileList[i];
		if (file instanceof Folder) {
			files = files.concat(GetFiles(file));
		}
		else if (file instanceof File && file.name.match(/\.pmd$/i)) {
			files.push(file);
		}
	}

	return files;
}

function gogoEpubMod(files) {
	// alert(files)

	for (i = 0; i < files.length; i++) {

		// alert(i)
		// ==================================================START PROGRESS BAR 2
		// alert("count line total "+countLines_l)
		// alert("linia curenta" + i)
		progressWin.pb.value = i;
		progressWin.st.text = "Processing file - " + "  (" + i + " / " + countLines_l + ")";
		progressWin.update();
		// ==================================================  PROGRESS BAR END 2


		// alert(files[0])
		// var file_d = new File(path + "/" + filename);
		var fileN = files[i];
		var file_d_name = fileN.fsName;
		executeEpubMod(files, file_d_name)


		// alert(file_d_name)
		// app.open(Folder(Folder.selectDialog("Select a folder with InDesign files")).getFiles(function (f) { // open all indd files from folder
		// 	return f instanceof File && !f.hidden && (f.name.match(/\.indd$/i) || f.type.match(/^IDd/));
		// }));

		// Opens an existing document in the background,
		// var myDocumenttoOpeninBack = app.open(File("/c/myTestDocument.indd"), false);
		// app.open(file_d_name); // merge
		// executeEpubMod(files, file_d_name) merge
		// if (i == (files.length - 1)) {
		// 	// executeEpubMod(files)
		// }
		// countLines = countLines+1
		// app.documents[0].close(SaveOptions.no); // merge
		//// app.close(file_d_name)// nu merge
	}
}


function executeEpubMod(files, file_d_name) {


	var myDocument = app.activeDocument;
	var myFile_calea = app.activeDocument.filePath.fsName;
	var myFileName = app.activeDocument.name;
	var varNrPoze = myDocument.allGraphics.length;


	// for (i = 0; i < files.length; i++) {



	// (function () {
	app.open(file_d_name); // 
	

	var finalFileName = file_d_name.replace(".indd", "");
	var savedocname = finalFileName + "_pdf" + "_.indd";
	myDocument.save(File(savedocname));


	app.documents[0].close(SaveOptions.YES);

}