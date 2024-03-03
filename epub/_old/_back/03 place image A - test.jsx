app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];

var myDocument = app.documents[0];
var myPage_length = app.documents[0].pages.length
var myPages = app.documents[0].pages

// var main = function() {

// myNote = app.selection[0];
// myNote.texts[0].contents = "##";
// app.menuActions.itemByID(278).invoke(); // deselect all

// app.menuActions.item("$ID/Select &All").invoke();

// var selectedItem = app.activeDocument.selection[0];
// if (selectedItem instanceof InsertionPoint &&
//     selectedItem.parentTextFrames[0] instanceof TextFrame) {

//     var textFrame = selectedItem.parentTextFrames[0];

//     // This just demonstrates that the variable `textFrame` does
//     // hold a reference to the actual text frame - let's delete it !
//     // textFrame.remove();
//     app.select(textFrame)
//     textFrame.name = "image_text";

// } else {
//     alert("The cursor has not been placed in a text frame");
// }
var selectedItem = app.activeDocument.selection[0];
if (selectedItem instanceof TextFrame) {

    // var textFrame = selectedItem.parentTextFrames[0];

    // This just demonstrates that the variable `textFrame` does
    // hold a reference to the actual text frame - let's delete it !
    // textFrame.remove();
    // app.select(textFrame)
    selectedItem.name = "image_text";

} else {
    alert("First selection must be a text frame");
}

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


// myPage.pageItems.everyItem().select();



execute_main(myPage)
function execute_main(myPage) {
    var myObjectList = new Array;
    // var nrElemente = app.selection.length;
    for (var myCounter = 0; myCounter < app.selection.length; myCounter++) {


        myObjectList.push(app.selection[myCounter]);

    }
    var nrElementeObj = myObjectList.length;

    for (var myCounter = nrElementeObj-1; myCounter >= 0; myCounter--) {
    // for (myCounter = 0; myCounter < nrElementeObj; myCounter++) {
        if (myObjectList[myCounter].constructor.name == "Rectangle") {
            // cutcopyRectangle()
            app.select(myObjectList[myCounter])
            app.cut();
            app.select(myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1));
            myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1).contents = "\r";
            app.paste();
            myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1).contents = "\r";

            // alert("1")
        }
        else {

            // cutcopyText()
            app.select(myObjectList[myCounter].insertionPoints[0]);
            app.menuActions.item("$ID/Select &All").invoke();
            app.cut();
            app.select(myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1));
            myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1).contents = "\r";
            app.paste();
            myDocument.textFrames.itemByName("image_text").insertionPoints.item(-1).contents = "\r";


            // myObjectList[myCounter].remove()
            // alert("2")
        }
    }

    function cutcopyRectangle() {
        app.select(myObjectList[myCounter])
        app.cut();
        app.select(myDocument.textFrames.itemByName("image_text").insertionPoints[0]);
        app.paste();
        myDocument.textFrames.itemByName("image_text").insertionPoints[0].contents = " \r";
    }
    function cutcopyText() {
        app.select(myObjectList[myCounter].insertionPoints[0]);
        app.menuActions.item("$ID/Select &All").invoke();
        app.cut();
        app.select(myDocument.textFrames.itemByName("image_text").insertionPoints[0]);
        app.paste();
        myDocument.textFrames.itemByName("image_text").insertionPoints[0].contents = " \r";

        myObjectList[myCounter].remove()
    }
    //********** */

    b_pgebounds = myPage.bounds;

    var m_left = myPage.marginPreferences.left; //mmyX2
    var m_right = myPage.marginPreferences.right; //mmyX1
    var m_top = myPage.marginPreferences.top; //mmyy2
    var m_bottom = myPage.marginPreferences.bottom; //mmyy1

    Wp = b_pgebounds[3] - b_pgebounds[1];
    Hp = b_pgebounds[2] - b_pgebounds[0];

    // var obj = app.selection[0];
    var obj = myDocument.textFrames.itemByName("image_text");
    var myBounds1 = obj.geometricBounds;
    var Y1 = myBounds1[0];
    var X1 = myBounds1[1];
    var Y2 = myBounds1[2];
    var X2 = myBounds1[3];

    obj.geometricBounds = [m_top, m_left, Hp - m_bottom, Wp - m_right];

    obj.move([m_left, m_top])
    // app.documents[0].align(myHWai, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
    myDocument.align(obj, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
    myDocument.align(obj, AlignOptions.VERTICAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);

    //******* */

    myDocument.textFrames.itemByName("image_text").name = "text_corp_" + myPage.name;


}



// }
// var u;

// app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );