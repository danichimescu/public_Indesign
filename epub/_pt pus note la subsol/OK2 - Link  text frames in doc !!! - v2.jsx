//https://creativepro.com/topic/is-there-a-script-to-combine-selected-frames-as-threaded-text-40/
var myDoc = app.documents[0];

var allPages = myDoc.pages;
var myItems = myDoc.allPageItems;
var n = myItems.length, tfs = [], nItem;

//Looping through page items to collect text frames
while (n--) {
	nItem = myItems[n];
	(nItem instanceof TextFrame) && tfs.push(nItem);
}

//result
alert(tfs.length + " textframes have been found");


var combineMe = new Array;

for (a = 0; a < tfs.length; a++) {
	if (tfs[a] instanceof TextFrame)
		combineMe.push(tfs[a]);
}


// var combineMe = new Array;

// for (a=0; a<app.selection.length; a++)
// {
// if (app.selection[a] instanceof TextFrame)
// combineMe.push(app.selection[a]);
// }
// combineMe.sort (function (a,b) { return (a.geometricBounds[0] < b.geometricBounds[0]) || (a.geometricBounds[0] == b.geometricBounds[0] && a.geometricBounds[1] < b.geometricBounds[1]) ? -1 : 1; } );

for (a = 0; a < combineMe.length - 1; a++) {
	if (combineMe[a].nextTextFrame == null) {
		nextFree = a + 1;
		while (nextFree < combineMe.length && combineMe[nextFree].previousTextFrame != null)
			nextFree++;
		if (nextFree < combineMe.length) {
			// Add Frame Break when needed:
			if (combineMe[a].characters[-1].contents != SpecialCharacters.FRAME_BREAK) {
				if (combineMe[a].characters[-1].contents == "r")
					combineMe[a].characters[-1].contents = SpecialCharacters.FRAME_BREAK;
				else
					combineMe[a].insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
			}
			combineMe[a].nextTextFrame = combineMe[nextFree];
		}
	}
}