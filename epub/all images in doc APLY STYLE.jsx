// app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
// app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

// app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
// app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];

// var myDocument = app.documents[0];
// var myPage_length = app.documents[0].pages.length
// var myPages = app.documents[0].pages
var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages

var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;


// var main = function () {

  // var anchor = AnchorPoint.CENTER_ANCHOR;
  // var obj = app.activeDocument.selection[0];
  // var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
  // var oh = obj.geometricBounds[2] - obj.geometricBounds[0];

  // // var pw =(oh*0.1)/oh; // oh * x =  0.1*oh, x = 
  // // var ph = (ow*0.1)/ow;
  // var pw = 0.9;
  // var ph = 0.9;
  // var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
  // obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);

  // var varNrPoze = myDocument.allGraphics.length;!!! 
  var graphics = app.activeDocument.allGraphics;
  links = app.activeDocument.links.everyItem().getElements();
  // // links.parent.parent.fit (FitOptions.CONTENT_TO_FRAME);

  
  
  // for (i = 0; i < graphics.length; i++) {
  //   graphics[i].parent.appliedObjectStyle = myDocument.objectStyles.item("objStyle_imag_intext"); //     MERGEEEEE
  // }
   
  
 
  var mySelTextMare = app.activeDocument.selection[0]; // text mare
  var mystorydoiTextMare = app.selection[0].parentStory;
  replace_unu()
  function replace_unu() {

    // selObj[0].changeGrep();// ok 
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "~a"; // inline image - MERGE!!!
    app.changeGrepPreferences.changeTo = "";

    //  app.changeGrepPreferences.changeTo =  "$1"; //\r
    app.changeGrepPreferences.appliedParagraphStyle = "Figura_centrat"; //Figura_centrat //"centru_img";
    mystorydoiTextMare.changeGrep();

    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;

    // selObj.parentStory.paragraphs[-2].appliedParagraphStyle = app.activeDocument.paragraphStyles.item("AnCHAPTER-BRAK"); 
    // for (var i = 0; i < selObj.length; i++) {
    //     selObj[i].changeGrep();

    // }
    // alert("repl1")
  }
  
  //   links.parent.parent.fit (FitOptions.CONTENT_TO_FRAME);
    //myLinks.parent.applyObjectStyle(myObjectStyle);

    // myFrames[i].applyObjectStyle(myDoc.objectStyles.item(myObjectStyle));

    // allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.itemByName(styleNameForJPG); 
    // combineMe[a].appliedObjectStyle = app.activeDocument.objectStyles.item("obj_style_imag_intext"); // merge
   

    //graphics[i].parent.applyObjectStyle(obj_style_imag_intext);

    //  graphics[i].parent.applyObjectStyle(myDocument.objectStyles.item(obj_style_imag_intext)); // nu merge

    // graphics[i].parent.applyObjectStyle(obj_style_imag_intext); // nu merge

    //graphics[i].parent.appliedObjectStyle = myDocument.itemByName(obj_style_imag_intext); // nu merge
    // allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.itemByName(styleNameForTIF);  



    // var anchor = AnchorPoint.CENTER_ANCHOR;
    // //   var obj = app.activeDocument.selection[0];
    // //   var obj = links.parent.parent[i];// nu merge
    // // var obj = myDocument.allGraphics[i]; // nu merge
    // var obj = graphics[i].parent
    // var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
    // var oh = obj.geometricBounds[2] - obj.geometricBounds[0];

    // // var pw =(oh*0.1)/oh; // oh * x =  0.1*oh, x = 
    // // var ph = (ow*0.1)/ow;
    // var pw = 1.1;
    // var ph = 1.1;
    // var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
    // obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);






  // app.findObjectPreferences.appliedObjectStyles = myDocument.objectStyles.item("objStyle_imag_intext");
  // var r = app.activeDocument.findObject()
  // //alert(r)

  // for(var i = 0; i < r.length; i++)
  // {
  // 	if(r[i].parent.constructor.name == "Character")
  // 		//r[i].parent.appliedParagraphStyle = "centru_img"
  //         r[i].parent.appliedParagraphStyle = myDocument.paragraphStyles.item("centru_img"); 
  //         alert("gasit")
  // }
  //app.findObjectPreferences.appliedObjectStyles = null



  // var graphics = app.activeDocument.allGraphics;
  // for (var i = 0; i < graphics.length; i++) {
  //     app.select(graphics[i].parent, SelectionOptions.ADD_TO);
  // }
  //obj_style_imag_intext

  // for (var n = 0; n < allGraphicsInDocLength; n++) {
  //     allGraphicsInDoc[n].parent.applyObjectStyle(objectStyleForAllContainersOfGraphics, true, false);
  // };

// }
// var u;

// app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");