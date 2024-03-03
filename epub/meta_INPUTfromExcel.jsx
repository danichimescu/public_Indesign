Main();

function Main() {
	// The platform-specific full path name for the xlsx-file -- fsName
	// If you pass it as a string, make sure to double the backslashes in the path like in the line below
	var myDocument = app.activeDocument;
	var myPage_length = app.activeDocument.pages.length
	var myPages = app.activeDocument.pages


	var myFile_calea = app.activeDocument.filePath.fsName;

	// var myFileNameInfo = "test1";
	// var excelFilePath = new File(myFile_calea + "/" + myFileNameInfo + ".xlsx");
	// var excelFilePath = new File(myFile_calea + "\\test1.xlsx");
	// var excelFilePath = myFile_calea + "\\test1.xlsx";
	// var excelFilePath = "c:\\lucru\\ideea\\Partida2\\excelInput\\partida2input.xlsx"
	var excelFilePath = "d:\\lucru\\_ed universitara\\universitara1.xlsx"
	var excelFile = new File(excelFilePath)
	// var excelFilePath = "D:\\My Test Folder\\Test.xlsx";
	// alert(excelFilePath)

	// if (!excelFilePath.exists) {
	// 	alert("No file. Exiting.");	
	// 	exit();
	// }


	var myFile_ID = app.documents[0].filePath.fsName;
	// var myFile_calea = myFile_calea.match(/\d\d\d/g);
	// var myFile_ID = myFile_ID.match(/\d\d\d/);
	// var myFile_ID = Number(myFile_ID);
	// var Id_nr = myFile_ID
	alert("myFileNameInfo  "+myFile_ID);
	var myFile_ID = myFile_ID.match(/\d+_/);
	var myFile_ID = myFile_ID+"";
	alert("myFile_ID  "+myFile_ID);
	var myFile_ID = myFile_ID.replace("_","");
	var myFile_ID = Number(myFile_ID);
	var Id_nr = myFile_ID
	alert("Id_nr  "+Id_nr);


	var dataList = GetDataFromExcelPC(excelFilePath, ";");
	// alert(dataList[18][10]) // [1] - linia [2] = coloana


	var metaIsbn_pdf = dataList[Id_nr][9]; // OK
	var metaIsbn_epub = dataList[Id_nr][8]; // OK

	var metaTitle = dataList[Id_nr][10]; // OK
	var mAuthor = dataList[Id_nr][12]; // OK
	//colectie?
	// traducator?//
	var mEpubPublisher = dataList[Id_nr][15];  // OK
	var mCreationDate = dataList[Id_nr][16]; // nu m // OK
	var metaDesc = dataList[Id_nr][17]; // OK bisac descr
	// var metaKeys = readedLine[16]+; //Subject este la epub // OK
	var metaKeys = ["", dataList[Id_nr][19]];
	// var metaKeys = ["test", "metadata"];
	var mEpubDescription =dataList[Id_nr][17];
	var mEpubSubject = dataList[Id_nr][19]; //18



	alert(Id_nr + " \r " + " \r "  +metaIsbn_pdf + " /\r " + metaIsbn_epub + " /\r " + metaTitle + " /\r " + mAuthor + " /\r " + metaDesc + " /\r " + metaKeys + " /\r " + mCreationDate + " /\r " + mEpubPublisher)
	inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher, mEpubDescription, mEpubSubject );

	// [Optional] the character to use for splitting the columns in the spreadsheed: e.g. semicolon (;) or tab (\t)
	// If it isn't set, semicolon will be used by default
	var splitChar = ";";

	// [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
	var sheetNumber = "1";
	var data = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
	0
}

function inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher, mEpubDescription, mEpubSubject ) {


	// savedoc.close(SaveOptions.no);


	/*Metadata information to be returned from a custom dialog***************************************************/
	// var metaTitle = "Title for Publication"; // OK
	// var mAuthor = "Name of Author"; // OK
	// var metaDesc = "Descrirea"; // OK
	// var metaKeys = ["test", "metadata"]; //Subject este la epub // OK
	// var mCreationDate = "20200"; // nu m // OK
	// var mEpubPublisher = "Editura mataaa";  // OK


	// var metaName = "Name of ePub";
	// var mJobName = "Job Name";

	/*Copyright information could be har-coded in script*/
	// var mNotice = "Copyrighted 2013 Your Name";
	// var metaURL = "www.yourURL.com";
	/*Assumes document is open and has been saved*/
	// var docRef = app.documents.item(0); //app.activeDocument;

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
	// if (metaURL != undefined) metaPrefs.copyrightInfoURL = metaURL;


	// var docRef = app.documents.item(0);
	// var myExportPrefs = docRef.epubExportPreferences;
	// myExportPrefs.epubDate = mCreationDate;
	// myExportPrefs.epubPublisher = mEpubPublisher;
	// myExportPrefs.includeDocumentMetadata = true;



	docRef.save();

	// myDocument.save();
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
		}

		return data;
	}
	catch (err) {
		$.writeln(err.message + ", line: " + err.line);
	}
}