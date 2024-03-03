var doc = app.activeDocument;
var i;
var page;
for (i = doc.pages.length - 1; i > 0; i--) {
    page = doc.pages[i];
    if (page.allPageItems.length == 0) {
        page.remove();
    }
}
alert("Done.");