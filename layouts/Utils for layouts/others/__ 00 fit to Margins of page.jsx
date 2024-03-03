/*
Copyright 2019 Dan Ichimescu 
All Rights Reserved
constantindan@gmail.com
Permission to use, copy, modify, and/or distribute this software
for any purpose with or without fee is hereby granted.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;

app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS;


app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;



var main = function () {



	if (app.documents.length == 0) exit();
	var doc = app.activeDocument;

	var sel = doc.selection;
	if (sel.length == 0 || (sel[0].constructor.name == "Guide")) {
		alert("Select an object and try again."); exit();
	}

	var selObj = sel, page_set;
	for (var i = 0; i < selObj.length; i++) {
		if (selObj[i].parentPage != null) { page_set = selObj[i].parentPage; break };


	}
	if (page_set == null) { alert("Select an object on page and try again."); exit() };




	var myPage = page_set;
	b_pgebounds = myPage.bounds;

	var m_left = myPage.marginPreferences.left;
	var m_right = myPage.marginPreferences.right;
	var m_top = myPage.marginPreferences.top;
	var m_bottom = myPage.marginPreferences.bottom;

	Wp = b_pgebounds[3] - b_pgebounds[1];
	Hp = b_pgebounds[2] - b_pgebounds[0];

	var obj = app.selection[0];

	var myBounds1 = obj.geometricBounds;
	var Y1 = myBounds1[0];
	var X1 = myBounds1[1];
	var Y2 = myBounds1[2];
	var X2 = myBounds1[3];

	obj.geometricBounds = [m_top, m_left, Hp - m_bottom - 36, Wp - m_right];



	myDocument.align(obj, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
	myDocument.align(obj, AlignOptions.VERTICAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);

	obj.fit(FitOptions.PROPORTIONALLY);
	obj.fit(FitOptions.FRAME_TO_CONTENT);
	obj.move([m_left, m_top])
	myDocument.align(obj, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);










	app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;




}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");