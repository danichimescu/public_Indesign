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




// var main = function() {







// myNote = app.selection[0];
// myNote.texts[0].contents = "####";
// app.menuActions.itemByID(278).invoke(); // deselect all

// app.menuActions.item("$ID/Select &All").invoke();

var selectedItem = app.activeDocument.selection[0];
var wholeTextOneItem = selectedItem.createOutlines(true)

// var wholeTextOneItem = selectedItem.textPaths[0].texts[0].createOutlines(false)



// }
// var u;

// app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );