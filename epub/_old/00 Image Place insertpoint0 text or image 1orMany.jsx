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
var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages


// app.menuActions.itemByID(278).invoke(); // deselect all

// app.menuActions.item("$ID/Select &All").invoke();

var selectedItem_0_InsertionPoint = app.activeDocument.selection[0];
// myNote = app.selection[0];
// myNote.texts[0].contents = "########"; //  ########
// app.select(selectedItem_0_InsertionPoint)

if (selectedItem_0_InsertionPoint instanceof InsertionPoint &&
    selectedItem_0_InsertionPoint.parentTextFrames[0] instanceof TextFrame) {

    var textFrame = selectedItem_0_InsertionPoint.parentTextFrames[0];

    // This just demonstrates that the variable `textFrame` does
    // hold a reference to the actual text frame - let's delete it !
    // textFrame.remove();
    // app.select(textFrame)
    textFrame.name = "image_text";
    myNote = app.selection[0];
    myNote.texts[0].contents = "12,3.4,56,8.";
    app.select(textFrame)

} else {
    alert("The cursor has not been placed in a text frame");
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
// alert(myPage.name)


myPage.pageItems.everyItem().select();

var combineMe = new Array;

for (a = 0; a < app.selection.length; a++) {
    // if (app.selection[a] instanceof TextFrame || app.selection[a] instanceof Rectangle)
    combineMe.push(app.selection[a]);
}
// alert(combineMe.length)
combineMe.sort(function (a, b) {

    return Number(a.geometricBounds[0]) - Number(b.geometricBounds[0]);

});

// create text frame de sters

// var myItem = myPage.rectangles.add({geometricBounds:[20,20,70,70]});//
// var myTextFrame_desters = myDocument.pages.item(0).textFrames.add
var myTextFrame_desters = myPage.textFrames.add
    (
        // { geometricBounds: [15, 80, 20, 95], contents: "########" }
        { geometricBounds: [15, 80, 200, 905]}
    );
myTextFrame_desters.name = "textdesters"

for (a = 0; a < combineMe.length; a++) {
    // if (combineMe[a].nextTextFrame == null) {
    nextFree = a + 1;
    // alert("a este " + a)
    if (combineMe[a].constructor.name == "Rectangle" ) {
        // cutcopyRectangle()
        app.select(combineMe[a])
        app.cut();


        myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(-1).contents = "########";
        // myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1).contents = "######";
        app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        app.findGrepPreferences.findWhat = "########"; // ########
        app.changeGrepPreferences.changeTo = "\r~c\r"; //\r
        // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        // app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1));
        // app.select(selectedItem_0_InsertionPoint)
        myDocument.textFrames.itemByName("textdesters").parentStory.changeGrep();
        // myDocument.textFrames.itemByName("image_text").parentStory.changeGrep();
        // app.selection[0].changeGrep()

        // myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1).contents = "\r";
        // combineMe[a].remove()  textFrame.characters[-1]
        // alert("1")
    } if (combineMe[a].constructor.name == "TextFrame"&& combineMe[a].name!="image_text") {

        // cutcopyText()
        app.select(combineMe[a].parentStory.insertionPoints[-1]);
        app.menuActions.item("$ID/Select &All").invoke();
        app.cut();
        myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(-1).contents = "########";
        // myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1).contents = "######";
        app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        app.findGrepPreferences.findWhat = "########"; // ########
        app.changeGrepPreferences.changeTo = "\r~c\r"; //\r
        // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        // app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1));
        // app.select(selectedItem_0_InsertionPoint)
        myDocument.textFrames.itemByName("textdesters").parentStory.changeGrep();
        // myDocument.textFrames.itemByName("image_text").parentStory.changeGrep();
        // app.selection[0].changeGrep()

        combineMe[a].remove()
        // myObjectList[myCounter].remove()
        // alert("2")
    }

}

// myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(-1).contents = "########";
// myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1).contents = "######";
app.select(myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(0))
app.menuActions.item("$ID/Select &All").invoke();
app.cut();
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "12,3.4,56,8."; // ########
app.changeGrepPreferences.changeTo = "~c"; //\r
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1));
// app.select(selectedItem_0_InsertionPoint)
myDocument.textFrames.itemByName("image_text").parentStory.changeGrep();
myDocument.textFrames.itemByName("textdesters").remove()







///// fit to margins ************************
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

///// fit to margins ************************end

myDocument.textFrames.itemByName("image_text").name = "text_corp_" + myPage.name;


app.menuActions.itemByID(118822).invoke();


// }
// var u;

// app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );