// var myTOC = app.activeDocument.tocStyles.add();
// myTOC.name = "MyTOCStyle"; 
// myTOC.title = "Cuprins";
// myTOC.removeForcedLineBreak = true;
// myTOC.makeAnchor= true;
// myTOC.runIn= false;


// // myTOC.titleStyle = "myParaStyle"; // enter the paragraph style to apply to the TOC title.
// // style = app.activeDocument.paragraphStyles.item ("myParaStyle"); // enter the paragraph style for "include paragraph styles"
// myTOC.tocStyleEntries.add({formatStyle:style, name:style.name});

// // var myTocPage = myDocument.pages.add(LocationOptions.AT_END);

// app.activeDocument.createTOC(myTOC);


// app.menuActions.item("$ID/UpdateTableOfContentsCmd").invoke();


var myDocument = app.activeDocument;

// var myTOC = app.activeDocument.tocStyles.add();
// try {
for (i = 0; i < myDocument.tocStyles.length; i++) {
	myToc = myDocument.tocStyles.item(i);
	myToc.remove();
}
// for (i = 0; i < myDocument.tocStyles.length; i++) {	

// myToc = myDocument.tocStyles.item(i);
// if (myToc.name == "Cuprins" ||myToc.name == "CUPRINS" ||myToc.name == " Cuprins" ||myToc.name == "Cuprins "  ) {

// alert("Cuprins find")
// myToc.remove()

var myToc = app.activeDocument.tocStyles.add();
myToc.name = "Cuprins";
myToc.title = "Cuprins";

myToc.createBookmarks = true;
myToc.removeForcedLineBreak = true;
myToc.makeAnchor = true;
myToc.runIn = false;
myToc.titleStyle = "#Titlu"; //titleStyle = paragraph style
//Capitol Mare
//Autor articol
//Subsub cap

styleToct1 = app.activeDocument.paragraphStyles.item("#toc t1");
styleT1 = app.activeDocument.paragraphStyles.item("Capitol Mare");

styleToct2 = app.activeDocument.paragraphStyles.item("#toc t2");
styleT2 = app.activeDocument.paragraphStyles.item("Autor articol");

styleToct3 = app.activeDocument.paragraphStyles.item("#toc t3");
styleT3 = app.activeDocument.paragraphStyles.item("Subsub cap");


// styleToct1 = app.activeDocument.paragraphStyles.item("#toc t1");
// styleT1  = app.activeDocument.paragraphStyles.item("#Titlu");

// styleToct2 = app.activeDocument.paragraphStyles.item("#toc t2");
// styleT2  = app.activeDocument.paragraphStyles.item("#Titlu 2");

// styleToct3 = app.activeDocument.paragraphStyles.item("#toc t3");
// styleT3  = app.activeDocument.paragraphStyles.item("#Titlu 3");


// TOCStyleEntry
// TOCStyleEntries.item()

myToc.tocStyleEntries.add({ formatStyle: styleToct1, name: styleT1.name, level: 1, pageNumberPosition: PageNumberPosition.NONE });
myToc.tocStyleEntries.add({ formatStyle: styleToct2, name: styleT2.name, level: 2, pageNumberPosition: PageNumberPosition.NONE });
myToc.tocStyleEntries.add({ formatStyle: styleToct3, name: styleT3.name, level: 3, pageNumberPosition: PageNumberPosition.NONE });


myToc.tocStyleEntries[0].name = styleT1.name
myToc.tocStyleEntries[0].formatStyle = styleToct1

myToc.tocStyleEntries[1].name = styleT2.name
myToc.tocStyleEntries[1].formatStyle = styleToct2

myToc.tocStyleEntries[2].name = styleT3.name
myToc.tocStyleEntries[2].formatStyle = styleToct3




// myToc.tocStyleEntries[1].name=styleT2.name
// myToc.tocStyleEntries[1].formatStyle=styleToct2


myToc.tocStyleEntries[0].pageNumberPosition = PageNumberPosition.NONE
myToc.tocStyleEntries[1].pageNumberPosition = PageNumberPosition.NONE
myToc.tocStyleEntries[2].pageNumberPosition = PageNumberPosition.NONE

myToc.makeAnchor = true;
myToc.removeForcedLineBreak = true;

// app.activeDocument.createTOC(myToc);

myToc.makeAnchor = true;
myToc.removeForcedLineBreak = true;

// app.activeDocument.createTOC(myToc);

// 	} else {

// 		alert("Cuprins  NOT find")
// 		// var myToc = app.activeDocument.tocStyles.add();
// 		myToc.name = "Cuprins";
// 		myToc.title = "Cuprins";


// 		myToc.createBookmarks = true;
// 		myToc.removeForcedLineBreak = true;
// 		myToc.makeAnchor = true;
// 		myToc.runIn = false;
// 		myToc.titleStyle = "Titlu"; //titleStyle = paragraph style



// 		styleToct1 = app.activeDocument.paragraphStyles.item("toc t1");
// 		styleT1  = app.activeDocument.paragraphStyles.item("Titlu");

// 		styleToct2 = app.activeDocument.paragraphStyles.item("toc t2");
// 		styleT2  = app.activeDocument.paragraphStyles.item("Titlu 2");

// 		styleToct3 = app.activeDocument.paragraphStyles.item("toc t3");
// 		styleT3  = app.activeDocument.paragraphStyles.item("Titlu 3");

// 		// TOCStyleEntry
// 		// TOCStyleEntries.item()
// 		myToc.tocStyleEntries.add({ formatStyle: styleToct1, name: styleT1.name, level:1, pageNumberPosition: PageNumberPosition.NONE });
// 		myToc.tocStyleEntries.add({ formatStyle: styleToct2, name: styleT2.name, level:2, pageNumberPosition: PageNumberPosition.NONE });
// 		myToc.tocStyleEntries.add({ formatStyle: styleToct3, name: styleT3.name, level:3, pageNumberPosition: PageNumberPosition.NONE });


// 		myToc.tocStyleEntries[0].name=styleT1.name
// 		myToc.tocStyleEntries[0].formatStyle=styleToct1

// 		myToc.tocStyleEntries[1].name=styleT2.name
// 		myToc.tocStyleEntries[1].formatStyle=styleToct2

// 		myToc.tocStyleEntries[2].name=styleT3.name
// 		myToc.tocStyleEntries[2].formatStyle=styleToct3




// 		// myToc.tocStyleEntries[1].name=styleT2.name
// 		// myToc.tocStyleEntries[1].formatStyle=styleToct2


// 		myToc.tocStyleEntries[0].pageNumberPosition = PageNumberPosition.NONE
// 		myToc.tocStyleEntries[1].pageNumberPosition = PageNumberPosition.NONE
// 		myToc.tocStyleEntries[2].pageNumberPosition = PageNumberPosition.NONE

// 		myToc.makeAnchor = true;
// 		myToc.removeForcedLineBreak = true;

// 		app.activeDocument.createTOC(myToc);

// 	}

// 	myToc.tocStyleEntries[i].pageNumberPosition = PageNumberPosition.NONE

try {
	app.menuActions.item("$ID/UpdateTableOfContentsCmd").invoke();
} catch (e) {

}

	// 	alert("My toc name is " + myToc.name)
	// }
// }
// catch (e) {
// 	alert(e)
// }




// try {
// 	var mTOCStyle = myDocument.tocStyles.itemByName("Cuprins");

// 	// var mTOCStyle = app.activeDocument.tocStyles[-1];

// 	alert(mTOCStyle.tocStyleEntries.everyItem().name);
// 	for (i = 0; i < mTOCStyle.tocStyleEntries.length; i++) {

// 		mTOCStyle.tocStyleEntries[i].pageNumberPosition = PageNumberPosition.NONE
// 	}

// 	mTOCStyle.createBookmarks = true;
// 	// myToc.name = "Cuprins";
// 	// myToc.title = "Cuprins";
// 	mTOCStyle.removeForcedLineBreak = true;
// 	mTOCStyle.makeAnchor = true;
// 	mTOCStyle.runIn = false;

// 	app.menuActions.item("$ID/UpdateTableOfContentsCmd").invoke();
// }
// catch (b) {
// 	alert(b)
// }



// app.menuActions.item("$ID/UpdateTableOfContentsCmd").invoke();

	// myTOC.tocStyleEntries.pageNumberPosition=PageNumberPosition.NONE //BEFORE_ENTRY,


	// myTOC.tocStyleEntries.add ({
	// 	formatStyle:"[Basic Paragraph]",
	// 	name:"[Basic Paragraph]",
	// 	level:1,
	// 	separator:"\t",
	// 	pageNumberPosition: PageNumberPosition.BEFORE_ENTRY,

	// pageNumberPosition=PageNumberPosition.NONE

