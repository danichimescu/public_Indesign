var myDocument = app.activeDocument;
// var selObj = myDocument.selection;

var keyInc = app.activeDocument.viewPreferences.cursorKeyIncrement; // read
// app.activeDocument.viewPreferences.cursorKeyIncrement = 1;
app.activeDocument.textPreferences.leadingKeyIncrement = 1;
// startParagraph = StartParagraph.anywhere;