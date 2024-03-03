var keyInc = app.activeDocument.viewPreferences.cursorKeyIncrement; // read
app.activeDocument.viewPreferences.cursorKeyIncrement = "4mm"; // write
app.activeDocument.viewPreferences.horizontalMeasurementUnits= +MeasurementUnits.MILLIMETERS; 
app.activeDocument.viewPreferences.verticalMeasurementUnits= +MeasurementUnits.MILLIMETERS;

