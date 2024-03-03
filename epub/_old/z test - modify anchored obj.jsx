var myDocument = app.activeDocument;

var myRectangle = app.selection[0];
alert(myRectangle)

// var h_poza = 154
// // // var depusanchor = myDocument.rectangles.itemByName("imag_")
// // // alert(depusanchor)
// // myRectangle.anchoredObjectSettings.anchorYoffset=-h_poza // a mers


// // var depusanchor = myDocument.splineItems.itemByName("imag_1")


// // merge jos aici
// var depusanchor= app.selection[0].parentStory.splineItems.itemByName("imag_1") // merge
// app.select(depusanchor)// asa nu merge
// alert(depusanchor.name)
// depusanchor.anchoredObjectSettings.anchorYoffset=-h_poza 

// // merge jos aici end


// with(myRectangle.anchoredObjectSettings){
// 	anchoredPosition = AnchorPosition.INLINE_POSITION;
// 	anchorPoint = AnchorPoint.topLeftAnchor;
// 	horizontalReferencePoint = AnchoredRelativeTo.anchorLocation;
// 	horizontalAlignment = HorizontalAlignment.leftAlign;
// 	anchorXoffset = 72;
// 	verticalReferencePoint = VerticallyRelativeTo.lineBaseline;
// 	anchorYoffset = 24;
// 	anchorSpaceAbove = 24;
// 	}


// // merge asta de jos:
// if ( !app.selection[0] || app.selection[0].constructor.name != "TextFrame" ) 
// { alert ( "There is no TEXT FRAME selected !\nSelect a textFrame contaning text please :)"); exit() }
// var mySelections = app.selection[0].parentStory.splineItems.everyItem().getElements(); // this is an array of anchored items of the story in seleccted textFrame

// alert ( "There are/is " + mySelections.length + " anchored elements in the frame." );
// alert(mySelections[0].name)




// main();

// function main(){
// var sel = mySelections, i = sel.length;
// while ( i– ) {
// var myObject = sel[i];
// myObject.fit(FitOptions.contentToFrame);
// myObject.fit(FitOptions.proportionally);
// myObject.fit(FitOptions.centerContent);
// myObject.fit(FitOptions.frameToContent);
// }
// }