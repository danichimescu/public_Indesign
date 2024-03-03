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


// if (app.documents.length == 0) exit();
// var doc = app.activeDocument;

// var sel = doc.selection; // Save selection
// if (sel.length == 0 || (sel[0].constructor.name == "Guide")) {
//     alert("Select an object and try again."); exit();
// }
// // Get selection's parent page
// var selObj = sel, page;
// for (var i = 0; i < selObj.length; i++) {
//     if (selObj[i].parentPage != null) { page = selObj[i].parentPage; break };
//     // myPage = app.documents[0].pages.item(i);

// }
// if (page == null) { alert("Select an object on page and try again."); exit() };
// var myPage = page;




// app.select(selObj[0])
// app.select(selObj[0].insertionPoints[0]);
// app.select(selObj[0].insertionPoints[0]).contents = "myNewText"


// myNote = app.selection[0].notes.add();

// myNote.texts[0].contents = "Hello World!";


// var page = app.selection[0].parentStory.parentPage

// textFrames.parentStory.insertionPoints.item(0)
// ScriptUI.environment.keyboardState.keyName != "Escape"
var story = app.selection[0];
// var myTextst = story.parentTextFrame
alert(story)
// page = story.parentPage
// var doc = app.activeDocument;
// var sel = doc.selection;
// var selObj = sel, page;

// page = selObj[0].parentPage
// alert(page.name)

// var myPage = app.activeWindow.activePage;

// if(myPage.side == PageSideOptions.leftHand){
//    alert("left")
//     }
//     else{
//     alert("wright")
//     }



// //**** merge */
// myNote = app.selection[0];
// myNote.texts[0].contents = "  ##";
// app.menuActions.itemByID(278).invoke();
// app.menuActions.item("$ID/Select &All").invoke();

// //****stop merge */