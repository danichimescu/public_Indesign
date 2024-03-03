if (app.selection.length == 2) {
    a = app.selection[0];
    b = app.selection[1];
    if (a instanceof TextFrame && b instanceof TextFrame) {
        if (a.geometricBounds[0] > b.geometricBounds[0]) {
            a = app.selection[1];
            b = app.selection[0];
        } else
            if (a.geometricBounds[0] == b.geometricBounds[0] && a.geometricBounds[1] > b.geometricBounds[1]) {
                a = app.selection[1];
                b = app.selection[0];
            }
        if (a.nextTextFrame == null && b.previousTextFrame == null)
            a.nextTextFrame = b;
        else
            alert("“Oops …”");
    } else
        alert("“Oops …”");
} else
    alert("“Please select two text frames”");