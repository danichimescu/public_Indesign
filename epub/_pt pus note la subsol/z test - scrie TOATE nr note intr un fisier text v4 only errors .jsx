app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
// var story_cunote = app.selection[0].parentStory;

var myFile_calea = app.activeDocument.filePath.fsName;
// alert("calea e "+myFile_calea)	
var myFileName_full = app.activeDocument.fullName + "";
var myFileName = app.activeDocument.name + "";

var myFileName_full_length = myFileName_full.length
var myFileName_length = myFileName.length


// fnd [i].parentTextFrames[0].parentPage.name

var story_cunote = app.selection[0].parentStory;
alert("Index story cu note " + story_cunote.index)
var indexMystory_cunote = story_cunote.index
// story_cunote.index = 0 // nu se poate
var stories_document = myDocument.stories;
alert("stories_document " + stories_document.length)

var toate_stories = new Array; // fara story 0 
for (a = 0; a < stories_document.length; a++) { // 0 este story cu note

	if (stories_document[a].index != indexMystory_cunote) {
		// alert(a)
		toate_stories.push(stories_document[a]);
	}
}



app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.position = Position.SUPERSCRIPT
app.findGrepPreferences.findWhat = "\\d+";
var found = story_cunote.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;

var maxCounter_note = (found.length) // cand NU sunt in acelasi story si notele
alert("nr notele " + maxCounter_note)
var myCounter_note = 1;

var ceagasit_inMainStory = new Array;
var PAG_ceagasit_inMainStory = new Array;
var ceagasit_inAlteStory = new Array;
var currPara_inMainStory = new Array;
var currPara_inAlteStory = new Array;

var error_var = new Array;
var error_var2 = new Array;
var error_var3 = new Array;

for (i = 0; i < maxCounter_note; i++) { // CAUTA NOTE IN STORY 0


	ceagasit_inMainStory.push(found[i].contents)
	PAG_ceagasit_inMainStory.push(found[i].parentTextFrames[0].parentPage.name)
	// currPara_inMainStory.push(found[i].texts[0].paragraphs[0].contents)
	// fnd [i].parentTextFrames[0].parentPage.name



}
// tz=1+""
for (i = 0; i < maxCounter_note; i++) {
	var tz=i+1+""
	// alert(tz)
	if (tz != ceagasit_inMainStory[i]) {

		error_var.push(ceagasit_inMainStory[i])
	}
	else {

		error_var.push(ceagasit_inMainStory[i]+"_ok")
	}
}




for (c = 0; c < toate_stories.length; c++) {
	app.findGrepPreferences = app.changeGrepPreferences = null;
	app.findGrepPreferences.position = Position.SUPERSCRIPT
	app.findGrepPreferences.findWhat = "\\d+"; //^
	// var found = story_cunote.findGrep();
	var found_nr_nota_in_celelaltestory = toate_stories[c].findGrep();
	app.findGrepPreferences = app.changeGrepPreferences = null;

	


	for (d = 0; d < maxCounter_note; d++) {

		if (found_nr_nota_in_celelaltestory[d] != undefined) { /// alert("undefined") undefined

			ceagasit_inAlteStory.push(found_nr_nota_in_celelaltestory[d].contents)
			// currPara_inAlteStory.push(found_nr_nota_in_celelaltestory[d].texts[0].paragraphs[0].contents)
		}
		// else {
		// alert("undefined")
		// }


	}
}


for (i = 0; i < maxCounter_note; i++) {
	var tzz=i+1+""
	// alert(tz)
	if (tzz != ceagasit_inAlteStory[i]) {

		error_var2.push(ceagasit_inAlteStory[i])
	}
	else {

		error_var2.push(ceagasit_inAlteStory[i]+"_ok")
	}
}


// var points = [40, 100, 1, 5, 25, 10];
// points.sort(function(a, b){return a-b});
// ceagasit_inAlteStory.sort();


if (ceagasit_inMainStory.length == ceagasit_inAlteStory.length) {
	var variabilaNoteTotal = ceagasit_inMainStory.length
}
if (ceagasit_inMainStory.length > ceagasit_inAlteStory.length) {
	var variabilaNoteTotal = ceagasit_inMainStory.length
} else {
	var variabilaNoteTotal = ceagasit_inAlteStory.length
}

for (b = 0; b < variabilaNoteTotal; b++) {

	// currPara = found[i].texts[0].paragraphs[0].contents;


	try {
		// var message = (b + 1) + " Main_ " + ceagasit_inMainStory[b] + " Celelalte_  " + ceagasit_inAlteStory[b] + " ParaMain_" + currPara_inMainStory[b]
		// + " ParaCelelalte_ " + currPara_inAlteStory[b] + "\r";

		var message = (b + 1) + "  Nr-nota-Main _ " + ceagasit_inMainStory[b] + "_ error-var _ "+error_var[b]+"_ pag _" + PAG_ceagasit_inMainStory[b] +
		 "  Nr-nota-in-Celelalte _  " + ceagasit_inAlteStory[b]+ "_ error-var2 _"+error_var2[b];

		//ok1
		// var message = (b + 1) + "  Nr-nota-Main_ " + ceagasit_inMainStory[b] + " pag "+ PAG_ceagasit_inMainStory[b]+"  Nr-nota-in-Celelalte_  " + ceagasit_inAlteStory[b];


		// var message = (b + 1) + " Main_ " + ceagasit_inMainStory[b] + " Celelalte_  " + ceagasit_inAlteStory[b] + " ParaMain_" + currPara_inMainStory[b];

		var path = myFile_calea;
		var filename = myFileName + "_test_notele_" + ".txt"; // merge!
		var file = new File(path + "/" + filename);
		// alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)
		file.encoding = 'UTF-8';

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		}
		else {
			file.open("w");
		}
		// file.open('w');
		file.write(message + "\r");
		file.close();

	} catch (e) {
		alert(e + "\r" + " Ceva in neregula la " + b)
	}
}


ceagasit_inAlteStory.sort(function(a, b){return a-b});
// error_var2.sort(function(a, b){return a-b});


for (b = 0; b < variabilaNoteTotal; b++) {

var tzzz=b+1+""
// alert(tz)
if (tzzz != ceagasit_inAlteStory[b]) {

	error_var3.push(ceagasit_inAlteStory[b])
}
else {

	error_var3.push("_ok")
}

	
	try {
		

		var message2 = (b + 1) + " _Nr-nota-in-Celelalte _  " + ceagasit_inAlteStory[b]+ "_ error-var2 _"+error_var3[b];

		//ok1
		// var message = (b + 1) + "  Nr-nota-Main_ " + ceagasit_inMainStory[b] + " pag "+ PAG_ceagasit_inMainStory[b]+"  Nr-nota-in-Celelalte_  " + ceagasit_inAlteStory[b];

		var path = myFile_calea;
		var filename = myFileName+"_CeagasitInAlteStorySort_" + "_test_notele_" + ".txt"; // merge!
		var file = new File(path + "/" + filename);
		file.encoding = 'UTF-8';

		if (file.exists) {
			file.open("e");
			file.seek(0, 2);
		}
		else {
			file.open("w");
		}
		// file.open('w');
		file.write(message2 + "\r");
		file.close();

	} catch (e) {
		alert(e + "\r" + " Ceva in neregula la " + b)
	}
}

