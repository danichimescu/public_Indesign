/*
Export text from indesing document 
export text, image names, document name, and paths
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

//https://www.indesignjs.de/extendscriptAPI/indesign-latest/index.html#ChangeCaseOptions.html
// https://community.adobe.com/t5/indesign-discussions/is-there-a-quick-way-to-find-out-if-a-pageitem-has-image/m-p/8824097
// https://community.adobe.com/t5/indesign-discussions/indesign-script-how-to-select-all-items-simulating-ctrl-a/td-p/10759874

app.scriptPreferences.enableRedraw = false;

app.scriptPreferences.userInteractionLevel =
    UserInteractionLevels.NEVER_INTERACT;

progress = new Window("palette", "Progress", undefined, {
    closeButton: false,
});
progress.t = progress.add("statictext");
progress.t.preferredSize.width = 450;
progress.b = progress.add("progressbar");
progress.b.preferredSize.width = 450;
progress.display = function (message) {
    message && (this.t.text = message);
    this.show();
    this.update();
};
progress.increment = function () {
    this.b.value++;
};
progress.set = function (steps) {
    this.b.value = 0;
    this.b.minvalue = 0;
    this.b.maxvalue = steps;
};

progress.display("Initializing...");
$.sleep(2000);
var data = [];
// var line_data = [];
var data_line = "";
var numeRevista,
    pagina,
    numeArticol,
    descriereArticol,
    imagineNume,
    imagineLink;

var myFile_path = app.activeDocument.filePath;
var myFile_name = app.activeDocument.name;
var myFile_nameNoeExtension = myFile_name.replace(".indd", "");

try {
    var myLayerArrow = app.activeDocument.layers.add({ name: "newLayer_Arrows" });
    app.activeDocument.layers
        .itemByName("newLayer_Arrows")
        .move(LocationOptions.AT_BEGINNING);
} catch (e) {
    app.activeDocument.layers.item("newLayer_Arrows").remove();
    // alert("newLayer_Arrows removed")
    var myLayerArrow = app.activeDocument.layers.add({ name: "newLayer_Arrows" });
    myLayerArrow = app.activeDocument.layers.item("newLayer_Arrows");
    app.activeDocument.layers
        .itemByName("newLayer_Arrows")
        .move(LocationOptions.AT_BEGINNING);
}

try {
    var xMagentanewColor = app.activeDocument.colors.add({
        name: "Magenta", // Name of the color
        model: ColorModel.PROCESS, // Color model (PROCESS or SPOT)
        colorValue: [0, 100, 0, 0], // CMYK or RGB values
    });
} catch (e) { }
try {
    var xYellownewColor = app.activeDocument.colors.add({
        name: "Yellow", // Name of the color
        model: ColorModel.PROCESS, // Color model (PROCESS or SPOT)
        colorValue: [0, 0, 0, 55], // CMYK or RGB values
    });
} catch (e) { }

// transformFauxCapsToUpperCase()

var graphics = app.activeDocument.allGraphics;
var links = app.documents[0].links.everyItem().getElements();

var sourcePages = app.activeDocument.pages;

progress.set(graphics.length);
for (var i = 0; i < graphics.length; i++) {
    app.select(graphics[i].parent);

    try {
        var myObj = graphics[i].parent;

        var numepttest = myObj.graphics[0].itemLink.name;
        var pattern = /Logo/i;
        var containsLogo = pattern.test(numepttest);
        var pattern2 = /Logos/i;
        var containsLogo2 = pattern.test(numepttest);
        // alert("imageName " + imageName + "containsLogo " + containsLogo)

        if (myObj.parentPage !== null && !containsLogo && !containsLogo2) {
            //ok v1
            // alert("image selected")
            // alert("image parentPage\n" + myObj.parentPage + "\npagina.name\n" + myObj.parentPage.name + "\nitemlink\n" + myObj.graphics[0].itemLink.filePath + "\nitemlink name\n" + myObj.graphics[0].itemLink.name)
            // alert("imageName " + imageName + "\ncontainsLogo " + containsLogo)
            var myWorkingPage = myObj.parentPage;
            var myWorkingPageName = myObj.parentPage.name;
            var imagePath = myObj.graphics[0].itemLink.filePath;
            var imageName = myObj.graphics[0].itemLink.name;

            // alert(n + "\t" + j + "\t" + myallPageItems[n].graphics[0].itemLink.filePath)// merge

            progress.display("Get data / image name: " + imageName);
            var numeRevista = app.activeDocument.name + "";
            var pagina = myWorkingPageName;
            var imagineNume = imageName;
            var imagineLink = imagePath;

            selectImageandText(
                myObj,
                myWorkingPage,
                myWorkingPageName,
                numeRevista,
                pagina,
                imagineNume,
                imagineLink
            );

            progress.increment();
        }
    } catch (e) {
        // $.writeln(n + "\t" + e.message)
        // alert(e) // null is not an object
    }
}

function selectImageandText(
    myObj,
    myWorkingPage,
    myWorkingPageName,
    numeRevista,
    pagina,
    imagineNume,
    imagineLink
) {
    var image = myObj; // rectangle with image // Assuming the image is the first page item
    // image.fillColor = "Yellow";
    image.fillColor = "None";
    app.select(image);

    var textFrames = myWorkingPage.textFrames;

    // Calculate the center point of the image
    var imageBounds = image.geometricBounds;
    var imageCenter = [
        (imageBounds[1] + imageBounds[3]) / 2,
        (imageBounds[0] + imageBounds[2]) / 2,
    ];

    // Initialize variables to track the closest text frame and its distance
    var closestTextFrame = null;
    var closestDistance = Number.MAX_VALUE;

    for (var i = 0; i < textFrames.length; i++) {
        // alert(textFrames.length)
        var textFrame = textFrames[i];
        // textFrame.fillColor = "Cyan";
        textFrame.fillColor = "None";
        // alert("pagini text frame si workingpage:\n" + textFrame.parentPage.name + "\n" + myWorkingPageName)
        if (textFrame.parentPage.name == myWorkingPageName) {
            // Get the center point of the text frame
            var textFrameBounds = textFrame.geometricBounds;
            var textFrameCenter = [
                (textFrameBounds[1] + textFrameBounds[3]) / 2,
                (textFrameBounds[0] + textFrameBounds[2]) / 2,
            ];

            //----------------v1: //word.pointSize > 10
            if (textFrameCenter[1] <= imageCenter[1]) {
                var word = textFrame.words[0];
                if (word.pointSize > 10) {
                    var distance = calculateDistance(textFrameCenter, imageCenter);
                    // Check if this text frame is closer than the previous closest one
                    if (distance < closestDistance) {
                        closestTextFrame = textFrame;
                        closestDistance = distance;
                        // alert("distance1: " + distance)
                    }
                }
            }
        }
    }
    // closestTextFrame.fillColor = "Cyan"; // Highlight the closest text frame
    closestTextFrame.fillColor = "None";
    // alert("distance2: " + distance)

    ///----------------------- draw a line:

    var closestTextFrameCenter = [
        (closestTextFrame.geometricBounds[1] +
            closestTextFrame.geometricBounds[3]) /
        2,
        (closestTextFrame.geometricBounds[0] +
            closestTextFrame.geometricBounds[2]) /
        2,
    ];
    var myArr = [
        [imageCenter[0], imageCenter[1]],
        [closestTextFrameCenter[0], closestTextFrameCenter[1]],
    ];

    var doc = app.activeDocument;

    var page = closestTextFrame.parentPage;
    var targetLayer = doc.layers.itemByName("newLayer_Arrows");
    doc.activeLayer = targetLayer;
    var line = page.graphicLines.add();
    line.paths.item(0).entirePath = myArr;
    line.strokeWeight = 3;
    line.strokeColor = "Magenta";
    line.leftLineEnd = ArrowHead.CIRCLE_SOLID_ARROW_HEAD;
    line.rightLineEnd = ArrowHead.CURVED_ARROW_HEAD;

    ///----------------------- draw a line end

    app.select(closestTextFrame);
    // alert("select")

    exportText(
        closestTextFrame,
        myObj,
        myWorkingPage,
        myWorkingPageName,
        numeRevista,
        pagina,
        imagineNume,
        imagineLink
    );
} ////------------------------select image and text END

////------------------------export text from closest text frame
function exportText(
    closestTextFrame,
    myObj,
    myWorkingPage,
    myWorkingPageName,
    numeRevista,
    pagina,
    imagineNume,
    imagineLink
) {
    var mayParaBold = [];
    var mayParaRegular = [];

    for (var i = 0; i < closestTextFrame.words.length; i++) {
        var word = closestTextFrame.words[i];

        // alert(character.fontStyle) //CharacterStyle//
        // Check if the character has a bold character style applied
        if (word.fontStyle !== null && word.fontStyle === "Bold") {
            // alert("bold\n" + word.contents)
            //
            // alert(word.contents)
            // word.fillColor = "Red";
            var toUpBld = word.contents.toUpperCase(); //toLowerCase//toUpperCase
            mayParaBold.push(toUpBld);
        }

        if (word.fontStyle !== null && word.fontStyle === "Regular") {
            // alert("reg\n" + word.contents)
            //
            // alert(word.contents)
            // word.fillColor = "Red";
            var toUpReg = word.contents.toLowerCase();
            mayParaRegular.push(toUpReg);
        }
    }
    var mayParaBoldAll = mayParaBold.join(" ");

    var mayParaRegulardAll = mayParaRegular.join(" ");

    // alert("Text bold found:\n" + mayParaBoldAll + "\nText regular found:\n" + mayParaRegulardAll);
    numeArticol = mayParaBoldAll;
    // alert("numeArticol\n" + numeArticol)
    descriereArticol = mayParaRegulardAll;
    // alert("descriereArticol\n" + descriereArticol)

    var data_line =
        numeRevista +
        "\t" +
        pagina +
        "\t" +
        numeArticol +
        "\t" +
        descriereArticol +
        "\t" +
        imagineNume +
        "\t" +
        imagineLink;
    // alert("data_line\n" + data_line)
    data.push(data_line);
} // exportText(closestTextFrame)

////------------------------export text from closest text frame end

// Function to calculate the distance between two points
function calculateDistance(point1, point2) {
    var dx = point2[0] - point1[0];
    var dy = point2[1] - point1[1];
    //This function calculates the Euclidean distance between two points in a two-dimensional space. wow
    return Math.sqrt(dx * dx + dy * dy);
}

///--------------------write data in a text file

var outputFile = new File(
    myFile_path + "/" + myFile_nameNoeExtension + "_Text_output.txt"
);
outputFile.encoding = "UTF-8";

if (outputFile.exists == true) {
    File(outputFile).remove();
    // alert("file removed")
}

// Open the file for writing
outputFile.open("w");

var rowFirst =
    "nume revista" +
    "\t" +
    "pagina" +
    "\t" +
    "descriere" +
    "\t" +
    "descriere regular" +
    "\t" +
    "nume imagine" +
    "\t" +
    "cale imagine";

// // alert(data[i])
outputFile.write(rowFirst);
outputFile.writeln();

for (var i = 0; i < data.length; i++) {
    var row = data[i];
    // alert(data[i])
    outputFile.write(row); //+ "\r"

    outputFile.writeln();
}

// Close the file
outputFile.close();

app.activeDocument.save();
alert("Output tab-delimited text file has been created!");

function transformFauxCapsToUpperCase() {
    app.findTextPreferences = null;
    app.findTextPreferences.capitalization = Capitalization.allCaps;
    app.findChangeTextOptions.wholeWord = false;
    var myResult = app.activeDocument.findText();

    for (i = myResult.length - 1; i >= 0; i--) {
        // alert(myResult[i].contents)
        makeUpperCase(myResult[i]);
    }

    function makeUpperCase(myText) {
        myText.capitalization = Capitalization.normal;
        myText.changecase(ChangecaseMode.uppercase);
        // myText.insertionPoints[-1].contents = '<\\UC>';
        // myText.insertionPoints[0].contents = '<UC>';
    }
}

function addLine(entirePath) {
    line = page.graphicLines.add(layer, {
        endCap: EndCap.BUTT_END_CAP,
        endJoin: EndJoin.MITER_END_JOIN,
        fillColor: swatchNone,
        leftLineEnd: ArrowHead.NONE,
        miterLimit: 4,
        rightLineEnd: ArrowHead.NONE,
        strokeAlignment: StrokeAlignment.CENTER_ALIGNMENT,
        strokeColor: swatchLine,
        strokeTint: 100,
        strokeWeight: 1,
        overprintStroke: false,
    });
    line.paths[0].entirePath = entirePath;
    return line;
}
