var myDocument = app.activeDocument;

// myNote = app.selection[0];
// myNote.texts[0].contents = "  ##";
// app.menuActions.itemByID(278).invoke(); // deselect all

var myDocument = app.activeDocument;
var selObj = myDocument.selection;

// var myDocument = app.active.document;
// replace_unu();

// function replace_unu() {

//     // selObj[0].changeGrep();// ok 
//     app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
//     app.findGrepPreferences.findWhat = "\r";
//     app.changeGrepPreferences.changeTo = "\n";

//     for (var i = 0; i < selObj.length; i++) {
//         selObj[i].changeGrep();

//     }
//     // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
//     // app.findGrepPreferences.findWhat = "\n";
//     // app.changeGrepPreferences.changeTo = "\~M";
// // alert("repl1")
// }
// var selObj = myDocument.selection;
var selObj = app.selection[0];

// selObj.insertionPoints.lastItem().contents = SpecialCharacters.pageBreak;
selObj.insertionPoints.lastItem().contents = SpecialCharacters.columnBreak;

// selObj.texts[0].insertionPoints[-1].contents = "\^M"; // ~M - pt grep
// app.selection[0].insertionPoints[-1].contents = " \n\r";

var selectedItem = app.activeDocument.selection[0];

if (selectedItem instanceof InsertionPoint &&
    selectedItem.parentTextFrames[0] instanceof TextFrame) {

    var textFrame = selectedItem.parentTextFrames[0];

    // This just demonstrates that the variable `textFrame` does
    // hold a reference to the actual text frame - let's delete it !
    // textFrame.remove();
    app.select(textFrame)

} else {
    // alert("The cursor has not been placed in a text frame");
}