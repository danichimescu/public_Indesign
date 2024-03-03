var myparag = app.selection[0].paragraphs.item(0)
// alert(myparag.appliedParagraphStyle.name)
var myParagRafName = myparag.appliedParagraphStyle.name
alert(myParagRafName)

app.documents[0].paragraphStyles.itemByName(myParagRafName).styleExportTagMaps.add({
    exportType: "EPUB", exportTag: "p", exportClass: "", exportAttributes: ""
});//splitDocument: true
Main(myParagRafName);

function Main(myParagRafName) {
    var doc = app.activeDocument;
    var ps = doc.paragraphStyles.itemByName(myParagRafName);
    // ps.emitCss = false;
    ps.splitDocument = false;
}








// try {

//     var menu = app.menus.item("$ID/ParaStylePanelPopup");  
//     var menuItem = menu.menuItems.item("$ID/Edit All Export Tags..."); 
//     var menuAction = menuItem.associatedMenuAction;  
//     menuAction.invoke(); 
// }

// catch(err) {
//     alert("Hmmm");
// }

// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.add("PDF", "P", "", "") // merge
// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.add("EPUB", "h1", "", "") // MERGEE //

// StyleExportTagMaps.add (exportType: string, exportTag: string, exportClass: string, exportAttributes: string[, withProperties: Object])
// style.styleExportTagMaps.add({exportType:"PDF", exportAttributes:'', exportTag:tagName, exportClass:className});
// var body = myDoc.paragraphStyles.itemByName("Body Text");
// body.styleExportTagMaps.add({exportType: "EPUB", exportTag: "p", exportClass: "", exportAttributes: ""});




// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.add("EPUB", "h1", "", "", "true") //  // //"w_Zag1", "h1", "Zag1", "", true

// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.add("EPUB", "h1", "Zag1", "", true)
// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.exportType == "EPUB"
// app.documents[0].paragraphStyles.itemByName("Capitol").styleExportTagMaps.splitDocument = true;

/////8888888888***************** - pt export epub cu breakdocument
// mDoc = app.documents[0];
// with(mDoc.epubExportPreferences){       
//     /*SPLIT DOCUMENT*/
//     breakDocument = true;
//     paragraphStyleName = ''; // name of paragraph style to break InDesign document
//     /*VERSION*/
//     version = EpubVersion.EPUB2;
// }
// var mFile = File('/Users/rhanot/Downloads/test.epub');
// mDoc.exportFile(ExportFormat.EPUB, mFile, false);