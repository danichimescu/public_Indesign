mDoc = app.documents[0];

var selectedItem_0_InsertionPoint = app.activeDocument.selection[0];
var textFramefromSelection = selectedItem_0_InsertionPoint.parentTextFrames[0];


// var main = function () {




if (selectedItem_0_InsertionPoint instanceof InsertionPoint &&
    selectedItem_0_InsertionPoint.parentTextFrames[0] instanceof TextFrame) {

    var textFrame = selectedItem_0_InsertionPoint.parentTextFrames[0];


    textFrame.name = "image_text";


    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "(.+)"; // ########
    app.findGrepPreferences.appliedParagraphStyle = "Titlu";
    app.changeGrepPreferences.changeTo = "$1_###"; //\r
    // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    // app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1));
    // app.select(selectedItem_0_InsertionPoint)
    textFrame.parentStory.changeGrep();
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;

    app.menuActions.item("$ID/Select &All").invoke();
    // appliedParagraphStyle = "Corp";

    // app.selection[0].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Corp");


}


    // }
    // var u;

    // app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");