var myDocument = app.activeDocument;
//var mystory = app.selection[1].parentStory;
var mystorydoi = app.selection[0].parentStory;

var mySel = app.activeDocument.selection[0];
var myParagraphss = mySel.texts[0].paragraphs;

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

for (var i = 0; i < myParagraphss.length; i++) {

	

	
	app.findTextPreferences.findWhat = "CAPITOL";
	app.findChangeTextOptions.caseSensitive = false;
	app.findChangeTextOptions.includeFootnotes = false;
	app.findChangeTextOptions.includeHiddenLayers = false;
	app.findChangeTextOptions.includeLockedLayersForFind = false;
	app.findChangeTextOptions.includeLockedStoriesForFind = false;
	app.findChangeTextOptions.includeMasterPages = false;
	app.findChangeTextOptions.wholeWord = false;
	// app.findTextPreferences.findWhat.pointSize =14;
	//app.findTextPreferences.capitalization = Capitalization.ALL_CAPS; nu toate is all caps TREBUIE CU UPPER CASE
	//app.findTextPreferences.pointSize = 16;
	app.findTextPreferences.fontStyle= 'Bold';
	app.findTextPreferences.justification = Justification.CENTER_ALIGN;



	//app.changeTextPreferences.changeTo = NothingEnum.nothing;
	
	app.changeTextPreferences.appliedParagraphStyle = "#Titlu 2";
	mystorydoi.changeText();




}


	// ;

	// ChangeTextPreference.justification

	// ChangeGrepPreference.justification
// alert(i)
	// alert(myParagraphss[i].contents)

// var mySel = app.activeDocument.selection;
// currFoot = story.footnotes[2];
// currFoot.texts[0].insertionPoints[-1].select();
// app.paste();
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// app.findGrepPreferences.findWhat = "/ \\d+"; // ########
// // app.findGrepPreferences.appliedParagraphStyle = "Titlu";
// app.changeGrepPreferences.changeTo = " "; //\r
// // app.changeGrepPreferences.appliedParagraphStyle = "Titlu";
// // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// mystory.changeGrep();

// app.findTextPreferences = app.changeTextPreferences = NothingEnum.nothing;
// app.findTextPreferences.findWhat = "  ^p"
// app.changeTextPreferences.changeTo = "^p";
// mystory.changeText();







// var mySeldoi = app.activeDocument.selection[0];
// var mySel = app.activeDocument.selection[1]; // merge sel este text frame

// var myParagraphss = mySel.texts[0].paragraphs; // merge
// alert(myParagraphss.length)
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






