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

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;

var myPage = app.activeWindow.activePage;
var myPage_n = app.activeWindow.activePage.name;


app.scriptPreferences.enableRedraw = false;

app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;





var main = function () {


	var anchor = app.activeWindow.transformReferencePoint;
	var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
	var bleedPagina = myBleeed_;
	var latura_patrat_samsung;
	var W_logoSamsung;
	var samsungcom;


	b_pgebounds = myPage.bounds;

	Wp = b_pgebounds[3] - b_pgebounds[1];
	Hp = b_pgebounds[2] - b_pgebounds[0];
	Wp_mm = (b_pgebounds[3] - b_pgebounds[1]) / 2.8346438836889;
	Hp_mm = (b_pgebounds[2] - b_pgebounds[0]) / 2.8346438836889;


	var mypagY1 = b_pgebounds[0];
	var mypagX1 = b_pgebounds[1];
	var mypagY2 = b_pgebounds[2];
	var mypagX2 = b_pgebounds[3];


	var logoSamsung = app.activeDocument.rectangles.itemByName("logoSamsung");
	var samsungcom = app.activeDocument.rectangles.itemByName("samsungcom");


	latura_patrat_samsung = Wp * 0.04



	m_top = latura_patrat_samsung
	m_left = latura_patrat_samsung
	m_right = m_left
	m_bottom = m_top


	myPage.marginPreferences.properties = {
		top: m_top,
		left: m_left,
		right: m_right,
		bottom: m_bottom
	};
	if (Wp > Hp) {
		W_logoSamsung = (Wp - latura_patrat_samsung * 2) / 5
	} else {
		W_logoSamsung = (Wp - latura_patrat_samsung * 2) / 4
	}
	alert("logoSamsung = " + W_logoSamsung / 2.83464567)

	b_logoSamsung = logoSamsung.geometricBounds;
	b_samsungcom = samsungcom.geometricBounds;



	var myScomY1 = b_samsungcom[0];
	var myScomX1 = b_samsungcom[1];
	var myScomY2 = b_samsungcom[2];
	var myScomX2 = b_samsungcom[3];



	var mySY1 = b_logoSamsung[0];
	var mySX1 = b_logoSamsung[1];
	var mySY2 = b_logoSamsung[2];
	var mySX2 = b_logoSamsung[3];

	var W_real_logoSamsung = b_logoSamsung[3] - b_logoSamsung[1];
	var W_real_samsungcom = b_samsungcom[3] - b_samsungcom[1];



	var pw = W_logoSamsung / W_real_logoSamsung;
	var ph = pw;
	var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
	logoSamsung.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);

	app.activeDocument.align(logoSamsung, AlignOptions.TOP_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
	app.activeDocument.align(logoSamsung, AlignOptions.LEFT_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);

	var pw = W_logoSamsung / W_real_samsungcom;
	var ph = pw;
	var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
	samsungcom.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);

	app.activeDocument.align(samsungcom, AlignOptions.BOTTOM_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
	app.activeDocument.align(samsungcom, AlignOptions.RIGHT_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);

	logoSamsung.redefineScaling([1, 1]);
	samsungcom.redefineScaling([1, 1]);



	app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;




}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");