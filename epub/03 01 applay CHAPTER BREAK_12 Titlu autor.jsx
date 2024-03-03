var myDocument = app.activeDocument;
// var selObj = myDocument.selection;
var main = function () {

    var selObj = app.selection[0];
    // var main = function () {
    // var myDocument = app.active.document;

    var myPara = selObj.parentStory.paragraphs; // 
    for (var i = 0; i < myPara.length; i++) {
        // selObj[i].changeGrep();

        myPara[i].startParagraph = StartParagraph.ANYWHERE;
    }
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
    var mySoureParagraph = selObj.parentStory.paragraphs.item(0);
    mySoureParagraph.pointSize = 12;

    // ^.+?\Z // = the last parapgraph of story

    // selObj.insertionPoints.lastItem().contents = SpecialCharacters.pageBreak;
    // selObj.insertionPoints.lastItem().contents = SpecialCharacters.columnBreak; // merge
    // selObj.insertionPoints.lastItem().contents = ("\r\r"); 
    // selObj.parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // 
    //    selObj.parentStory.paragraphs[0].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // merge

  //  app.selection[0].parentStory.paragraphs[-1] 
    // selObj.parentStory.paragraphs.lastItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // MERGE
    selObj.parentStory.paragraphs[-2].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // MERGE
    selObj.fit(FitOptions.FRAME_TO_CONTENT)

    app.menuActions.itemByID(118822).invoke();


}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");