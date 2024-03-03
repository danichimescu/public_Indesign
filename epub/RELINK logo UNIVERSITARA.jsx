/*
luat de aici // modificat 
Links Rename Selected
Copyright 2019 William Campbell
All Rights Reserved
Questions, comments, or custom programming, contact:
    william@marspremedia.com
    willcampbell7@gmail.com
    https://www.marspremedia.com/contact

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

//@target indesign

(function () {

    var doc;
    var ext;
    var file;
    var fileNew;
    var link;
    var name;
    var nameNew;
    var objectType;
    var selection;

    if (!app.documents.length) {
        alert("Open a document.");
        return;
    }
    doc = app.activeDocument;

    if (doc.selection[0]) {
        selection = doc.selection[0];
        objectType = selection.constructor.name;
        if (objectType == "Image" || objectType == "Rectangle") {
            // Selection is or could be an image.
            if (objectType == "Image" || selection.allGraphics[0].constructor.name == "Image") {
                // Selection is image.
                if (objectType == "Image") {
                    link = selection.itemLink;
                } else {
                    link = selection.allGraphics[0].itemLink;
                }
				
					// var nameNew = "Ideea.tif";
                    //d:\\lucru\\_ed universitara\\_Links\\logoUniv.png
					var newPath = "d:\\lucru\\_ed universitara\\_Links\\logoUniv.png" 
			
                    // Rename and relink.
                    file = new File(newPath); //file = new File(link.filePath);
                    // file.rename(nameNew);
                    link.relink(file);
                    link.update();
                // }
                return;
            }
        }
    }
    alert("Select an image or its frame.");

})();