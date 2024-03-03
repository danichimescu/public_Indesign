app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];

// var myDocument = app.documents[0];
// var myPage_length = app.documents[0].pages.length
// var myPages = app.documents[0].pages
var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages

var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;

var anchor = AnchorPoint.CENTER_ANCHOR;
var obj = app.activeDocument.selection[0];
var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
var oh = obj.geometricBounds[2] - obj.geometricBounds[0];

// var pw =(oh*0.1)/oh; // oh * x =  0.1*oh, x = 
// var ph = (ow*0.1)/ow;
var pw = 0.9;
var ph = 0.9;
var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);



// links = app.documents[0].links.everyItem().getElements();

// for (i = 0; i < links.length; i++) {

//   links.parent.parent.fit (FitOptions.CONTENT_TO_FRAME);

// }