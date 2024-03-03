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




app.select(selObj[0])


app.cut();

// var text_frame = app.select(selObj[1])
// // app.selection[0].contents = "inserted text"

// // text_frame.insertionPoints[0]

// var insertRef = text_frame.insertionPoints[-1];
// insertRef.spaceBefore = topInset;
// insertRef.leftIndent = leftInset;

// // var eFrame = insertRef.textFrames.add();
// var eFrame = insertRef.app.paste();
// // app.paste(); //274

// app.select(selObj[1].insertionPoints[0]);
app.select(selObj[1].insertionPoints[0]);

app.paste();

// selObj[1].parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
selObj[1].fit(FitOptions.FRAME_TO_CONTENT)


// group.anchoredObjectSettings.insertAnchoredObject(myElement.xmlElements[x].inser‌​tionPoints[-1]); 
