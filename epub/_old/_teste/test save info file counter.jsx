app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];
var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages

var myFile_calea = app.activeDocument.filePath;
// alert("calea e "+myFile_calea)	
var myFileName_full = app.activeDocument.fullName + "";
var myFileName = app.activeDocument.name + "";

var myFileName_full_length = myFileName_full.length
var myFileName_length = myFileName.length
var length_descazut = myFileName_full_length - myFileName_length




var date = new Date();
var year = new String((date.getYear())-100);
var dateString = date.getDate()+ "-" + (date.getMonth() + 1)  + "-" + year + "  ora: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateString_ziua = ""+date.getDate()+ "_" + (date.getMonth() + 1)  + "_" + year;
	
// alert("data e: "+dateString)

var message = ""+myFileName+" -- GRESIT"+"\r"+"\r";
message += "Top margine - "+vardimensiuneagresita_top+" | Left margine - "+vardimensiuneagresita_left+" | W - "+vardimensiuneagresita_w+" | H - "+vardimensiuneagresita_h+"\r";
message += "\r";





// var path = '~/Desktop/';
var path = myFile_calea; 
// var path =  '~/Desktop/script/lucru/test'; 
		    //"~/Desktop/script/lucru/test"
var filename = "test_vizibil_si_total_"+dateString_ziua+"_"+".txt"; // merge!
// var filename = "test_vizibil_si_total_.txt";

// alert("filename: "+filename)

//Create File object
var file = new File(path +"/"+filename);

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
file.write(message+ "\r");
file.close();

