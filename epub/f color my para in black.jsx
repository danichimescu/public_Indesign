var myparag = app.selection[0].paragraphs.item(0)
// alert(myparag.appliedParagraphStyle.name)
var myParagRafName = myparag.appliedParagraphStyle.name
alert(myParagRafName)

// app.documents[0].paragraphStyles.itemByName(myParagRafName).styleExportTagMaps.add({
//     exportType: "EPUB", exportTag: "h1", exportClass: "titlu_h1", exportAttributes: ""
// });//splitDocument: true
Main(myParagRafName);

function Main(myParagRafName) {
    var doc = app.activeDocument;
    var ps = doc.paragraphStyles.itemByName(myParagRafName);
    // ps.emitCss = false;
    ps.fillColor = "Black";
	//ps.splitDocument = true;
}
