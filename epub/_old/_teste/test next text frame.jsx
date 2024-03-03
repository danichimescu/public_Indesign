// app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
// app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

// app.scriptPreferences.enableRedraw = false;
// app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// // app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// // app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.enableRedraw = false;

// app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
// app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// // var myPage = myDocument.pages[0];

// // var myDocument = app.documents[0];
// // var myPage_length = app.documents[0].pages.length
// // var myPages = app.documents[0].pages
// var myDocument = app.activeDocument;
// var myPage_length = app.activeDocument.pages.length
// var myPages = app.activeDocument.pages

// var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
// var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
// var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
// app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
// app.activeDocument.zeroPoint = [0, 0];
// myPage = app.activeWindow.activePage;


// merge !!!
var doc = app.activeDocument;


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
var sel = doc.selection;
var firstTextFrame = sel[0];
var myTextFrame_Link = myPage.textFrames.add
    (
        // { geometricBounds: [15, 80, 20, 95], contents: "########" }
        { geometricBounds: [15, 80, 200, 905]}
    );
    myTextFrame_Link.name = "myTextFrame_Link"

var secondTextFrame = myTextFrame_Link;

firstTextFrame.nextTextFrame = secondTextFrame;
// alert(myPage.name)
var nextPageon =Number(myPage.name)+1

// var nxtPg = app.activeDocument.pages[1]; // merge asa
var nextPageontomove =nextPageon-1 
var nxtPg = app.activeDocument.pages[nextPageontomove]; // merge
// alert(nextPageon)
secondTextFrame.move(nxtPg);


///// fit to margins ************************
b_pgebounds = myPage.bounds;

var m_left = myPage.marginPreferences.left; //mmyX2
var m_right = myPage.marginPreferences.right; //mmyX1
var m_top = myPage.marginPreferences.top; //mmyy2
var m_bottom = myPage.marginPreferences.bottom; //mmyy1

Wp = b_pgebounds[3] - b_pgebounds[1];
Hp = b_pgebounds[2] - b_pgebounds[0];

// var obj = app.selection[0];
// var obj = myDocument.textFrames.itemByName("image_text");
var obj = secondTextFrame
var myBounds1 = obj.geometricBounds;
var Y1 = myBounds1[0];
var X1 = myBounds1[1];
var Y2 = myBounds1[2];
var X2 = myBounds1[3];

obj.geometricBounds = [m_top, m_left, Hp - m_bottom, Wp - m_right];

obj.move([m_left, m_top])
// app.documents[0].align(myHWai, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
doc.align(obj, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
doc.align(obj, AlignOptions.VERTICAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);

///// fit to margins ************************end




// var nxtPg = app.activeDocument.pages[1];

// dupObj.move(nxtPg);

// move(newLayer);
// merge !!!




// //// Assuming Every Page has only one main textFrame ---

// var myDoc = app.documents[0];

// var allPages = myDoc.pages;

// var currentFrame = allPages[0].textFrames[0];

// for(var i = 1; i < allPages.length; i++){

//     currentFrame.nextTextFrame = allPages.textFrames[i];

//     currentFrame = allPages.textFrames[i];

//     }

 

// // Best

// // Sunil