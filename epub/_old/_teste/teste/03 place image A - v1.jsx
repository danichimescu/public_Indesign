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
// selObj[0].name = "image_text";
selObj[1].name = "textdesters";
selObj[2].name = "image_text";

app.select(selObj[0])


app.cut();

app.select(selObj[1].insertionPoints[0]);

app.paste();
app.selection[0].insertionPoints[0].contents = " \r";
selObj[1].parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
selObj[1].fit(FitOptions.FRAME_TO_CONTENT)



app.menuActions.item("$ID/Select &All").invoke();
app.cut();


var myFrames = myDocument.textFrames;
// itemByName("Name")
myDocument.textFrames.itemByName("textdesters").remove()



app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "##";
app.changeGrepPreferences.changeTo = "\r\~c\r";

myDocument.textFrames.itemByName("image_text").changeGrep();
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
myDocument.textFrames.itemByName("image_text").name = "text_corp_"+myPage.name;



