// app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;


(function () {
// var main = function () {
// app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

// app.scriptPreferences.enableRedraw = false;
// app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.enableRedraw = false;

// app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
// app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];
// var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
// var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
// var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
// app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
// app.activeDocument.zeroPoint = [0, 0];
// myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
// var myPage_length = app.activeDocument.pages.length
// var myPages = app.activeDocument.pages


var myFile_calea = app.activeDocument.filePath.fsName;
// alert(myFile_calea)
// alert("calea e "+myFile_calea)	
// var myFileName_full = app.activeDocument.fullName + "";
var myFileName = app.activeDocument.name;
// var myFileName_full_length = myFileName_full.length
// var myFileName_length = myFileName.length
// var length_descazut = myFileName_full_length - myFileName_length



// var finalFileName = myFileName.replace(".indd", "");
// try {
// 	var finalFileName = finalFileName.replace("_pdf_", "");
// } catch (e) { alert(e) }
// alert(finalFileName)

// var savedocname = myFile_calea + "/" + finalFileName + "_epub" + "_.indd";

var varNrPoze = myDocument.allGraphics.length;


if (app.documents.length > 0) {
	var ad = app.activeDocument;
	var tf = ad.textFrames;
	var tflg = tf.length;
	if (tflg > 0) {
		var wcount = 0;
		var chcount = 0;
		var pcount = 0;

		for (i = 0; i < tflg; i++) {
			var p = tf[i].paragraphs;
			for (l = 0; l < p.length; l++) {
				pcount += 1;
				// wcount += p[l].words.length;
				chcount += p[l].characters.length;
			}
		}

		// alert("Your document has:" + "\r"
		// 	+ "- " + tflg + " text frames" + "\r"
		// 	+ "- " + pcount + " paragraphs" + "\r"
		// 	+ "- " + wcount + " words" + "\r"
		// 	+ "- " + chcount + " characters (including spaces)" + "\r"
		// 	+ "- " + (chcount - spaced()) + " characters (not including spaces)", "Text Counter Script");
	}
}

// function spaced() {
// 	app.findGrepPreferences = app.changeGrepPreferences = null;
// 	app.findGrepPreferences.findWhat = "\s";
// 	return app.activeDocument.findGrep().length;
// }

// var chcount =3
var varpretCaractere = (Number(chcount)/2000)*0.17;
var varpretPoze = Number(varNrPoze)*0.75;
var varpretTotal = Number(varpretPoze)+Number(varpretCaractere);

var date = new Date();
var year = new String((date.getYear()) - 100);
var dateString = date.getDate() + "-" + (date.getMonth() + 1) + "-" + year + "  ora: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateString_ziua = "" + date.getDate() + "_" + (date.getMonth() + 1) + "_" + year;

// alert("data e: "+dateString)

var message = "Nume fisier " + "\t"+ myFileName +  "\t";
message += "Numar caractere " +"\t"+ chcount +"\t"+ " Numar poze "+  "\t" + varNrPoze+"\t" + " pret caractere la pagini " +  "\t"
+ varpretCaractere +  "\t" + " pret la poze " +  "\t"+ varpretPoze +   "\t"+ " pret total " +  "\t"+ varpretTotal ;//+  "\r"
// message += "\r";





// var path = '~/Desktop/';
var path = myFile_calea;
// var path =  '~/Desktop/script/lucru/test'; 
//"~/Desktop/script/lucru/test"
var filename = "Pret total " + dateString_ziua + "_" + ".txt"; // merge!
// var filename = "test_vizibil_si_total_.txt";

// alert("filename: "+filename)

//Create File object
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

// alert(message)
}());

alert("done")

// }
// var u;

// app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");