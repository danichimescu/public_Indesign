var doc = app.activeDocument;
// var selObj = myDocument.selection;

// app.documents[0].pages[9].appliedMaster = app.documents[0].masterSpreads.item ("None");
// app.documents[0].pages[0].appliedMaster = app.documents[0].masterSpreads.item ("B-Master"); // merge
// app.documents[0].pages[9].appliedMaster = NothingEnum.NOTHING; // merge


var pages = doc.pages;
		for (var i = 0; i < pages.length; i++) {
			
            // var page = pages.item(i);
            
            app.documents[0].pages[i].appliedMaster = NothingEnum.NOTHING;


        }

