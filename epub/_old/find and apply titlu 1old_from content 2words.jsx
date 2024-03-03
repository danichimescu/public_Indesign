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
// alert(myParagraphss[7].words[0].contents + " " + myParagraphss[7].words[1].contents + " " + myParagraphss[7].words[2].contents)

// var validvar = myParagraphss[0].words[1]

// if (myParagraphss[0].words[1].isValid) {
// 	alert("are 2 cuvinte")
// }
// else {
// 	alert("nu are 2 cuvinte")
// }


// try {
// 	if (myParagraphss[0].words[1].contents.isValid) {
// 		alert("undefined")
// 	}
// 	else{
// 		alert("not")
// 	}
// }
// catch (e){
// alert(e)
// }
//.text[0]
// myPars[0].insertionPoints.itemByRange(0,-2).select(); // merge






for (var i = 0; i < myParagraphss.length; i++) {

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
	app.findChangeTextOptions.wholeWord = true;
	// app.findTextPreferences.findWhat.pointSize =14;
	app.findTextPreferences.pointSize = 14;


	// // app.findTextPreferences.position = Position.SUPERSCRIPT
	// if (myParagraphss[i].words[2].isValid) {

	// 	// cauta 3 cuvinte
	// 	app.findTextPreferences.findWhat = myParagraphss[i].words[0].contents + " " + myParagraphss[i].words[1].contents + " " + myParagraphss[i].words[2].contents
	// } else if (myParagraphss[i].words[1].isValid) {

	// 	// cauta 2 cuvinte
	// 	app.findTextPreferences.findWhat = myParagraphss[i].words[0].contents + " " + myParagraphss[i].words[1].contents
	// } else if (myParagraphss[i].words[0].isValid) {

	// 	// cauta 1 cuvinte
	// 	app.findTextPreferences.findWhat = myParagraphss[i].words[0].contents
	// }

	// app.findTextPreferences.findWhat = myParagraphss[i].contents
	// app.changeTextPreferences.changeTo = myParagraphss[i].contents;

	
	app.changeTextPreferences.appliedParagraphStyle = "Titlu";
	mystorydoi.changeText();



}
