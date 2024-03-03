// app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
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
var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
// myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
// var myPages = app.activeDocument.pages
   
 
 
 
 
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

    // var page = app.selection[0].parentStory.parentPage nu merge

    var myPage = page;
	// alert(myPage.name)
	
	myDocument.pages.add(LocationOptions.AFTER, myDocument.pages[(myPage_length-1)] );