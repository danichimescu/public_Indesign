var myDocument = app.activeDocument;
// var selObj = myDocument.selection;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;
// var myPage = myDocument.pages[0];
var myPage = app.activeWindow.activePage;
var myPage_n = app.activeWindow.activePage.name;
// alert(myPage_n)
//var guides = myDocument.guides;
// app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

var main = function () {
var selObj = app.selection[0];  

var myPara = selObj.parentStory.paragraphs; // 
for (var i = 0; i < myPara.length; i++) {
    // selObj[i].changeGrep();

    myPara[i].startParagraph = StartParagraph.ANYWHERE;
}


selObj.name = "textframe_work"
selObj.parentStory.paragraphs[1].words[0].createOutlines(true) // mergeeee
// var myDocument = app.active.document;
replace_unu();
// replace_doi();
function replace_unu() {

    // selObj[0].changeGrep();// ok 
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "\r";
    app.changeGrepPreferences.changeTo = "\n";
    selObj.changeGrep();
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    // for (var i = 0; i < selObj.length; i++) {
    //     selObj[i].changeGrep();

    // }
// alert("repl1")
}
selObj.fit(FitOptions.FRAME_TO_CONTENT)

selObj.insertionPoints.lastItem().contents = ("\r\r\r"); 
selObj.fit(FitOptions.FRAME_TO_CONTENT)
// var mySoureParagraph = selObj.parentStory.paragraphs.item(0);
// mySoureParagraph.pointSize = 9;

// ^.+?\Z // = the last parapgraph of story

// selObj.insertionPoints.lastItem().contents = SpecialCharacters.pageBreak;
// selObj.insertionPoints.lastItem().contents = SpecialCharacters.columnBreak; // merge
// selObj.insertionPoints.lastItem().contents = ("\r\r"); 
// selObj.parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // 
//    selObj.parentStory.paragraphs[0].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // merge


selObj.parentStory.paragraphs.lastItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // MERGE
selObj.fit(FitOptions.FRAME_TO_CONTENT)


// selObj.parentStory.paragraphs.lastItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // MERGE
// found[0].texts[0].paragraphs[0].insertionPoints.itemByRange(0, -2).select();

// var selectedItem = selObj.parentStory.paragraphs[1].insertionPoints.itemByRange(0, -2).select();
//  //app.activeDocument.selection[0];
// var wholeTextOneItem = selectedItem.createOutlines(true)

// exit()
app.select(myDocument.textFrames.itemByName("textframe_work"))
// app.select(textFramebyName("textframe_work"));

if (app.documents.length == 0) exit();
var doc = app.activeDocument;

var sel = doc.selection; // Save selection
if (sel.length == 0 || (sel[0].constructor.name == "Guide")) {
    alert("Select an object and try again."); exit();
}
// Get selection's parent page
var selObj = sel, page_set;
for (var i = 0; i < selObj.length; i++) {
    if (selObj[i].parentPage != null) { page_set = selObj[i].parentPage; break };
    // myPage = app.documents[0].pages.item(i);

}
if (page_set == null) { alert("Select an object on page and try again."); exit() };

var myPage = page_set;
b_pgebounds = myPage.bounds;

var m_left = myPage.marginPreferences.left; //mmyX2
var m_right = myPage.marginPreferences.right; //mmyX1
var m_top = myPage.marginPreferences.top; //mmyy2
var m_bottom = myPage.marginPreferences.bottom; //mmyy1

Wp = b_pgebounds[3] - b_pgebounds[1];
Hp = b_pgebounds[2] - b_pgebounds[0];

    var obj = app.selection[0];

    var myBounds1 = obj.geometricBounds;
    var Y1 = myBounds1[0];
    var X1 = myBounds1[1];
    var Y2 = myBounds1[2];
    var X2 = myBounds1[3];
    
    obj.geometricBounds = [m_top, m_left, Hp - m_bottom, Wp - m_right];

    obj.move([m_left, m_top])
    // app.documents[0].align(myHWai, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
    myDocument.align(obj, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
    myDocument.align(obj, AlignOptions.VERTICAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);






app.menuActions.itemByID(118822).invoke();



}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");