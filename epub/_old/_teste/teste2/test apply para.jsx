var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages

// myDocument.rectangles.itemByName("image_rectangle").appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext");
// myDocument.textFrames.itemByName("image_rectangle").applyObjectStyle(obj_style_imag_intext)
// obj.appliedObjectStyle = document.objectStyles.itemByName("Image"); 
var myFrame= myDocument.textFrames.itemByName("textdesters")
for (i=0; i < myFrame.paragraphs.length; i++)
    {
       
        myFrame.parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
         

    }