app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];

var myDocument = app.documents[0];
var myPage_length = app.documents[0].pages.length
var myPages = app.documents[0].pages





if (app.documents.length == 0) exit();
var doc = app.activeDocument;

var sel = doc.selection; // Save selection
if (sel.length == 0 || (sel[0].constructor.name == "Guide")) {
    alert("Select an object and try again."); exit();
}
// Get selection's parent page
var selObj = sel, page;
for (var i = 0; i < selObj.length; i++) {
    if (selObj[i].parentPage != null) { page = selObj[i].parentPage; break };
    // myPage = app.documents[0].pages.item(i);

}
if (page == null) { alert("Select an object on page and try again."); exit() };

var myPage = page;

var top_margine = myPage.marginPreferences.top;
var left_margine = myPage.marginPreferences.left;
var right_margine = myPage.marginPreferences.right;
var bottom_margine = myPage.marginPreferences.bottom;
// b = myPage.bounds;

pagebounds_top = 0
pagebounds_left = 0
pagebounds_right = 1024
pagebounds_bottom = 600


var sizePg = { width: 600, height: 1024 };
myPage.marginPreferences.properties = { top: 75.295, left: 35.296, bottom: 60.236, right: 35.296 };
// myDocument.documentPreferences.facingPages = false;

// doc.documentPreferences.pageWidth = sizePg.width;
// doc.documentPreferences.pageHeight = sizePg.height;

myPage.layoutRule = LayoutRuleOptions.OFF;
myPage.resize(CoordinateSpaces.SPREAD_COORDINATES,
    AnchorPoint.CENTER_ANCHOR,
    ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
    [pagebounds_bottom, pagebounds_right])


// m_top = 75.295//+"mm"
// m_left = 35.296//+"mm"
// m_right = 35.296
// m_bottom = 60.236
// var myPage = myDocument.pages[0];



// myPage.marginPreferences.properties = { top: 0, left: 0, bottom: 0, right: 0 }; // page margins
// doc.marginPreferences.properties = { top: 0, left: 0, bottom: 0, right: 0 }; // Document margins
// doc.marginPreferences.properties = { top: 75.295, left: 35.296, bottom: 60.236, right: 35.296 };

// myPage.marginPreferences.properties = {
//     top: m_top,
//     left: m_left,
//     right: m_right,
//     bottom: m_bottom
// };




