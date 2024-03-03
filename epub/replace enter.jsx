var myDocument = app.activeDocument;
var selObj = myDocument.selection;

// var myDocument = app.active.document;
replace_unu();
// replace_doi();
function replace_unu() {

    // selObj[0].changeGrep();// ok 
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "\r";
    app.changeGrepPreferences.changeTo = "\r\n";

    for (var i = 0; i < selObj.length; i++) {
        selObj[i].changeGrep();

    }
// alert("repl1")
}
var selObj = app.selection[0];

// selObj.insertionPoints.lastItem().contents = SpecialCharacters.pageBreak;
selObj.insertionPoints.lastItem().contents = SpecialCharacters.columnBreak;
// function replace_doi() {
//     app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
//     app.findGrepPreferences.findWhat = "\n\z";
//     app.changeGrepPreferences.changeTo = "\r";

//     for (var i = 0; i < selObj.length; i++) {
//         selObj[i].changeGrep();
//     }
//     // alert("repl2")
// }
