var combineMe = new Array;

for (a = 0; a < app.selection.length; a++) {
    if (app.selection[a] instanceof TextFrame)
        combineMe.push(app.selection[a]);
}
combineMe.sort(function (a, b) {
    return (a.geometricBounds[0] < b.geometricBounds[0]) || (a.geometricBounds[0] == b.geometricBounds[0] && a.geometricBounds[1] < b.geometricBounds[1]) ? -1 : 1;
});

for (a = 0; a < combineMe.length - 1; a++) {
    if (combineMe[a].nextTextFrame == null) {
        nextFree = a + 1;
        while (nextFree < combineMe.length && combineMe[nextFree].previousTextFrame != null)
            nextFree++;
        if (nextFree < combineMe.length) {
            // Add Frame Break when needed:
            if (combineMe[a].characters[-1].contents != SpecialCharacters.FRAME_BREAK) {
                if (combineMe[a].characters[-1].contents == "r")
                    combineMe[a].characters[-1].contents = SpecialCharacters.FRAME_BREAK;
                else
                    combineMe[a].insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
            }
            combineMe[a].nextTextFrame = combineMe[nextFree];
        }
    }
}