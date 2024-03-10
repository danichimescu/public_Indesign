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

var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
app.activeDocument.viewPreferences.horizontalMeasurementUnits =
	app.activeDocument.viewPreferences.verticalMeasurementUnits =
	MeasurementUnits.millimeters;

var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
var bleedPagina = myBleeed_;

b_pgebounds = myPage.bounds;

Wp = b_pgebounds[3] - b_pgebounds[1];
Hp = b_pgebounds[2] - b_pgebounds[0];

var main = function () {
	for (i = 0; i < app.selection.length; i++) {
		var myObject = app.selection[i];

		var fitobiect1 = [
			-bleedPagina,
			-bleedPagina,
			Hp + bleedPagina,
			Wp + bleedPagina,
		];
		myObject.geometricBounds = fitobiect1;
		app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
	}
};
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");
