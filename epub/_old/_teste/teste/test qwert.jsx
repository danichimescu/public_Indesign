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



var myPage = page;

// var mySel = app.selection[0];
// all words inside selected text frame, even if frame is threaded
// var mySelWords = mySel.texts.everyItem().words.length; // merge
// alert("Document contains " + mySelWords + " words.");



var myObjectList = new Array;
// if (app.documents.length != 0){
// 	if (app.selection.length != 0){
for (var myCounter = 0; myCounter < app.selection.length; myCounter++) {
    switch (app.selection[myCounter].constructor.name) {
        case "Rectangle":
            app.selection[myCounter].name = "image_text";
        case "Oval":
        case "Polygon":
        case "TextFrame":
        case "Group":
        case "Button":
        case "GraphicLine":
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

if (mySelWords_text_unu > mySelWords_text_doi) {
    myDocument.textFrames.itemByName("text2").name = "textdesters";
    myDocument.textFrames.itemByName("text1").name = "image_text";
}

// // selObj[0].name = "image_text";
// selObj[1].name = "textdesters";
// selObj[2].name = "image_text";

// // selObj[2].label = "image_text";
// app.select(selObj[0])


// app.cut();

// app.select(selObj[1].insertionPoints[0]);

// app.paste();
// app.selection[0].insertionPoints[0].contents = " \r";
// selObj[1].parentStory.paragraphs[i].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("Figura");
// selObj[1].fit(FitOptions.FRAME_TO_CONTENT)

// // app.select(selObj[1].insertionPoints[0]);
// // app.insert("\r");


// // selObj[1].label = "textdesters";

// app.menuActions.item("$ID/Select &All").invoke();
// app.cut();


// var myFrames = myDocument.textFrames;
// // itemByName("Name")
// myDocument.textFrames.itemByName("textdesters").remove()

// // for (var i = 0; i < myFrames.length; i++) {
// //     // alert ("xxxmatch");
// //     if (myFrames[i].label == "textdesters") {
// //         // alert ("match"); // you changes here  

// //         myFrames[i].remove()

// //     }
// // }

// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// app.findGrepPreferences.findWhat = "##";
// app.changeGrepPreferences.changeTo = "\r\~c\r";

// myDocument.textFrames.itemByName("image_text").changeGrep();
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// myDocument.textFrames.itemByName("image_text").name = "text_corp_"+myPage.name;

// // for (var i = 0; i < myFrames.length; i++) {
// //     // alert ("xxxmatch");
// //     if (myFrames[i].label == "image_text") {
// //         // alert ("match"); // you changes here  
// //         myFrames[i].label = ""

// //             // myFrames[i].changeGrep();
// //             // app.select(myFrames[i].insertionPoints[0]);
// //             // app.selection[0].insertionPoints[0].contents = " \r";
// //             // app.paste();
// //             // app.selection[0].insertionPoints[0].contents = " \r";
// //             myFrames[i].changeGrep();

// //             app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;


// //     }
// // }


