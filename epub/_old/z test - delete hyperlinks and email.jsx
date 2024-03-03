// var Hyperlinksurile = app.documents[0].hyperlinks.

var myDocument = app.activeDocument;

// for( i = 0; i < myDocument.hyperlinks.length; i++ ) {
//     // MyHyperr = myDocument.hyperlinks.item( i );
// 	// MyHyperr.remove()
// alert( myDocument.hyperlinks.length)
// 	myDocument.hyperlinks.item( i ).remove();
	

// 	}
var i=0
	while( i < app.activeDocument.hyperlinks.length ) {
		// MyHyperr = myDocument.hyperlinks.item( i );
		// MyHyperr.remove()
	// alert( myDocument.hyperlinks.length)
	app.activeDocument.hyperlinks.item( i ).remove();
		
	
		}