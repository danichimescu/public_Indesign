// insert image/images in text frame at insertion point

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
var textFramefromSelection = selectedItem_0_InsertionPoint.parentTextFrames[0];


var main = function () {


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
        // try {
        //     // myDocument.paragraphStyles.item("c3nt3r").name;
        //     // myDocument.textFrames.itemByName("textdesters").parentStory.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
        //     var myparag = app.selection[0].paragraphs.item(0)
        //     myparag.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("c3nt3r");
        // }
        // catch (myError) {
        //     myDocument.paragraphStyles.add({
        //         name: "c3nt3r", pointSize: 12, leading: 14, justification: Justification.CENTER_ALIGN, fontStyle: "Regular"
        //     });
        //     myparag.appliedParagraphStyle = app.activeDocument.paragraphStyles.item("c3nt3r");
        //     // alert(myError)
        // }
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
            { geometricBounds: [15, 80, 200, 905] }
        );
    myTextFrame_desters.name = "textdesters"

    for (a = 0; a < combineMe.length; a++) {
        // if (combineMe[a].nextTextFrame == null) {
        nextFree = a + 1;
        // alert("a este " + a)
        if (combineMe[a].constructor.name == "Rectangle") {
            // cutcopyRectangle()
            combineMe[a].name = "imag_" + a;
            app.select(combineMe[a])
            obj_imag = combineMe[a]


            // var obj = app.selection[0];
            // var obj_imag = myDocument.textFrames.itemByName("image_text");
            var myBounds_H_p = obj_imag.geometricBounds;
            var h_pY1 = myBounds_H_p[0];
            var h_pX1 = myBounds_H_p[1];
            var h_pY2 = myBounds_H_p[2];
            var h_pX2 = myBounds_H_p[3];
            var h_poza = h_pY2 - h_pY1;
            // alert(h_poza)


            // myDocument.rectangles.itemByName("image_rectangle").appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext"); 
            try {
                combineMe[a].appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext"); // merge
                // combineMe[a].AnchoredObjectSetting.anchorYoffset=h_poza
                // combineMe[a].anchoredObjectSettings.anchorYoffset=-h_poza // nu zice ca e eroare// nu e bun



                // exemplu
                // with(myAnchoredFrame.anchoredObjectSettings){
                //     anchoredPosition = AnchorPosition.anchored;
                //     anchorPoint = AnchorPoint.topLeftAnchor;
                //     horizontalReferencePoint = AnchoredRelativeTo.anchorLocation;
                //     horizontalAlignment = HorizontalAlignment.leftAlign;
                //     anchorXoffset = 72;
                //     verticalReferencePoint = VerticallyRelativeTo.lineBaseline;
                //     anchorYoffset = 24;
                //     anchorSpaceAbove = 24;
                //     }




            } catch (e) {
                alert("Object style name obj_style_imag_intext nu e!")
            }
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
            var depusanchor = myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imag_" + a)

            // alert(depusanchor.name)
            depusanchor.anchoredObjectSettings.anchorYoffset = -h_poza

            myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imag_" + a).name = "imag_p_" + myPage.name





        }
        /////////********************************* */


        if (combineMe[a].constructor.name == "Oval") {
            combineMe[a].name = "imagOval_" + a;
            app.select(combineMe[a])
            obj_imag = combineMe[a]

            var myBounds_H_p = obj_imag.geometricBounds;
            var h_pY1 = myBounds_H_p[0];
            var h_pX1 = myBounds_H_p[1];
            var h_pY2 = myBounds_H_p[2];
            var h_pX2 = myBounds_H_p[3];
            var h_poza = h_pY2 - h_pY1;

            try {
                combineMe[a].appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext"); // merge


            } catch (e) {
                alert("Object style name obj_style_imag_intext nu e!")
            }
            app.cut();


            myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(-1).contents = "########";
            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
            app.findGrepPreferences.findWhat = "########"; // ########
            app.changeGrepPreferences.changeTo = "\r~c\r"; //\r

            myDocument.textFrames.itemByName("textdesters").parentStory.changeGrep();

            var depusanchor = myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imagOval_" + a)


            depusanchor.anchoredObjectSettings.anchorYoffset = -h_poza

            myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imagOval_" + a).name = "imag_o_p_" + myPage.name





        }


        /////************************************* */ end oval  /
        /////************************************* */ start Polygon 




        if (combineMe[a].constructor.name == "Polygon") {
            combineMe[a].name = "imagPval_" + a;
            app.select(combineMe[a])
            obj_imag = combineMe[a]

            var myBounds_H_p = obj_imag.geometricBounds;
            var h_pY1 = myBounds_H_p[0];
            var h_pX1 = myBounds_H_p[1];
            var h_pY2 = myBounds_H_p[2];
            var h_pX2 = myBounds_H_p[3];
            var h_poza = h_pY2 - h_pY1;
            // alert(h_poza)
            try {
                combineMe[a].appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext"); // merge

            } catch (e) {
                alert("Object style name obj_style_imag_intext nu e!")
            }
            app.cut();

            myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(-1).contents = "########";
            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
            app.findGrepPreferences.findWhat = "########"; // ########
            app.changeGrepPreferences.changeTo = "\r~c\r"; //\r
            myDocument.textFrames.itemByName("textdesters").parentStory.changeGrep();
            var depusanchor = myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imagPval_" + a)
            depusanchor.anchoredObjectSettings.anchorYoffset = -h_poza
            myDocument.textFrames.itemByName("textdesters").parentStory.splineItems.itemByName("imagPval_" + a).name = "imag_p_p_" + myPage.name
        }



        /////************************************* */ end Polygon 

        if (combineMe[a].constructor.name == "TextFrame" && combineMe[a].name != "image_text") {

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




    // app.select(myDocument.textFrames.itemByName("textdesters"))

    // myDocument.textFrames.itemByName("textdesters").textFramePreferences.verticalJustification; // returns CENTER_ALIGN in the JavaScript Console

    // var myText = myTextFrame.parentStory.paragraphs.item(0)
    // var myText = myDocument.textFrames.itemByName("textdesters").parentStory.paragraphs.item(0)
    // // myText.pointSize = 72;
    // myText.justification = Justification.centerAlign;

    app.select(myDocument.textFrames.itemByName("textdesters").parentStory.insertionPoints.item(0))
    app.menuActions.item("$ID/Select &All").invoke();

    app.selection[0].justification = Justification.centerAlign; //justification: Justification.CENTER_ALIGN
    app.selection[0].firstLineIndent = 0;
    app.selection[0].leftIndent = 0;
    // aplica centrat
    //paragraphs.item(0).verticalJustification = verticalJustification.centerAlign; 
    // Text.Justification.centerAlign; 
    // paragraphs.item(0).Justification = verticalJustification.centerAlign;



    app.cut();
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "12,3.4,56,8."; // ########
    app.changeGrepPreferences.changeTo = "~c"; //\r
    // app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    // app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1));
    // app.select(selectedItem_0_InsertionPoint)
    myDocument.textFrames.itemByName("image_text").parentStory.changeGrep();
    myDocument.textFrames.itemByName("textdesters").remove()



    // with(myDocument.rectangles.itemByName("imag_").parent.anchoredObjectSettings){
    //     // anchoredPosition = AnchorPosition.anchored;
    //     // anchoredPosition = AnchorPosition.INLINE_POSITION;
    //     // anchorPoint = AnchorPoint.topLeftAnchor;
    //     // horizontalReferencePoint = AnchoredRelativeTo.anchorLocation;
    //     // horizontalAlignment = HorizontalAlignment.leftAlign;
    //     // anchorXoffset = 702;
    //     // verticalReferencePoint = VerticallyRelativeTo.lineBaseline;
    //     anchorYoffset = -h_poza;
    //     // anchorSpaceAbove = 24;
    //     }

    // myDocument.textFrames.itemByName("textdesters").name = page



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


    app.menuActions.itemByID(118822).invoke();


}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");