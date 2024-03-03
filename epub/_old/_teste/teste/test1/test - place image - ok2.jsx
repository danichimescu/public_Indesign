//Create a Box to Copy and Paste

var myDoc = app.activeDocument;

var textBox = myDoc.rectangles.add({ geometricBounds: [0, 0, 100, 100], contentType: ContentType.GRAPHIC_TYPE })

// var captionFrameStyle = myDoc.objectStyles.item("Caption Image Frame");

// textBox.applyObjectStyle(captionFrameStyle);

app.select(null);

myDoc.select(textBox);

app.cut();

// Main();

// If you want the script to be un-doable, comment out the line above, and remove the comment from the line below

app.doScript(Main,undefined,undefined,UndoModes.ENTIRE_SCRIPT,"Run Script")

function Main() {

    // Check to see whether any InDesign documents are open.

    // If no documents are open, display an error message.

    if (app.documents.length > 0) {

        var myDoc = app.activeDocument;

        // Do something here

        addAOToPara("Title", "Captioned Image-SidePanel", "Caption");

    }

    else {

        // No documents are open, so display an error message.

        alert("No InDesign documents are open. Please open a document and try again.")

    }

}

function addAOToPara(pStyleName, frameStyle, myContent) {

    app.findGrepPreferences.appliedParagraphStyle = pStyleName;

    var paraList = app.activeDocument.findGrep();

    for (var i = 0; i < paraList.length; i++) {

        var myDoc = app.activeDocument;

        // Add text frame to caption

        var myCaption = paraList.textFrames.add();

        // Delcare Object Style

        var captionStyle = myDoc.objectStyles.item(frameStyle);

        // Apply Object Style

        myCaption.applyObjectStyle(captionStyle);



        // Add content to caption

        myCaption.contents = myContent;

        app.select(myCaption.insertionPoints[0]);

        app.paste();



    }

    app.findGrepPreferences = NothingEnum.nothing;

}