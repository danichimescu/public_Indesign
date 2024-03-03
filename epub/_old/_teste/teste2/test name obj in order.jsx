var combineMe = new Array;

for (a = 0; a < app.selection.length; a++) {
    // if (app.selection[a] instanceof TextFrame)
        combineMe.push(app.selection[a]);
}
// combineMe.sort(function (a, b) { 
//     // return (a.geometricBounds[0] < b.geometricBounds[0]) || (a.geometricBounds[0] == b.geometricBounds[0] && a.geometricBounds[1] < b.geometricBounds[1]) ? -1 : 1; });
//     return (a.geometricBounds[0] < b.geometricBounds[0])  ? -1 : 1; });

    combineMe.sort(function (a, b) {

        return Number(a.geometricBounds[0]) - Number(b.geometricBounds[0]);
      
      });


    combineMe[0].name = "00_image_text";
for (a = 1; a < combineMe.length; a++) {

    combineMe[a].name = (a)+"_name";
    // if (combineMe[a].nextTextFrame == null) {
    //     nextFree = a + 1;
    //     while (nextFree < combineMe.length && combineMe[nextFree].previousTextFrame != null)
    //         nextFree++;
    //     if (nextFree < combineMe.length) {
    //         // Add Frame Break when needed:
    //         if (combineMe[a].characters[-1].contents != SpecialCharacters.FRAME_BREAK) {
    //             if (combineMe[a].characters[-1].contents == "r")
    //                 combineMe[a].characters[-1].contents = SpecialCharacters.FRAME_BREAK;
    //             else
    //                 combineMe[a].insertionPoints[-1].contents = SpecialCharacters.FRAME_BREAK;
    //         }
    //         combineMe[a].nextTextFrame = combineMe[nextFree];
    //     }
    // }
}
// alert()