var myDocument = app.activeDocument;
var mystoryCuprins = app.selection[1].parentStory; // cuprins
var mystorydoiTextMare = app.selection[0].parentStory; // textul mare

var mySelTextMare = app.activeDocument.selection[0]; // text mare
var mySelCuprins = app.activeDocument.selection[1]; // cuprins
var myParagraphsTextMare = mySelTextMare.texts[0].paragraphs;
var myParagraphsCuprins = mySelCuprins.texts[0].paragraphs; // cuprins

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;


CleanText();
FindGrepPref();


 function CleanText()

{
		
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	app.findGrepPreferences.findWhat = "(^ )";
	app.changeGrepPreferences.changeTo =  ""; //\r
	mystorydoiTextMare.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	app.findGrepPreferences.findWhat = "(^ )";
	app.changeGrepPreferences.changeTo =  ""; //\r
	mystorydoiTextMare.changeGrep();
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	app.findGrepPreferences.findWhat = "(^ )";
	app.changeGrepPreferences.changeTo =  ""; //\r
	mystorydoiTextMare.changeGrep();

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	app.findGrepPreferences.findWhat = "(^\\t)";
	app.changeGrepPreferences.changeTo =  ""; //\r
	mystorydoiTextMare.changeGrep();
	
	// var finds = app.activeDocument.findText();
	// if (finds.length > 0) 
	// {
	// 	for (var i = 0; i < finds.length; i++)  
	// 	{  
	// 	  finds[i].contents = "no: " + String(i);
	// 	}  
	// }
	// else
	// {
	// //alert("Nothing has been found");
	// }
			
			//alert(myParagraphsCuprins.length)	
		//app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
		//app.findGrepPreferences.findWhat = "(^ )"; // ########
		//app.findGrepPreferences.justification = Justification.CENTER_ALIGN;
		//app.findGrepPreferences.fontStyle= 'Bold';

		//app.changeGrepPreferences.changeTo =  ""; //\r
		//app.changeGrepPreferences.appliedParagraphStyle = "#Titlu";
		//mystorydoiTextMare.changeGrep();


}


function FindTextPref()

{
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;	
	for (var i = 0; i < myParagraphsTextMare.length; i++) {

		// alert(i)
		// alert(myParagraphss[i].contents)
		
		//Set the find options.
		//app.findTextPreferences.findWhat = "CAPITOLUL";
		app.findChangeTextOptions.caseSensitive = false;
		app.findChangeTextOptions.includeFootnotes = false;
		app.findChangeTextOptions.includeHiddenLayers = false;
		app.findChangeTextOptions.includeLockedLayersForFind = false;
		app.findChangeTextOptions.includeLockedStoriesForFind = false;
		app.findChangeTextOptions.includeMasterPages = false;
		app.findChangeTextOptions.wholeWord = true;
		// app.findTextPreferences.findWhat.pointSize =14;
		//app.findTextPreferences.capitalization = Capitalization.ALL_CAPS; nu toate is all caps TREBUIE CU UPPER CASE
		app.findTextPreferences.pointSize = 16;
		app.findTextPreferences.fontStyle= 'Bold';
		app.findTextPreferences.justification = Justification.CENTER_ALIGN;

		// ;

		// ChangeTextPreference.justification

		// ChangeGrepPreference.justification


		
		app.changeTextPreferences.appliedParagraphStyle = "#Titlu 3";
		mystorydoiTextMare.changeText();



	}
}

function FindGrepPref()

{
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
	var j = 0;	
	for (var i = 0; i < myParagraphsCuprins.length; i++) {
			
		
			var cuvantCuprins = myParagraphsCuprins[i].words[0].contents;
			//alert(myParagraphsCuprins.length)	
		//app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
		app.findGrepPreferences.findWhat = "(^"+ cuvantCuprins+")"; // ########
		app.findGrepPreferences.justification = Justification.CENTER_ALIGN;
		app.findGrepPreferences.fontStyle= 'Bold';

		app.changeGrepPreferences.changeTo =  "$1"; //\r
		app.changeGrepPreferences.appliedParagraphStyle = "#Titlu 3";
		mystorydoiTextMare.changeGrep();

		j++;
		//alert(j)	
		if (j==myParagraphsCuprins.length)
		{
			alertCateschbimari(j);
		}


	}

}

function alertCateschbimari(j){
alert("done.  " +j+" changes made!")
}

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






