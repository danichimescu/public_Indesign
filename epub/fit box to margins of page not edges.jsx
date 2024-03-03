app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;
// var myPage = myDocument.pages[0];
var myPage = app.activeWindow.activePage;
var myPage_n = app.activeWindow.activePage.name;
// alert(myPage_n)
//var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

//app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;



// var main = function () {



	if (app.documents.length == 0) exit();
	var doc = app.activeDocument;

	var sel = doc.selection; // Save selection
	if (sel.length == 0 || (sel[0].constructor.name == "Guide")) {
		alert("Select an object and try again."); exit();
	}
	// Get selection's parent page
	var selObj = sel, page_set;
	for (var i = 0; i < selObj.length; i++) {
		if (selObj[i].parentPage != null) { page_set = selObj[i].parentPage; break };
		// myPage = app.documents[0].pages.item(i);

	}
	if (page_set == null) { alert("Select an object on page and try again."); exit() };
	
	
	
	
	var myPage = page_set;
	b_pgebounds = myPage.bounds;

	var m_left = myPage.marginPreferences.left; //mmyX2
	var m_right = myPage.marginPreferences.right; //mmyX1
	var m_top = myPage.marginPreferences.top; //mmyy2
	var m_bottom = myPage.marginPreferences.bottom; //mmyy1

	Wp = b_pgebounds[3] - b_pgebounds[1];
	Hp = b_pgebounds[2] - b_pgebounds[0];

		var obj = app.selection[0];

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



// }
// var u;

// app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");