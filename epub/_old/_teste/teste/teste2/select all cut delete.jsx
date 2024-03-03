app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];

// var myDocument = app.documents[0];
var myDocument = app.activeDocument;
var myPage_length = app.documents[0].pages.length
var myPages = app.documents[0].pages



app.menuActions.item("$ID/Select &All").invoke();
app.cut();




// alert(string)

// app.escape();// nu merge
// app.select(parent.textframe)

// app.menuActions.item("$ID/Select &All").invoke();
// var mySelection = app.selection[0];

// var myStory = mySelection.hasOwnProperty("storyOffset") ? mySelection.storyOffset.parentStory : mySelection.insertionPoints[0].parentStory;
// var mytextdesters = mySelection.insertionPoints[0].parentStory

// var mytextdesters = mySelection.insertionPoints[0].parentTextFrame



var myFrames = myDocument.textFrames;

//***-****** aliniere margini = vizibil



for (var i = 0; i < myFrames.length; i++) {
    // alert ("xxxmatch");
    if (myFrames[i].label == "text_info") {
        alert ("match"); // you changes here  
       
        myFrames[i].remove()

    }
}





