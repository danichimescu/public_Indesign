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

app.scriptPreferences.userInteractionLevel =
	UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;

var myPage = app.activeWindow.activePage;
var myPage_n = app.activeWindow.activePage.name;

app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

var main = function () {
	var anchor = app.activeWindow.transformReferencePoint;
	var myBleeed_ =
		myDocument.documentPreferences.properties.documentBleedTopOffset;

	var bleedPagina = 0;
	b_pgebounds = myPage.bounds;

	Wp_mm = (b_pgebounds[3] - b_pgebounds[1]) / 2.8346438836889;
	Hp_mm = (b_pgebounds[2] - b_pgebounds[0]) / 2.8346438836889;

	var m_left = myPage.marginPreferences.left;
	var m_right = myPage.marginPreferences.right;
	var m_top = myPage.marginPreferences.top;
	var m_bottom = myPage.marginPreferences.bottom;

	w_t = b_pgebounds[3] - b_pgebounds[1];
	h_t = b_pgebounds[2] - b_pgebounds[0];
	Wp = w_t - 2 * m_left;
	Hp = h_t - 2 * m_top;

	w_t_mm = w_t / 2.83464567;
	h_t_mm = h_t / 2.83464567;
	m_left_mm = m_left / 2.83464567;
	m_top_mm = m_top / 2.83464567;

	var obj_select = app.selection;

	for (i = 0; i < app.selection.length; i++) {
		var obj = app.selection[i];

		if (obj instanceof Rectangle) {
			var myBounds1 = obj.geometricBounds;
			var Y1 = myBounds1[0];
			var X1 = myBounds1[1];
			var Y2 = myBounds1[2];
			var X2 = myBounds1[3];

			var myBounds_fit = obj.geometricBounds;
			var Y1f = myBounds_fit[0];
			var X1f = myBounds_fit[1];
			var Y2f = myBounds_fit[2];
			var X2f = myBounds_fit[3];
			var ow_fit = obj.geometricBounds[3] - obj.geometricBounds[1];
			var oh_fit = obj.geometricBounds[2] - obj.geometricBounds[0];

			if (Y1f < m_top) {
				var caseY1 = m_top;
			} else {
				var caseY1 = Y1;
			}

			if (X1f < m_left) {
				var caseX1 = m_left;
			} else {
				var caseX1 = X1;
			}

			if (Y2f > h_t - m_top) {
				var caseY2 = h_t - m_top;
			} else {
				var caseY2 = Y2;
			}

			if (X2f > w_t - m_right) {
				var caseX2 = w_t - m_right;
			} else {
				var caseX2 = X2;
			}

			obj.geometricBounds = [caseY1, caseX1, caseY2, caseX2];
			app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
		}
	}

	app.activeDocument.viewPreferences.horizontalMeasurementUnits =
		app.activeDocument.viewPreferences.verticalMeasurementUnits =
		MeasurementUnits.millimeters;
};
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");
