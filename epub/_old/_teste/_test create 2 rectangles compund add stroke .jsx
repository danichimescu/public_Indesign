app.scriptPreferences.measurementUnit = MeasurementUnits.millimeters;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;

var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages
var bleed = {
	top: myDocument.documentPreferences.properties.documentBleedTopOffset,
	left: myDocument.documentPreferences.properties.documentBleedInsideOrLeftOffset,
	bottom: myDocument.documentPreferences.properties.documentBleedBottomOffset,
	right: myDocument.documentPreferences.properties.documentBleedOutsideOrRightOffset
}
// alert(bleed.top)

b_pgebounds = myPage.bounds;

var m_left = myPage.marginPreferences.left; //mmyX2
var m_right = myPage.marginPreferences.right; //mmyX1
var m_top = myPage.marginPreferences.top; //mmyy2
var m_bottom = myPage.marginPreferences.bottom; //mmyy1

Wp = b_pgebounds[3] - b_pgebounds[1];
Hp = b_pgebounds[2] - b_pgebounds[0];

stroke_rama = (Hp - m_bottom) * 0.025 // dimensiunea la stroke, poate sa fie si stroke_rama = 10

app.documents[0].activeLayer = app.documents[0].layers.itemByName("RAMA"); // active layer

myRectangle_margins = myPage.rectangles.add({ geometricBounds: [m_top, m_left, Hp - m_bottom, Wp - m_right] });
myRectangle_page = myPage.rectangles.add({ geometricBounds: [-bleed.top, -bleed.left, Hp + bleed.bottom, Wp + bleed.right] });

strokeColor = myDocument.swatches.item("Rama"); // culoarea rama

myRectangle_margins.strokeColor = strokeColor;
myRectangle_margins.strokeWeight = stroke_rama;
myRectangle_margins.fillColor = strokeColor;
myRectangle_page.strokeColor = strokeColor;
myRectangle_page.strokeWeight = stroke_rama;
myRectangle_page.fillColor = strokeColor;


myRectangle_margins.makeCompoundPath(myRectangle_page);





// }
// var u;

// app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");