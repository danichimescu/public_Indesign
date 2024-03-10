/*
Some useful function for
Export text from indesing document 

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

var w = new Window("dialog");
w.alignChildren = "left";
w.orientation = "column";
// w.alignChildren = "top";
var check1 = w.add("checkbox", undefined, "remove Duplicate Graphics");
var check8 = w.add(
    "checkbox",
    undefined,
    "Remove duplicate from selected image"
);
var check2 = w.add(
    "checkbox",
    undefined,
    "remove A TextFrame Which Start With a Word"
);
var myText = w.add("edittext", undefined, "valabilitate");
myText.characters = 20;
var check3 = w.add(
    "checkbox",
    undefined,
    "remove A TextFrame Which Start With any Number and a specific Word"
);
var myTextwithNumber = w.add("edittext", undefined, "spălări");
myTextwithNumber.characters = 20;
var check4 = w.add(
    "checkbox",
    undefined,
    "remove Graphics with Three Times Duplicate"
);
var check5 = w.add(
    "checkbox",
    undefined,
    "remove a Graphic with a specific name"
);
var myGraphicName = w.add("edittext", undefined, "name of graphic");
myGraphicName.characters = 20;
var check6 = w.add("checkbox", undefined, "addcolor");
var myColorGroup = w.add("group");
// myButtonGroup.orientation = "column";
myColorGroup.alignment = "left";
var myColorName = myColorGroup.add("edittext", undefined, "my color name");
myColorName.characters = 20;
myColorGroup.add('statictext {text: "Enter a numbers for cmyk value:"}');
var myColorC = myColorGroup.add("edittext", undefined, "0");
myColorC.characters = 5;
var myColorM = myColorGroup.add("edittext", undefined, "0");
myColorM.characters = 5;
var myColorY = myColorGroup.add("edittext", undefined, "0");
myColorY.characters = 5;
var myColorB = myColorGroup.add("edittext", undefined, "50");
myColorB.characters = 5;
var check7 = w.add("checkbox", undefined, "Autosizing text Height and Width"); //AutoSizingTypeEnum.HEIGHT_AND_WIDTH

var check9 = w.add("checkbox", undefined, "Remove embeded images");

var myButtonGroup = w.add("group");

myButtonGroup.alignment = "right";
myButtonGroup.add("button", undefined, "OK");
myButtonGroup.add("button", undefined, "Cancel");

w.show();
if (check9.value == true) {
    // alert("check1.value")

    removeEmbeded();
}
function removeEmbeded() {
    var doc = app.activeDocument;
    var graphics = doc.allGraphics;
    var embeddedGraphics = [];
    // app.select(graphics[0])
    // if (graphics[0].itemLink == null) {
    //     alert("nulll")
    //     graphics[0].parent.remove()
    // }
    // for (var i = graphics.length - 1; i >= 0; i--) {
    for (var i = 0; i < graphics.length; i++) {
        // graphics[i].itemLink.status == LinkStatus.LINK_EMBEDDED         ||
        if (graphics[i].itemLink == null) {
            // graphics[i].parent.remove() // error - is mai multe imagini intr un rectangle si da eroare, dupa ce sterge
            graphics[i].remove();
        }
    }
}
if (check8.value == true) {
    // alert("check1.value")

    removeDuplicateFromSelectedImage();
}
function removeDuplicateFromSelectedImage() {
    var tf = app.selection[0];
    var imageName = tf.graphics[0].itemLink.name;
    var doc = app.activeDocument;
    var specificName = imageName;
    var links = doc.links;
    var link, image;
    for (var i = links.length - 1; i >= 0; i--) {
        if (links[i].hasOwnProperty("relink")) {
            try {
                link = links[i];
                image = link.parent.parent;
                imageName = link.name;
                // alert(imageName)
                if (imageName == specificName) {
                    image.remove();
                }
            } catch (err) {
                // $.writeln(i + " - " + err);
                // alert(i + " - " + err);
            }
        }
    }
}

function removeSelectedImage() {
    var tf = app.selection[0];
    var imageName = tf.graphics[0].itemLink.name;

    var doc = app.activeDocument;
    var specificName = imageName;
    // alert(imageName)

    var Mypage = tf.parentPage.name;

    try {
        // Iterate through all graphics in the document // this backward itteration is not changing the indices of collection!!!!
        for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
            var graphic = doc.allGraphics[i];

            if (graphic.itemLink.name == specificName) {
                graphic.parent.remove();
                // graphic.remove();
            }
        }
    } catch (e) {
        alert(e + "\nerror at line: " + e.line);
    } // + "\nat page:" + Mypage
}
if (check7.value == true) {
    // alert("check1.value")
    autosizingText();
}
function autosizingText() {
    var tf = app.selection[0];

    var props = {
        autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT, //TOP_CENTER_POINT, TOP_LEFT_POINT
        autoSizingType: AutoSizingTypeEnum.WIDTH_ONLY, //AutoSizingTypeEnum.HEIGHT_AND_WIDTH, //AutoSizingTypeEnum.WIDTH_ONLY
        useNoLineBreaksForAutoSizing: false,
        verticalJustification: VerticalJustification.TOP_ALIGN,
    };

    tf.textFramePreferences.properties = props;
}
if (check1.value == true) {
    // alert("check1.value")
    removeGrapicsDuplicate();
}
if (check2.value == true) {
    // alert("check2.value")
    removeATextFrameWhichStartWithaWord(myText);
}
if (check3.value == true) {
    // alert("check3.value")
    removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber);
}
if (check4.value == true) {
    // alert("check4.value")
    removeGrapicsThreeTimesDuplicate();
}
if (check5.value == true) {
    // alert("check5.value")
    removeGrapicsWithName(myGraphicName);
}
if (check6.value == true) {
    // alert("check6.value")
    addcolor(myColorName, myColorC, myColorM, myColorY, myColorB);
}

function removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber) {
    // 20 spalari
    var keyWord = myTextwithNumber.text;
    // var keyWord = "spălări";

    var doc = app.activeDocument;

    // var pattern = /^[0-9]+\s*spălări/i;

    var pattern = new RegExp("^\\d+\\s+" + keyWord, "i");

    for (var i = doc.textFrames.length - 1; i >= 0; i--) {
        var textFrame = doc.textFrames[i];

        if (pattern.test(textFrame.contents)) {
            textFrame.remove();
        }
    }
}

function removeATextFrameWhichStartWithaWord(myText) {
    //valabilitate

    // var keyWord = "valabilitate";
    var keyWord = myText.text;

    var doc = app.activeDocument;

    for (var i = doc.textFrames.length - 1; i >= 0; i--) {
        var textFrame = doc.textFrames[i];

        if (textFrame.contents.indexOf(keyWord) === 0) {
            textFrame.remove();
        }
    }
    alert("done");
}

function removeGrapicsThreeTimesDuplicate() {
    var doc = app.activeDocument;

    var graphicNames = {};

    for (var i = 0; i < doc.allGraphics.length; i++) {
        var graphic = doc.allGraphics[i];

        var graphicName = graphic.itemLink.name;

        if (graphicNames[graphicName]) {
            graphicNames[graphicName]++;
        } else {
            graphicNames[graphicName] = 1;
        }
    }

    for (var name in graphicNames) {
        if (graphicNames[name] > 3) {
            for (var i = 0; i < doc.allGraphics.length; i++) {
                var graphic = doc.allGraphics[i];
                if (graphic.itemLink.name === name) {
                    graphic.parent.remove();
                }
            }
        }
    }
}

function removeGrapicsWithName(myGraphicName) {
    var specificName = myGraphicName.text;

    var doc = app.activeDocument;

    for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
        var graphic = doc.allGraphics[i];

        if (graphic.itemLink.name === specificName) {
            graphic.parent.remove();
        }
    }
}

function removeGrapicsDuplicate() {
    var doc = app.activeDocument;

    var graphicNames = {};

    try {
        for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
            var graphic = doc.allGraphics[i];

            var graphicName = graphic.itemLink.name;
            var Mypage = graphic.parent.parentPage.name;

            if (graphicNames[graphicName]) {
                graphic.parent.remove();
            } else {
                graphicNames[graphicName] = true;
            }
        }
    } catch (e) {
        alert(e + "\nerror at line: " + e.line + "\nat page:" + Mypage);
    }
}

function addcolor(myColorName, myColorC, myColorM, myColorY, myColorB) {
    var c = Number(myColorC.text);
    var m = Number(myColorM.text);
    var y = Number(myColorY.text);
    var b = Number(myColorB.text);
    var MyColorName = myColorName.text;

    try {
        var newColor = app.activeDocument.colors.add({
            name: MyColorName, // Name of the color
            model: ColorModel.PROCESS, // Color model (PROCESS or SPOT)
            // colorValue: [0, 0, 0, 55], // CMYK or RGB values
            colorValue: [c, m, y, b], // CMYK or RGB values
        });
    } catch (e) {
        alert(e);
    }
}
