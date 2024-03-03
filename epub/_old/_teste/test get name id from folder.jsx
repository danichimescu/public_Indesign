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


var myFile_ID= app.documents[0].filePath.fsName;
// var myFile_calea = myFile_calea.match(/\d\d\d/g);
var myFile_ID = myFile_ID.match(/\d\d\d/);
var myFile_ID =Number(myFile_ID);
// var myFile_calea = myFile_calea+"" // il faci string // ok
// var myFile_calea = Number((myFile_calea+myFile_calea)/2)
// var myFile_calea = myFile_calea.replace("0", "##");
// var myFile_calea = myFile_calea.replace(/\./g, "_");
// var myFile_calea = myFile_calea.replace(/0+(\d)/, /$1/); // ok
// var myFile_calea = myFile_calea.replace(/\//g, ""); // ok
// var myFile_calea = myFile_calea.match(/\d\d\d+/g);



alert("myFileNameInfo  "+myFile_ID);


// var myFileName_full = app.documents[0].fullName + "";
// var myFileName = app.documents[0].name + "";
// var myFileNameInfo = "pt export csv";

// var myIdnumber = myFileName.substr(0, myFileName.lastIndexOf("."));

// var matches_nr_bleed = myFileName0.match(/\+\d+/g);
// var matches_nr_dimensiuni = matches_nr_dimensiuni.replace(/\./g, "");

// var definitionsFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
// alert("myIdnumber  "+myIdnumber);

// var infoFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
