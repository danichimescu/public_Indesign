Main();

function Main() {
	// The platform-specific full path name for the xlsx-file -- fsName
	// If you pass it as a string, make sure to double the backslashes in the path like in the line below
	var myDocument = app.activeDocument;
	var myPage_length = app.activeDocument.pages.length
	var myPages = app.activeDocument.pages


	var myFile_calea = app.documents[0].filePath;
	var myFileName_full = app.documents[0].fullName + "";
	var myFileName = app.documents[0].name + "";
	var myFileNameInfo = "test1";

	var excelFilePath = File(myFile_calea + "/" + myFileNameInfo + ".xlsx");
	// var excelFilePath = "D:\\My Test Folder\\Test.xlsx";
	alert(excelFilePath)

	// [Optional] the character to use for splitting the columns in the spreadsheed: e.g. semicolon (;) or tab (\t)
	// If it isn't set, semicolon will be used by default
	var splitChar = ";";

	// [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
	var sheetNumber = "1";
	var data = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
	0
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