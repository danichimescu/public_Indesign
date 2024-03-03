var scriptName = "Convert text to footnote",
doc, story;
doc = app.activeDocument;
story = app.selection[0].parentStory;

Main();

// app.doScript(PreCheck, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "\"" + scriptName + "\" script");

//===================================== FUNCTIONS ======================================
function Main() {
	var mEndNotes = doc.textFrames.add( {name:"EndNotes"} ),  
	k, len, cIP, currPara, currFoot, mMarkers;  
	  
	app.findGrepPreferences = app.changeGrepPreferences = null;  
	//---------------------------------------------  
	// edit doc.footnoteOption here  
	with (doc.footnoteOptions)   
		{  
		showPrefixSuffix = FootnotePrefixSuffix.PREFIX_SUFFIX_BOTH;  
		prefix = "[";  
		suffix = "]";  
		separatorText = "\t";  
		markerPositioning = FootnoteMarkerPositioning.NORMAL_MARKER;  
		}  
	//------------------------------------------------------------  
	// move endnotes to a separate textFrame  
	for (k=story.paragraphs.length - 1; k >=0; k--)   
		{  
		if (story.paragraphs[k].contents.search(/^\[\d+\]/) == 0)   
			{  
			currPara = story.paragraphs[k].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory);  
			currPara.words[0].remove();  
			}  
		}  
	//--------------------------------------  
	// create footnote markers  
	app.findGrepPreferences.findWhat = "\\[\\d+\\]";  
	mMarkers = story.findGrep();  
	
	len = mMarkers.length;  
	alert(len)
	while (len-->0) {  
		cIP = mMarkers[len].insertionPoints[0].index;  
		mMarkers[len].remove();  
		story.footnotes.add( LocationOptions.AFTER, story.insertionPoints[cIP] );  
		}  
	//-------------------------------------------------------  
	// fill footnote contents with proper text  
	for (k=0; k < story.footnotes.length; k++) {  
		currFoot = story.footnotes[k];  
		mEndNotes.paragraphs[0].texts[0].move(LocationOptions.AT_END, currFoot.texts[0]);  
		if (story.footnotes[k].characters[-1].contents == "\r") story.footnotes[k].characters[-1].remove();  
		}  
	  
	mEndNotes.remove();

}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function PreCheck() {
	if (app.documents.length == 0) ErrorExit("Please open a document and try again.", true);
	doc = app.activeDocument;
	if (doc.converted) ErrorExit("The current document has been modified by being converted from older version of InDesign. Please save the document and try again.", true);
	if (!doc.saved) ErrorExit("The current document has not been saved since it was created. Please save the document and try again.", true);

	if (app.selection.length == 0) {
		ErrorExit("Nothing is selected.", true);
	}
	else if (app.selection.length == 1) {
		if (app.selection[0].constructor.name == "TextFrame" || app.selection[0].hasOwnProperty("baseline")) {
			story = app.selection[0].parentStory;
		}
		else {
			ErrorExit("Please select one text frame, or some text, or place the cursor and try again.", true);
		}
	}
	else if (app.selection.length > 1) {
		ErrorExit("Only one text frame or some text should be selected, or the cursor placed into the text.", true);
	}
	
	Main();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function ErrorExit(error, icon) {
	alert(error, scriptName, icon);
	exit();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------