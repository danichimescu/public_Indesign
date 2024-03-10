/*

Copyright 2024 Dan Ichimescu 
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
	for (i = 0; i < app.selection.length; i++) {
		var obj = app.selection[i];

		obj.transparencySettings.blendingSettings.opacity = 75;
	}

	app.activeDocument.viewPreferences.horizontalMeasurementUnits =
		app.activeDocument.viewPreferences.verticalMeasurementUnits =
		MeasurementUnits.millimeters;
};
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");
