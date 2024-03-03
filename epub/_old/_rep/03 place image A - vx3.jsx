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

var main = function() {

myNote = app.selection[0];
myNote.texts[0].contents = "  ##";
// app.menuActions.itemByID(278).invoke(); // deselect all

// app.menuActions.item("$ID/Select &All").invoke();

var selectedItem = app.activeDocument.selection[0];

if (selectedItem instanceof InsertionPoint &&
    selectedItem.parentTextFrames[0] instanceof TextFrame) {

    var textFrame = selectedItem.parentTextFrames[0];

    // This just demonstrates that the variable `textFrame` does
    // hold a reference to the actual text frame - let's delete it !
    // textFrame.remove();
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


myPage.pageItems.everyItem().select();



// selObj[0].name = "image_text";
// ungroup_elements()
// function ungroup_elements() {
//     for (var myCounter = 0; myCounter < app.selection.length; myCounter++) {
//         if (app.selection[myCounter].constructor.name == "Group") {


//             app.selection[myCounter].ungroup()
//             execute_main()
//             // break;
//         }

//     }

// }
execute_main(myPage)
function execute_main(myPage) {
    var myObjectList = new Array;
    // if (app.documents.length != 0){
    // 	if (app.selection.length != 0){
    for (var myCounter = 0; myCounter < app.selection.length; myCounter++) {
        switch (app.selection[myCounter].constructor.name) {
            case "Rectangle":
                app.selection[myCounter].name = "image_rectangle";
            // case "Oval":
            // case "Polygon":
            case "TextFrame":
                // case "Group":
                // case "Button":
                // case "GraphicLine":
                myObjectList.push(app.selection[myCounter]);
                break;
        }
    }

    // alert(myObjectList)
    for (var myCounter = 0; myCounter < myObjectList.length; myCounter++) {
        if (myObjectList[0].constructor.name == "Rectangle") {
            // alert("rectanglewww "+myCounter)
            myObjectList[1].name = "text1";
            myObjectList[2].name = "text2";
            // myObjectList[myCounter].name = "image_text";
        }
        if (myObjectList[1].constructor.name == "Rectangle") {
            // alert("rectanglewww "+myCounter)
            myObjectList[0].name = "text1";
            myObjectList[2].name = "text2";
            // myObjectList[myCounter].name = "image_text";
        }
        if (myObjectList[2].constructor.name == "Rectangle") {
            // alert("rectanglewww "+myCounter)
            myObjectList[0].name = "text1";
            myObjectList[1].name = "text2";
            // myObjectList[myCounter].name = "image_text";
        }
    }
    var mySelWords_text_unu = myDocument.textFrames.itemByName("text1").words.length;
    var mySelWords_text_doi = myDocument.textFrames.itemByName("text2").words.length;
    // alert("mySelWords_text_unu" +mySelWords_text_unu+" "+mySelWords_text_doi)
    if (mySelWords_text_unu > mySelWords_text_doi) {
        // alert("22")
        myDocument.textFrames.itemByName("text2").name = "textdesters";
        myDocument.textFrames.itemByName("text1").name = "image_text";
    }
    else{
        myDocument.textFrames.itemByName("text1").name = "textdesters";
        myDocument.textFrames.itemByName("text2").name = "image_text"; 
    }




    // selObj[1].name = "textdesters";
    // selObj[2].name = "image_text";

    app.select(myDocument.rectangles.itemByName("image_rectangle"))


    app.cut();

    app.select(myDocument.textFrames.itemByName("textdesters").insertionPoints[0]);

    app.paste();
    // app.select(myDocument.textFrames.itemByName("textdesters")).insertionPoints[0].contents = " \r";
    app.selection[0].insertionPoints[0].contents = " \r";
    myDocument.textFrames.itemByName("textdesters").parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
    myDocument.textFrames.itemByName("textdesters").fit(FitOptions.FRAME_TO_CONTENT)



    app.menuActions.item("$ID/Select &All").invoke();
    app.cut();



    myDocument.textFrames.itemByName("textdesters").remove()



    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "##";
    app.changeGrepPreferences.changeTo = "\r\~c\r";

    myDocument.textFrames.itemByName("image_text").changeGrep();
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    

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
}
var u;

app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );