app.scriptPreferences.enableRedraw = false;




var files;
var folder = Folder.selectDialog("Select a folder with InDesign documents");
if (folder != null) {
	files = GetFiles(folder);
	if (files.length > 0) {
		alert("Found " + files.length + " InDesign documents");


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
		alert("Found no InDesign documents");
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
		else if (file instanceof File && file.name.match(/\.indd$/i)) {
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





	// for (i = 0; i < files.length; i++) {



	// (function () {
	app.open(file_d_name); // 
	var myDocument = app.activeDocument;
	var myFile_calea = app.activeDocument.filePath.fsName;
	var myFileName = app.activeDocument.name;
	var varNrPoze = myDocument.allGraphics.length;

// show frame edges
// show hidden charecters
// ctrl alt Y show links

app.activeDocument.textPreferences.leadingKeyIncrement = 1;
app.activeDocument.textPreferences.showInvisibles = true;
app.activeDocument.viewPreferences.showFrameEdges = true;
app.generalPreferences.showAnchorObjectAdornment = true;



	var myPage = myDocument.pages.item(1);
	var myTextFrame = myPage.textFrames.add();
	myTextFrame.geometricBounds = ["70mm", "-95mm", "200mm", "-10mm"];
	// myTextFrame.move(["-300mm", 0])
	// myTextFrame.contents = "Example text frame.";
	myTextFrame.name = "InfoEpub";

	// ImportFormat.OBJECT_STYLES_FORMAT
	// ImportFormat.PARAGRAPH_STYLES_FORMAT
	//aparastyle_infoepub
	var myTextFrame_pdf = myPage.textFrames.add();
	myTextFrame_pdf.geometricBounds = ["0mm", "-70mm", "15mm", "-10mm"];
	
	var myTextFrame_epub = myPage.textFrames.add();
	myTextFrame_epub.geometricBounds = ["20mm", "-70mm", "35mm", "-10mm"];
	
	myTextFrame_pdf.name = "InfoEpub_ISBNpdf";
	myTextFrame_epub.name = "InfoEpub_ISBNepub";










	myDocument.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, File("c:/lucru/ideea/change_break.indd"), //c:\lucru\ideea\
		GlobalClashResolutionStrategy.doNotLoadTheStyle);
	myDocument.importStyles(ImportFormat.OBJECT_STYLES_FORMAT, File("c:/lucru/ideea/change_break.indd"), //c:\lucru\ideea\
		GlobalClashResolutionStrategy.doNotLoadTheStyle);


		//titlu 1 2 3 si toc.indd

		myDocument.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, File("c:/lucru/ideea/titlu 1 2 3 si toc.indd"), //c:\lucru\ideea\
		GlobalClashResolutionStrategy.doNotLoadTheStyle);
	myDocument.importStyles(ImportFormat.OBJECT_STYLES_FORMAT, File("c:/lucru/ideea/titlu 1 2 3 si toc.indd"), //c:\lucru\ideea\
		GlobalClashResolutionStrategy.doNotLoadTheStyle);



	aparastyle_infoepub = myDocument.paragraphStyles.item("aparastyle_infoepub");
	myTextFrame.parentStory.texts.item(0).applyParagraphStyle(aparastyle_infoepub, true);
	// myTextObject.appliedParagraphStyle = myDocument.paragraphStyles.item("[No Paragraph Style]");




	var myDocument = app.activeDocument;
//Clear the find/change text preferences.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
//Set the find options.
app.findChangeTextOptions.caseSensitive = false;
app.findChangeTextOptions.includeFootnotes = false;
app.findChangeTextOptions.includeHiddenLayers = false;
app.findChangeTextOptions.includeLockedLayersForFind = false;
app.findChangeTextOptions.includeLockedStoriesForFind = false;
app.findChangeTextOptions.includeMasterPages = false;
app.findChangeTextOptions.wholeWord = false;
//Search the document for the string "copy" and change it to "text".
app.findTextPreferences.findWhat = "Editori: Aura Christi & Andrei Potlog";
app.changeTextPreferences.changeTo = "";
myDocument.changeText();
//Clear the find/change text preferences after the search.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;


	//////************ meta si isbn */


// aici modifica #####!!!!
	var excelFilePath = "c:\\lucru\\ideea\\Partida5b\\excelInput\\partida5binput.xlsx"
						//c:\lucru\ideea\Partida5b\excelInput\ Partida5b
	var excelFile = new File(excelFilePath)

	// var myFile_ID = app.documents[0].filePath.fsName;
	var myFile_ID = file_d_name
	// var myFile_calea = myFile_calea.match(/\d\d\d/g);
	// alert("myFile_ID  "+myFile_ID);
	// var myFile_calea = myFile_calea.match(/\d\d\d/g);
	var myFile_ID = myFile_ID.match(/\d+_/);
	var myFile_ID = myFile_ID + "";
	// alert("myFile_ID  "+myFile_ID);
	var myFile_ID = myFile_ID.replace("_", "");
	var myFile_ID = Number(myFile_ID);
	var Id_nr = myFile_ID
	// alert("Id_nr  "+Id_nr);


	var dataList = GetDataFromExcelPC(excelFilePath, ";");
	// alert(dataList[18][10]) // [1] - linia [2] = coloana



	var metaIsbn_pdf = dataList[Id_nr][9]; // OK
	var metaIsbn_epub = dataList[Id_nr][8]; // OK

	var metaTitle = dataList[Id_nr][10]; // OK
	var mAuthor = dataList[Id_nr][12]; // OK
	var anul_aparitiei = dataList[Id_nr][7];
	//colectie?
	// traducator?//
	var mEpubPublisher = dataList[Id_nr][15];  // OK
	var mCreationDate = dataList[Id_nr][16]; // nu m // OK
	var metaDesc = dataList[Id_nr][17]; // OK bisac descr
	// var metaKeys = readedLine[16]+; //Subject este la epub // OK
	var metaKeys = ["", dataList[Id_nr][19]];
	// var metaKeys = ["test", "metadata"];
	var mEpubDescription = dataList[Id_nr][17];
	var mEpubSubject = dataList[Id_nr][19]; //18

	var docRef = app.activeDocument;
	var metaPrefs = docRef.metadataPreferences;
	var metaPrefsEpub = docRef.epubExportPreferences;

	metaPrefs.copyrightStatus = CopyrightStatus.YES;
	metaPrefs.documentTitle = metaTitle;
	// metaPrefs.jobName = mJobName;
	metaPrefs.author = mAuthor;
	metaPrefs.description = metaDesc;

	metaPrefsEpub.epubDate = mCreationDate;
	metaPrefsEpub.epubPublisher = mEpubPublisher;
	metaPrefs.copyrightNotice = metaPrefsEpub.epubPublisher;

	metaPrefsEpub.epubDescription = mEpubDescription;
	metaPrefsEpub.epubSubject = mEpubSubject;

	if (metaKeys != undefined) metaPrefs.keywords = metaKeys;
	var itemp = 0
	while (itemp < app.activeDocument.hyperlinks.length) {
		// MyHyperr = myDocument.hyperlinks.item( i );
		// MyHyperr.remove()
		// alert( myDocument.hyperlinks.length)
		app.activeDocument.hyperlinks.item(itemp).remove();
	}
	try {
		if (mEpubPublisher == "Ideea Europeană") {
			my_urlforinput = "https://www.ideeaeuropeana.ro"
			my_emailforinput = "mailto:office@ideeaeuropeana.ro" // mailto:kenw@leadingswmaniacs.com
		}
		if (mEpubPublisher == "Contemporanul") {
			my_urlforinput = "https://www.contemporanul.ro"
			my_emailforinput = "mailto:office@contemporanul.ro"
		}
		if (mEpubPublisher == "EuroPress") {
			my_urlforinput = "https://www.europressgroup.ro"
			my_emailforinput = "mailto:office@europress.ro"
		}
	}
	catch (e) {
		// alert(e)
	}

	// myNote = app.selection[0];
	// myNote.texts[0].contents =

	myDocument.textFrames.itemByName("InfoEpub").parentStory.insertionPoints.item(-1).contents =

		"E-mail: " + my_emailforinput + " \r" + my_urlforinput + "\r" + "\r" +
		"Ediţie Digitală (pdf)" + "\r" +
		"ISBN " + metaIsbn_pdf + "\r" +
		"Ediţie Digitală (epub)" + "\r" +
		"ISBN " + metaIsbn_epub + "\r\r" +
		"Copyright © " + anul_aparitiei + " " + mEpubPublisher + "\r\r" +
		"Această carte în format digital (eBook) este protejată prin copyright şi este destinată exclusiv utilizării ei în scop privat pe dispozitivul de citire pe care a fost descărcată. Orice altă utilizare, incluzând împrumutul sau schimbul, reproducerea integrală sau parţială, multiplicarea, închirierea, punerea la dispoziţia publică, inclusiv prin internet sau prin reţele de calculatoare, stocarea permanentă sau temporară pe dispozitive sau sisteme cu posibilitatea recuperării informaţiei, altele decât cele pe care a fost descărcată, revânzarea sau comercializarea sub orice formă, precum şi alte fapte similare săvârşite fără permisiunea scrisă a deţinătorului copyright‑ului reprezintă o încălcare a legislaţiei cu privire la protecţia proprietăţii intelectuale şi se pedepsesc în conformitate cu legislaţia în vigoare." +
		"\r";


		try{
			myCharacterStyleforww = myDocument.characterStyles.add({name:"Hyperliks"});
			// myColorforHyper = myDocument.colors.add({name:"bluehyper", model:ColorModel.process, colorValue:[0, 0, 0, 100]});
			myColorforHyper = myDocument.colors.add({ name: "bluehyper", model: ColorModel.PROCESS, space: ColorSpace.RGB, colorValue: [0, 0, 255] })
			myCharacterStyleforww.fillColor = myColorforHyper;
		} catch(e){}
		
		//////******************************************* */ email input
		app.findGrepPreferences = NothingEnum.nothing;
		app.changeGrepPreferences = NothingEnum.nothing;
		app.findGrepPreferences.findWhat = my_emailforinput;
		var myFound = [];
		myFound = app.documents[0].findGrep();
		
		myFound[0].appliedCharacterStyle = myDocument.characterStyles.item("Hyperliks");
		app.select(myFound[0])
		var myPageItem= getTextSelection();
		
		
		
		var myEMail = my_emailforinput; //Pick any URL myEMail
		var source = app.documents[0].hyperlinkTextSources.add(myPageItem);
		var dest = app.documents[0].hyperlinkURLDestinations.add(myEMail);
		//Add hyperlink to the pageItem
		app.documents[0].hyperlinks.add(source, dest, { name: myEMail })
		
		//////************************************************* */ email input end
		
		
		//////******************************************* */ url input
			app.findGrepPreferences = NothingEnum.nothing;
			app.changeGrepPreferences = NothingEnum.nothing;
			app.findGrepPreferences.findWhat = my_urlforinput;
			// app.findGrepPreferences.findWhat = "^[\\u\\d \\:\\;\\?\\-\\'\\\"\\$\\%\\&\\!\\@\\*\\#\\,\\.\\(\\)]+[\\u\\d](?=\\.|,)";
			// app.findGrepPreferences.appliedParagraphStyle = "Main";
			var myFound = [];
			myFound = app.documents[0].findGrep();
			app.select(myFound[0])
			
			myFound[0].appliedCharacterStyle = myDocument.characterStyles.item("Hyperliks");
			// myFound[0].applyCharacterStyles(myCharacterStyleforww, true);
			// app.select(myFound[0])
			// alert(myFound[0])
			// var myPageItem = app.selection[0]; //First currently selected pageItem
			// var myPageItem_cev = app.select(myFound[0])
			var myPageItemdoi= getTextSelection();
		
			// alert(myPageItem)
			function getTextSelection()   {
				
				if (app.documents.length == 0) {
					util.error_exit("No documents are open.  Please open a document and try again.");
				}
				if (app.selection.length == 0) {
					util.error_exit("Please select something and try again.");
				}
				
				var myObject;
				var mySel = app.selection[0];
			
				switch (mySel.constructor.name) {
					case "Character":
					case "Word":
					case "TextStyleRange":
					case "Line":
					case "Paragraph":
					case "TextColumn":
					case "Text":
					case "Cell":
					case "Column":
					case "Row":
					case "Table":
					case "InsertionPoint":
					
					myObject = mySel;
					break;
					
					case "TextFrame":
					util.error_exit ("Please select some text (not a whole text frame) and try again.");
					break;
					
					case "Story":
					util.error_exit ("Please select some text (not a whole story) and try again.");
					break;
					
					default:
					util.error_exit("Please select some text and try again.");
					if (!myObject.isValid) {
						util.error_exit( "There's been an error of indeterminate nature.  " + 
										 "Probably best to blame the programmer." );
					}
				}
			
				if (myObject.parentStory.lockState == LockStateValues.CHECKED_IN_STORY || 
						myObject.parentStory.lockState == LockStateValues.LOCKED_STORY) {
					util.error_exit ("Please check out the story you're trying to place text into, and try again.");
				}
						
				return myObject;
			}
		
		
			// var myPageItem = myPageItem_cev.contents
			var myURLdoi = my_urlforinput; //Pick any URL
			// var source = app.documents[0].hyperlinkPageItemSources.add(myPageItem);// HyperlinkTextSource
			var source = app.documents[0].hyperlinkTextSources.add(myPageItemdoi);
			var dest = app.documents[0].hyperlinkURLDestinations.add(myURLdoi);
			//Add hyperlink to the pageItem
			app.documents[0].hyperlinks.add(source, dest, { name: myURLdoi })
		
		//////************************************************* */ url input end
		
		app.findGrepPreferences = NothingEnum.nothing;
		app.changeGrepPreferences = NothingEnum.nothing;
		app.findGrepPreferences.findWhat = "mailto:";
		app.changeGrepPreferences.changeTo = ""; //\r
		// app.findGrepPreferences.findWhat = "^[\\u\\d \\:\\;\\?\\-\\'\\\"\\$\\%\\&\\!\\@\\*\\#\\,\\.\\(\\)]+[\\u\\d](?=\\.|,)";
		// app.findGrepPreferences.appliedParagraphStyle = "Main";
		// var myFound = [];
		app.documents[0].changeGrep();
		
		
		
		myDocument.textFrames.itemByName("InfoEpub_ISBNpdf").parentStory.insertionPoints.item(-1).contents =

		"pdf " + "\r"+
		"ISBN " + metaIsbn_pdf + "\r" ;

		myDocument.textFrames.itemByName("InfoEpub_ISBNepub").parentStory.insertionPoints.item(-1).contents =

		"epub " + "\r"+	
		"ISBN " + metaIsbn_epub + "\r";











	// alert(Id_nr + " \r " + " \r " + "Titlu = " + metaTitle + " \r " + "isbn pdf = " + metaIsbn_pdf + " /\r " + "isbn epub = " + metaIsbn_epub)
	// inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher, mEpubDescription, mEpubSubject);

	// alert(metaIsbn_pdf + " /\r " + metaIsbn_epub + " /\r " + metaTitle + " /\r " + mAuthor + " /\r " + metaDesc + " /\r " + metaKeys + " /\r " + mCreationDate + " /\r " + mEpubPublisher)
	// inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher, mEpubDescription, mEpubSubject);

	// [Optional] the character to use for splitting the columns in the spreadsheed: e.g. semicolon (;) or tab (\t)
	// If it isn't set, semicolon will be used by default
	var splitChar = ";";

	// [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
	var sheetNumber = "1";
	var data = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
	0
	// myDocument.save();

	///////****** end meta si isbn */

	////////****** get data from excel */

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
			}

			return data;
		}
		catch (err) {
			$.writeln(err.message + ", line: " + err.line);
		}
	}


	var finalFileName = file_d_name.replace(".indd", "");
	var savedocname = finalFileName + "_pdf" + "_.indd";
	myDocument.save(File(savedocname));


	app.documents[0].close(SaveOptions.YES);

}