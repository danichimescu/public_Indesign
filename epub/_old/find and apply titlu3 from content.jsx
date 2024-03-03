var myDocument = app.activeDocument;
var mystory = app.selection[1].parentStory;
var mystorydoi = app.selection[0].parentStory;
// var mySel = app.activeDocument.selection;
// currFoot = story.footnotes[2];
// currFoot.texts[0].insertionPoints[-1].select();
// app.paste();
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "/ \\d+"; // ########
// app.findGrepPreferences.appliedParagraphStyle = "Titlu";
app.changeGrepPreferences.changeTo = " "; //\r
// app.changeGrepPreferences.appliedParagraphStyle = "Titlu";
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
mystory.changeGrep();

app.findTextPreferences = app.changeTextPreferences = NothingEnum.nothing;
app.findTextPreferences.findWhat = "  ^p"
app.changeTextPreferences.changeTo = "^p";
mystory.changeText();







var mySeldoi = app.activeDocument.selection[0];
var mySel = app.activeDocument.selection[1]; // merge sel este text frame

var myParagraphss = mySel.texts[0].paragraphs; // merge
alert(myParagraphss.length)
 //.text[0]
// myPars[0].insertionPoints.itemByRange(0,-2).select(); // merge






for (var i = 0; i < myParagraphss.length-1; i++) {

// alert(i)
// alert(myParagraphss[i].contents)
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
	// app.findTextPreferences.position = Position.SUPERSCRIPT
	app.findTextPreferences.findWhat = myParagraphss[i].contents
	app.changeTextPreferences.changeTo = myParagraphss[i].contents;
	app.changeTextPreferences.appliedParagraphStyle = "Titlu 2";
	mystorydoi.changeText();



}

// //Clear the find/change text preferences.
// app.findTextPreferences = NothingEnum.nothing;
// app.changeTextPreferences = NothingEnum.nothing;
// //Set the find options.
// app.findChangeTextOptions.caseSensitive = false;
// app.findChangeTextOptions.includeFootnotes = false;
// app.findChangeTextOptions.includeHiddenLayers = false;
// app.findChangeTextOptions.includeLockedLayersForFind = false;
// app.findChangeTextOptions.includeLockedStoriesForFind = false;
// app.findChangeTextOptions.includeMasterPages = false;
// app.findChangeTextOptions.wholeWord = false;
// app.findTextPreferences.position = Position.SUPERSCRIPT
// var myCounter=1
// var strMycounter = myCounter + ""
// // alert(strMycounter)
// //Search the document for the string "copy" and change it to "text".
// app.findTextPreferences.findWhat = strMycounter;
// app.changeTextPreferences.changeTo = "";
// // alert(app.selection[0].parent) // = story
// var found = app.selection[0].parent.findText(); //findText //findGrep
// found[0].texts[0].paragraphs[0].insertionPoints.itemByRange(0, -2).select(); // mergeeeeee

// found[0].insertionPoints[0].footnotes.add()
		// for (var i = found.length-1; i >= 0; i--) {
			// found[i].insertionPoints[0].contents = app.activeDocument.selection[0].footnotes.add()
			// found[i].insertionPoints[0].contents = ""
		// 	found[i].insertionPoints[0].footnotes.add()
		// }

// app.selection[0].parent.changeText();


// // var found = app.selection[0].parent.findText(); //findText //findGrep //combineMe[a]
// var selectedItem_0_InsertionPoint = app.activeDocument.selection[0];
// var textFramefromSelection = selectedItem_0_InsertionPoint.parentTextFrames[0];
// var textFrame = selectedItem_0_InsertionPoint.parentTextFrames[0];
// 		textFrame.name = "text_cu_footnote";
// var found = textFrame.parentStory.findText();
// for (var i = found.length - 1; i >= 0; i--) {
// 	// found[i].insertionPoints[0].contents = ""
// 	// found[i].insertionPoints[0].footnotes.add() // merge e ok
// 	// var myPars = mySel[zz].texts[0].paragraphs;
// 	// try {
// 		found[i].insertionPoints[0].itemByRange(0, -2).select();
// 		app.cut();
// 		myCopied = true;
// 	// }

// }




// var mEndNotes = doc.textFrames.add( {name:"EndNotes"} ),  
// k, len, cIP, currPara, currFoot, mMarkers;

// currPara = story.paragraphs[k].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory); 
// mEndNotes.paragraphs[0].texts[0].move(LocationOptions.AT_END, currFoot.texts[0]); 


// //  // Reference the selection
// //  var fnText = app.activeDocument.selection[0];
// //  // Add an empty footnote where the selected text is
// //  var fNote = app.activeDocument.selection[0].footnotes.add();
// //  // Move the selected text at the end of the empty footnote
// //  fnText.duplicate(LocationOptions.AFTER, fNote.insertionPoints[-1]);


// makeFootnoteOfSelection() // merge

//  function makeFootnoteOfSelection(){

// 	// Reference the selection
// 	var fnText = app.activeDocument.selection[0];

// 	//  Position of the text end
// 	var endPoint = fnText.length - 1;

// 	// Add an empty footnote where the selected text is
// 	var fNote = app.activeDocument.selection[0].footnotes.add();

// 	// Duplicate the selected text at the end of the empty footnote
// 	fnText.duplicate(LocationOptions.AFTER, fNote.insertionPoints[-1]);

// 	// Delete the old Text
// 	fnText.characters.itemByRange(0, endPoint).contents = "";
//   }




// // }
// // app.findTextPreferences.findWhat = "a";
// // 			app.changeTextPreferences.changeTo = "";


// // 			var found = app.selection[0].parent.findText(); //findText //findGrep
// // 			for (var i = found.length - 1; i >= 0; i--) {
// // 				// found[i].insertionPoints[0].contents = ""
// // 				// found[i].insertionPoints[0].footnotes.add() // merge e ok
// // 			app.cut(found[i].insertionPoints[0].paragraph[0])// nu merge
// // 			}
// // // var file_type, title, param_path

// // // get_folder_files(file_type, title, param_path)


// // // function get_folder_files(file_type, title, param_path) {
// // // 	// v.0.1.2
// // // 	var path = "";	
// // // 	if(!param_path) {
// // // 		var tmp_file = File.openDialog(title, file_type);		
// // // 		if(!tmp_file) {exit(); };
// // // 		path = tmp_file.path;
// // // 	}else { path = param_path; };

// // // 	var my_folder = new Folder(path);
// // // 	return my_folder.getFiles(file_type);
// // // };
// // // // alert(my_folder)