/* Copyright 2020, Kasyan Servetsky
April 11, 2020
Written by Kasyan Servetsky
http://www.kasyan.ho.com.ua
e-mail: askoldich@yahoo.com */

main();
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function main() {
	try { // if something goes wrong in the try-catch block, the batch processor won't stop here. It will log the error message and continue further
		var newFont, paragraphStyle, characterStyle, changed, report,
			doc = app.activeDocument, // The frontmost document
			paragraphStyles = doc.allParagraphStyles,
			characterStyles = doc.allCharacterStyles,
			scriptFile = getActiveScript(),
			scriptFolder = scriptFile.parent,
			scriptFolderPath = scriptFolder.fsName,
			excelFilePath = scriptFolderPath + "\\test1.xlsx",
			excelFile = new File(excelFilePath),
			countParStyles = countCharStyles = countLocals = 0;

		if (!excelFile.exists) {
			g.WriteToFile("No CSV-file. Exiting.");
			exit();
		}

		var fontList = GetFontListFromExcel(excelFilePath, ";");
		alert(fontList)

		// // Change in paragraph styles
		// for (var p = 1; p < paragraphStyles.length; p++) {
		// 	paragraphStyle = paragraphStyles[p];
		// 	newFont = getNewFont(paragraphStyle.appliedFont.name, fontList);
		// 	if (newFont != null) {
		// 		paragraphStyle.appliedFont = newFont;
		// 		countParStyles++;
		// 	}
		// }

		// // Change in character styles
		// for (var c = 1; c < characterStyles.length; c++) {
		// 	characterStyle = characterStyles[c];
		// 	newFont = getNewFont(characterStyles[c].appliedFont + "\t" + characterStyles[c].fontStyle, fontList);
		// 	if (newFont != null) {
		// 		characterStyles[c].appliedFont = newFont;
		// 		countCharStyles++;
		// 	}
		// }

		// for (var i = 0; i < fontList.length; i++) {
		// 	app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
		// 	newFont = getNewFont(fontList[i][0], fontList);
		// 	if (newFont != null) {
		// 		app.findTextPreferences.appliedFont = fontList[i][0];
		// 		app.changeTextPreferences.appliedFont = newFont;
		// 		changed = doc.changeText();
		// 		countLocals += changed.length;
		// 		app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
		// 	}
		// }

		// if (countParStyles == 0 && countCharStyles == 0 && changed.length == 0) {
		// 	report = "No changes have been made to the document.";
		// }
		// else {
		// 	report = "Changed fonts in " + countParStyles + " paragraph style" + ((countParStyles == 1)  ? ", " : "s, ") + countCharStyles + " character style" + ((countCharStyles == 1)  ? "," : "s,") + " and " + countLocals + " instance"  + ((countLocals == 1)  ? "" : "s") + " of locally formatted text.";
		// }

		g.WriteToFile(report);
	}
	catch (err) { // if an error occurs, catch it and write the  document's name, error message and line# where it happened into the log
		// g.WriteToFile(doc.name + " - " + err.message + ", line: " + err.line);
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// function getNewFont(oldFontName, fontList) {
// 	var newFontName,
// 	newFont = null;

// 	for (var p = 0; p < fontList.length; p++) {
// 		newFontName = fontList[p][1];

// 		if (oldFontName == fontList[p][0]) {
// 			newFont = app.fonts.itemByName(newFontName);

// 			if (newFont.index == -1 || !newFont.isValid) {
// 				newFont = null;
// 				g.WriteToFile(fontList[p][1] + " - Font isn't installed.");
// 			}

// 			break;
// 		}
// 	}

// 	return newFont;
// }
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function getActiveScript() {
	try {
		return app.activeScript;
	}
	catch (err) {
		return new File(err.fileName);
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function GetFontListFromExcel(excelFilePath, splitChar) {
	if (typeof splitChar == "undefined") var splitChar = ";";

	var vbs = 'Public s, excelFilePath\r';
	vbs += 'Function ReadFromExcel()\r';
	vbs += 'Set objExcel = CreateObject("Excel.Application")\r';
	vbs += 'Set objBook = objExcel.Workbooks.Open("' + excelFilePath + '")\r';
	vbs += 'Set objSheet =  objExcel.ActiveWorkbook.WorkSheets(1)\r';
	vbs += 'objExcel.Visible = False\r';
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
	vbs += 'objBook.Close\r';
	vbs += 'Set objBook = Nothing\r';
	vbs += 'Set objExcel = Nothing\r';
	vbs += 'End Function\r';
	vbs += 'Function SetArgValue()\r';
	vbs += 'Set objInDesign = CreateObject("InDesign.Application")\r';
	vbs += 'objInDesign.ScriptArgs.SetValue "excelData", s\r';
	vbs += 'End Function\r';
	vbs += 'ReadFromExcel()\r';
	vbs += 'SetArgValue()\r';

	app.doScript(vbs, ScriptLanguage.VISUAL_BASIC, undefined, UndoModes.FAST_ENTIRE_SCRIPT);

	var str = app.scriptArgs.getValue("excelData");
	app.scriptArgs.clear();

	var tempArrLine, line,
		data = [],
		tempArrData = str.split("\r");

	for (var i = 0; i < tempArrData.length; i++) {
		line = tempArrData[i];
		if (line == "") continue;
		tempArrLine = line.split(splitChar);
		data.push( tempArrLine[7] ); //tempArrLine[7] = coloana 7
		
		// data.push([
		// 				eval("\"" + tempArrLine[0] + "\""), // A -- Find
		// 				eval("\"" + tempArrLine[1]+ "\"") // B -- Change to
		// 				]);
	}

	return data
}