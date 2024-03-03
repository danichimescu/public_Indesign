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



var titluri_decautat = new Array;

// functie_titluri(titluri_decautat, myParagraphss)

// function functie_titluri(titluri_decautat, myParagraphss) {
// alert("dafjalskj")
// var myRatia = [];
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
	// app.findTextPreferences.position = Position.SUPERSCRIPT


	if (myParagraphss[i].words[2].isValid) {

		// cauta 3 cuvinte
		// catecuvinte = "3cuvinte"
		titluL_decautat = myParagraphss[i].words[0].contents + " " + myParagraphss[i].words[1].contents + " " + myParagraphss[i].words[2].contents
		titluri_decautat.push(titluL_decautat);
	}

	else if (myParagraphss[i].words[1].isValid) {

		// cauta 2 cuvinte
		titluL_decautat = myParagraphss[i].words[0].contents + " " + myParagraphss[i].words[1].contents
		titluri_decautat.push(titluL_decautat);
	} else {

		// cauta 1 cuvint
		// alert(i)
		titluL_decautat = myParagraphss[i].words[0].contents
		titluri_decautat.push(titluL_decautat);
	}


	// switch (catecuvinte) {
	// 	case "3cuvinte":
	// 		titluL_decautat = myParagraphss[i].words[0].contents + " " + myParagraphss[i].words[1].contents + " " + myParagraphss[i].words[2].contents
	// 		break;

}



// return myRatia;

// }


// alert(titluri_decautat[0] + " \r " + titluri_decautat[1] + "\r " + titluri_decautat[2] + " \r" + titluri_decautat[3] + "\r " + titluri_decautat[4] + "\r ")


for (var t = 0; t < titluri_decautat.length; t++) {


	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	app.findGrepPreferences.findWhat = "^"+titluri_decautat[t];


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
	// app.findTextPreferences.position = Position.SUPERSCRIPT


	app.findTextPreferences.findWhat = titluri_decautat[t]



	// app.findTextPreferences.findWhat = myParagraphss[i].contents
	// app.changeTextPreferences.changeTo = myParagraphss[i].contents;
	// var finds = mystorydoi.findText();
	// var myParagraphs_gasit = finds[0].paragraphs.item(0) //finds[0].paragraphs.item(0) = asta merge
	// alert("Found " + myParagraphs_gasit.words.length)

	// if (myParagraphs_gasit.words.length < 10) { // something has been found
	// 	// alert("Found " + myParagraphs_gasit.words.length);// myParagraphss[i].words[0] //+ " items, the first of them is on page " + finds[0].parentParagraphs[0]

	// 	app.changeTextPreferences.appliedParagraphStyle = "Titlu 3";
	// 	mystorydoi.changeText();

	// }
	// else { // found nothing
	// 	// alert("Nothing has been found");
	// }

	var finds = mystorydoi.findGrep(); //mystorydoi.findText();
	// alert("de cate ori a gasit " + finds.length)

	for (var j = 0; j < finds.length; j++) {


		// alert("a gasit cuvinte in nr de " + finds[i].paragraphs[0].words.length);

		var numar_cuvinte = finds[j].paragraphs[0].words.length
		// alert("numar_cuvinte " + numar_cuvinte)
		// alert("finds " + j + " " + finds[j])
		if (numar_cuvinte < 10) {

			
			// app.changeTextPreferences.appliedParagraphStyle = "Titlu";
			app.changeGrepPreferences.appliedParagraphStyle = "Titlu 2";
			finds[j].changeGrep();
			// finds[j].changeText();
		}
	}


}
