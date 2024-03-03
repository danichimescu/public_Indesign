var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages

// myDocument.rectangles.itemByName("image_rectangle").appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext");
// myDocument.textFrames.itemByName("image_rectangle").applyObjectStyle(obj_style_imag_intext)
// obj.appliedObjectStyle = document.objectStyles.itemByName("Image"); 

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
alert(myPage.name)