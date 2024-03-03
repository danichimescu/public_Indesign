/*
     
    Add Special Notes - Catene v1 (2024)
	
    (c) Dan Ichimescu 2024
    (constantindan@gmail.com)
    	
    find a number with is the first character in a paragraph
    copy the paragraph which start with that number
    insert copied paragraph in next paragraph with number

    The work and test is in progress
	
*/

// @targetengine "session";
//if (app.documents.length == 0) exit();


var i = -1;
var myFound = [];
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "^\\d+"; // ########
app.changeGrepPreferences.changeTo = ""; //\r
myFound = app.activeDocument.findGrep();
// myDocument.textFrames.itemByName(textFramefromSelection.name).parentStory.changeGrep();
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;


var ui = CreateUI();

ui.show();

// app.generalPreferences.ungroupRemembersLayers = oldURL;
// app.clipboardPreferences.pasteRemembersLayers = oldPRL;


function CreateUI() {

    var ui = new Window("palette", "Add Special Notes - Catene", undefined, { closeButton: false });

    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    // Labels
    ui.labels = ui.add("panel", undefined, undefined);
    ui.labels.orientation = "column";
    ui.labels.alignChildren = ["center", "center"];
    ui.labels.align = ui.labels.add("group", undefined, undefined);
    ui.labels.align.orientation = "column";
    ui.labels.align.alignChildren = ["center", "center"];
    ui.labels.align.row2 = ui.labels.align.add("group", undefined);
    ui.labels.align.row2.preferredSize.height = 25;
    ui.labels.align.row2.orientation = "row";
    ui.labels.align.row2.alignChildren = ["center", "fill"];
    ui.labels.align.row2.left = ui.labels.align.row2.add("button", undefined, "<- Cauta nr catena");
    ui.labels.align.row2.left.helpTip = "Cauta numar catena de introdus";
    ui.labels.align.row2.left.preferredSize.width = 150;
    ui.labels.align.row2.right = ui.labels.align.row2.add("button", undefined, "Cauta nr catena  ->");
    ui.labels.align.row2.right.helpTip = "Cauta numar catena de introdus";
    ui.labels.align.row2.right.preferredSize.width = 150;

    // Actions
    ui.actions = ui.add("group", undefined);
    ui.actions.orientation = "row";
    ui.actions.alignChildren = ["center", "center"];
    // ui.actions.replace = ui.actions.add("button", undefined, "Change");
    ui.actions.insert = ui.actions.add("button", undefined, "Insert");
    ui.actions.close = ui.actions.add("button", undefined, "Close");



    ui.labels.align.row2.right.onClick = function () { SearchForward() }
    ui.labels.align.row2.left.onClick = function () { SearchBack() }



    ui.actions.insert.onClick = function () {
        app.doScript(function () {


            // "Stil Sfanta Scriptura"

            var myDocument = app.activeDocument;


            var selectedInsertionPoint = app.activeDocument.selection[0].insertionPoints.item(-1);
            var textFramefromSelection = selectedInsertionPoint.parentTextFrames[0];
            // if (selectedInsertionPoint instanceof InsertionPoint &&
            //     selectedInsertionPoint.parentTextFrames[0] instanceof TextFrame) {

            var myPage = app.activeDocument.selection[0].parentTextFrames[0].parentPage; // ok
            // alert(myPage.name)

            var myTextFrame_SfantaScriptura = myPage.textFrames.add({ geometricBounds: [0, -100, 50, -10] });
            var x = Math.floor((Math.random() * 10000) + 1);
            myTextFrame_SfantaScriptura.name = "text_catena_pag_" + myPage.name + "_" + x;

            try {
                myTextFrame_SfantaScriptura.appliedObjectStyle = app.activeDocument.objectStyles.item("text Sfanta Scriptura");

            } catch (e) {
                alert("Object style name: \n\"text Sfanta Scriptura\"\n nu exista!")
            }





            textFramefromSelection.name = "_text_p" + myPage.name;


            // app.select(textFramefromSelection)
            var myCurrentParagraph = app.selection[0].paragraphs.item(0);
            app.select(myCurrentParagraph)
            app.cut();
            selectedInsertionPoint.texts[0].contents = "2,4.051977.\r";
            // alert(myCurrentParagraph.contents);
            // exit();
            app.select(myDocument.textFrames.itemByName(myTextFrame_SfantaScriptura.name).parentStory.insertionPoints.item(-1))
            app.paste();
            // myDocument.textFrames.itemByName("text_temporar").parentStory.insertionPoints.item(-1).contents = "fdfdfddfdf";
            // myTextFrame_SfantaScriptura.contents = myCurrentParagraph.contents;
            try {
                myTextFrame_SfantaScriptura.parentStory.texts[0].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Stil Sfanta Scriptura");
                //selObj.parentStory.paragraphs.lastItem().appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); // MERGE
            } catch (e) {
                alert("Paragraph style \n\"Stil Sfanta Scriptura\" nu exista")
            }
            app.select(myDocument.textFrames.itemByName(myTextFrame_SfantaScriptura.name))
            app.cut();

            app.select(myDocument.textFrames.itemByName(textFramefromSelection.name))

            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
            app.findGrepPreferences.findWhat = "2,4.051977.\r"; // ########
            app.changeGrepPreferences.changeTo = "~c"; //\r
            myDocument.textFrames.itemByName(textFramefromSelection.name).parentStory.changeGrep();
            // var depusanchor = myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imagPval_" + a)
            // depusanchor.anchoredObjectSettings.anchorYoffset = -h_poza

            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;

            // } else {
            //     alert("The cursor has not been placed in a text frame");
            // }

            // myDocument.textFrames.itemByName(myTextFrame_SfantaScriptura.name).fit(FitOptions.FRAME_TO_CONTENT)





        }, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "Insert");
    }


    ui.actions.close.onClick = function () { ui.close() }



    ui.onClose = function () {
        ui.close();
        exit();
    }
    return ui;
}



function SearchForward() {
    // app.doScript(function () {
    // alert("primu " + i)

    i++;
    if (i >= myFound.length) {
        i = 0; // Wrap around to the beginning
    }
    showIt(myFound[i]);



    // }, ScriptLanguage.javascript, [], UndoModes.ENTIRE_SCRIPT, "SearchForward")
}

function SearchBack() {
    // app.doScript(function () {

    i--;
    if (i < 0) {
        i = myFound.length - 1; // Wrap around to the end
    }
    showIt(myFound[i]);



    // }, ScriptLanguage.javascript, [], UndoModes.ENTIRE_SCRIPT, "SearchBack")
}




function showIt(theObj) {

    if (arguments.length > 0) {

        // Select object, turn to page and center it in the window

        app.select(theObj);

    }

    // Note: if no object is passed and there is no selection the current page

    // will be centered in the window at whatever zoom is being used

    var myZoom = app.activeWindow.zoomPercentage;

    app.activeWindow.zoom(ZoomOptions.showPasteboard);

    app.activeWindow.zoomPercentage = myZoom;

}
