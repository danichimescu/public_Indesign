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
var myPage = myDocument.pages[0];

app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;





var main = function () {


	var anchor = app.activeWindow.transformReferencePoint;
	var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
	var bleedPagina = myBleeed_

	b_pgebounds = myPage.bounds;

	Wp = b_pgebounds[3] - b_pgebounds[1];
	Hp = b_pgebounds[2] - b_pgebounds[0];

	var mypagY1 = b_pgebounds[0];
	var mypagX1 = b_pgebounds[1];
	var mypagY2 = b_pgebounds[2];
	var mypagX2 = b_pgebounds[3];

	var jumatepaginaW = (Wp / 2) - (Wp * 0.05)
	var jumatepaginaH = (Hp / 2) - (Hp * 0.05)
	var zonademijlocpaginaW = (Wp * 0.33)
	var zonademijlocpaginaH = (Hp * 0.33)

	var Y1H = (Hp - (Hp * 0.33)) / 2
	var X1H = 0
	var Y2H = (Hp * 0.33) + Y1H
	var X2H = Wp

	var Y1V = 0
	var X1V = (Wp - (Wp * 0.33)) / 2
	var Y2V = Hp
	var X2V = (Wp * 0.33) + X1V


	var obj_select = app.selection;



	for (i = 0; i < app.selection.length; i++) {
		var obj = app.selection[i];




		if (obj instanceof Rectangle) {




			var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
			var oh = obj.geometricBounds[2] - obj.geometricBounds[0];

			var myBounds1 = obj.geometricBounds;
			var Y1 = myBounds1[0];
			var X1 = myBounds1[1];
			var Y2 = myBounds1[2];
			var X2 = myBounds1[3];
			obj.fit(FitOptions.frameToContent);

			var myBounds_fit = obj.geometricBounds;
			var Y1f = myBounds_fit[0];
			var X1f = myBounds_fit[1];
			var Y2f = myBounds_fit[2];
			var X2f = myBounds_fit[3];
			var ow_fit = obj.geometricBounds[3] - obj.geometricBounds[1]
			var oh_fit = obj.geometricBounds[2] - obj.geometricBounds[0];


			if (Y1f < -bleedPagina) {
				var caseY1 = -bleedPagina;

			} else {


				if (Y1f > -bleedPagina && Y1f < (Hp * 0.05)) {
					alert("ALERT! - INALTIMEA NU ARE BLEED \rsau e in 5% de margine")

















					var caseY1 = -bleedPagina;
				} else {
					var caseY1 = Y1;
				}
			}

			if (X1f < -bleedPagina) {
				var caseX1 = -bleedPagina;

			} else {
				if (X1f > -bleedPagina && X1f < (Wp * 0.05)) {
					alert("ALERT! - LUNGIMEA - W, NU ARE BLEED \rsau e in 5% de margine")















					var caseX1 = -bleedPagina;
				} else {
					var caseX1 = X1;
				}
			}

			if (Y2f > Hp + bleedPagina) {
				var caseY2 = Hp + bleedPagina;

			} else {

				if (Y2f < Hp + bleedPagina && Y2f > Hp - (Hp * 0.05)) {
					alert("ALERT! - INALTIMEA NU ARE BLEED \rsau e in 5% de margine")








					var dif = Hp + bleedPagina - Y2f
					var H_final = oh_fit + dif
					var ph = H_final / oh_fit

					var pw = ph
					app.layoutWindows[0].transformReferencePoint = AnchorPoint.TOP_CENTER_ANCHOR;
					resizeObiect(pw, ph);








					var caseY2 = Hp + bleedPagina;
				} else {
					var caseY2 = Y2;
				}
			}

			if (X2f > Wp + bleedPagina) {
				var caseX2 = Wp + bleedPagina;

			} else {
				if (X2f < Wp + bleedPagina && X2f > Wp - (Wp * 0.05)) {
					alert("ALERT! - LUNGIMEA - W, NU ARE BLEED \rsau e in 5% de margine")









					var dif = Wp + bleedPagina - X2f
					var W_final = ow_fit + dif

					var ph = W_final / ow_fit

					var pw = ph
					app.layoutWindows[0].transformReferencePoint = AnchorPoint.LEFT_CENTER_ANCHOR;
					resizeObiect(pw, ph);







					var caseX2 = Wp + bleedPagina
				} else {
					var caseX2 = X2;
				}
			}

			obj.geometricBounds = [caseY1, caseX1, caseY2, caseX2];
			app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;


			function resizeObiect(pw, ph) {

				app.documents.item(0).viewPreferences.rulerOrigin = RulerOrigin.SPINE_ORIGIN;
				app.documents.item(0).zeroPoint = [0, 0];
				myPage.layoutRule = LayoutRuleOptions.OFF;
				var anchor = app.activeWindow.transformReferencePoint;

				var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
				obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);


			}

		}

	}


	app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;




}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");