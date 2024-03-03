Main();

function Main() {
	// The platform-specific full path name for the xlsx-file -- fsName
	// If you pass it as a string, make sure to double the backslashes in the path like in the line below
	var myDocument = app.activeDocument;
	var myPage_length = app.activeDocument.pages.length
	var myPages = app.activeDocument.pages


	var myFile_calea = app.activeDocument.filePath.fsName;


	var excelFilePath = "c:\\lucru\\ideea\\Partida5\\excelInput\\partida5input.xlsx"
	var excelFile = new File(excelFilePath)

	var myFile_ID = app.documents[0].filePath.fsName;
	// var myFile_calea = myFile_calea.match(/\d\d\d/g);
	var myFile_ID = myFile_ID.match(/\d+_/);
	var myFile_ID = myFile_ID+"";
	// alert("myFile_ID  "+myFile_ID);
	var myFile_ID = myFile_ID.replace("_","");
	var myFile_ID = Number(myFile_ID);
	var Id_nr = myFile_ID
	// alert("myFileNameInfo  "+myFile_ID);


	var dataList = GetDataFromExcelPC(excelFilePath, ";");
	// alert(dataList[18][10]) // [1] - linia [2] = coloana


	var metaIsbn_pdf = dataList[Id_nr][9]; // OK
	var metaIsbn_epub = dataList[Id_nr][8];
	var anul_aparitiei = dataList[Id_nr][7];
	var mEpubPublisher = dataList[Id_nr][15];// OK
	// alert(mEpubPublisher)
	myNote = app.selection[0];
	// myNote.texts[0].contents = "ISBN pdf: "+metaIsbn_pdf +"\r"+ "ISBN epub: "+metaIsbn_epub;


try{
if (mEpubPublisher=="Ideea Europeană"){
my_urlforinput = "https://www.ideeaeuropeana.ro"
my_emailforinput = "mailto:office@ideeaeuropeana.ro" // mailto:kenw@leadingswmaniacs.com
}
if (mEpubPublisher=="Contemporanul"){
my_urlforinput = "https://www.contemporanul.ro"
my_emailforinput = "mailto:office@contemporanul.ro"
}
if (mEpubPublisher=="EuroPress"){
my_urlforinput = "https://www.europressgroup.ro"
my_emailforinput = "mailto:office@europress.ro"
}
}
catch(e){
	alert(e)
}
// alert(my_urlforinput +" "+my_emailforinput)

	// myNote.texts[0].contents = "www.ideeaeuropeana.ro";
	myNote.texts[0].contents = "E-mail: "+my_emailforinput+" \r"+my_urlforinput ;
	// Contemporanul
	// Ideea Europeană
	// EuroPress

	// 	E-mail: office@ideeaeuropeana.ro
	// www.ideeaeuropeana.ro (linkabil spre site https://www.ideeaeuropeana.ro/)
	// E-mail: office@europress.ro
	// www.europressgroup.ro (linkabil spre site https://www.europressgroup.ro/)
	// E-mail: office@contemporanul.ro
	// www.contemporanul.ro (linkabil spre site https://www.contemporanul.ro/)

	// //// ok hyperlink

	// 	var myPageItem = app.selection[0]; //First currently selected pageItem
	// 	var myURL = "www.adobe.com"; //Pick any URL
	// 	// var source = app.documents[0].hyperlinkPageItemSources.add(myPageItem);// HyperlinkTextSource
	// 	var source = app.documents[0].hyperlinkTextSources.add(myPageItem);
	// 	var dest = app.documents[0].hyperlinkURLDestinations.add(myURL);
	// 	//Add hyperlink to the pageItem
	// 	app.documents[0].hyperlinks.add(source, dest, { name: myURL })
	// //// ok hyperlink end


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
















	var metaTitle = dataList[Id_nr][10]; // OK
	// alert(Id_nr + " \r " + " \r " + "Titlu = " + metaTitle + " \r " + "isbn pdf = " + metaIsbn_pdf + " /\r " + "isbn epub = " + metaIsbn_epub)








	var splitChar = ";";

	// [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
	var sheetNumber = "1";
	var data = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
	0
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