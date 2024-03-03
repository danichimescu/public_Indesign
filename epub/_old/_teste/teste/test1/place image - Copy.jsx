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



app.select(selObj[0].content);
app.cut();
app.delete(selObj[0]);


// group.anchoredObjectSettings.insertAnchoredObject(myElement.xmlElements[x].inser‌​tionPoints[-1]); 
