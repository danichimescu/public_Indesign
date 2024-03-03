
//// !!! doar daca nu sunt deja legate merge
var myDoc = app.documents[0];

var allPages = myDoc.pages;

// var currentFrame = allPages[0].textFrames[0];

// for (var i = 1; i < allPages.length; i++) {

// 	currentFrame.nextTextFrame = allPages.textFrames[i];

// 	currentFrame = allPages.textFrames[i];

// }

var myItems = myDoc.allPageItems;
var n = myItems.length, tfs = [], nItem;

//Looping through page items to collect text frames
while (n--) {
	nItem = myItems[n];
	(nItem instanceof GraphicLine) && tfs.push(nItem);
}

//result
alert(tfs.length + " GraphicLine have been found");

for (var i = 0; i < tfs.length; i++) { // le pune de la coada 
// for (var i = Number(tfs.length); i >= 0; i--) { // ar trebui sa nu le puna de la coada
	tfs[i].remove()

// alert(i)

}