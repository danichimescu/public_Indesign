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
// var myFileName_full = app.activeDocument.fullName + "";
var myFileName = app.activeDocument.name + "";

// var myFileName_full_length = myFileName_full.length
// var myFileName_length = myFileName.length
// var length_descazut = myFileName_full_length - myFileName_length



var finalFileName = myFileName.replace(".indd", "");


var savedocname = myFile_calea + "/" + finalFileName +"_pdf"+ "_.indd";
// var savedoc = myDocument.save(File(myFile_calea + savedocname));
 myDocument.save(File(savedocname));
// savedoc.close(SaveOptions.no);
