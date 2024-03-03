app.scriptPreferences.measurementUnit = MeasurementUnits.PIXELS;
app.generalPreferences.pageNumbering = PageNumberingOptions.absolute;

app.scriptPreferences.enableRedraw = false;
app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.scriptPreferences.enableRedraw = false;

app.documents[0].viewPreferences.horizontalMeasurementUnits = MeasurementUnits.pixels;
app.documents[0].viewPreferences.verticalMeasurementUnits = MeasurementUnits.pixels;

// var myPage = myDocument.pages[0];
var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
var myPageWidth = app.activeDocument.documentPreferences.pageWidth;
var myOldRulerOrigin = app.activeDocument.viewPreferences.rulerOrigin;
app.activeDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
app.activeDocument.zeroPoint = [0, 0];
myPage = app.activeWindow.activePage;

var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages


var myFile_calea = app.documents[0].filePath;
var myFileName_full = app.documents[0].fullName + "";
var myFileName = app.documents[0].name + "";
var myFileNameInfo = "pt export csv";

// var definitionsFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
// alert("definitionsFile "+definitionsFile);

var infoFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
// if (!infoFile.open("r")) { alert("File " + masterFN + ".txt not found."); exit() };
var infoID = [], infoS = [], infoT = [], infoVL = [], infoFN = [];
var infoLine = infoFile.readln().split("\t"); // Skip first line (the header)
var line = 0;
while (!infoFile.eof) {
    infoLine = infoFile.readln().split("\t"); line++;
    if (!infoLine[1] || !infoLine[2] || !infoLine[3] || !infoLine[4] || !infoLine[5] || !infoLine[7]) { // TODO
        alert("Bad data in record " + line + "."); exit();
    }
    // infoID[line] = infoLine[0]; // ID
    // // Safe area/total area
    // var info1 = { width: infoLine[1].replace(/\,/g, "."), height: infoLine[2].replace(/\,/g, ".") };
    // var info2 = { width: infoLine[3].replace(/\,/g, "."), height: infoLine[4].replace(/\,/g, ".") };
    // infoS[line] = { // Safe area
    //     width: Math.min(Number(info1.width), Number(info2.width)) / 0.352777777777778,
    //     height: Math.min(Number(info1.height), Number(info2.height)) / 0.352777777777778
    // }
    // infoT[line] = { // Total size
    //     width: Math.max(Number(info1.width), Number(info2.width)) / 0.352777777777778,
    //     height: Math.max(Number(info1.height), Number(info2.height)) / 0.352777777777778
    // }
    // infoVL[line] = infoLine[6]; // Layout
    // infoFN[line] = infoLine[7]; // Filename
    alert(infoLine[8], infoLine[9], infoLine[12], infoLine[13], infoLine[14], infoLine[16])
}
infoFile.close();
alert(infoLine[8], infoLine[9], infoLine[12], infoLine[13], infoLine[14], infoLine[16])

// alert(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher)


// inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys,mCreationDate,mEpubPublisher );


// }
function inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys, mCreationDate, mEpubPublisher) {


    // savedoc.close(SaveOptions.no);


    /*Metadata information to be returned from a custom dialog***************************************************/
    // var metaTitle = "Title for Publication"; // OK
    // var mAuthor = "Name of Author"; // OK
    // var metaDesc = "Descrirea"; // OK
    // var metaKeys = ["test", "metadata"]; //Subject este la epub // OK
    // var mCreationDate = "20200"; // nu m // OK
    // var mEpubPublisher = "Editura mataaa";  // OK


    // var metaName = "Name of ePub";
    // var mJobName = "Job Name";

    /*Copyright information could be har-coded in script*/
    // var mNotice = "Copyrighted 2013 Your Name";
    // var metaURL = "www.yourURL.com";
    /*Assumes document is open and has been saved*/
    // var docRef = app.documents.item(0); //app.activeDocument;

    var docRef = app.activeDocument;
    var metaPrefs = docRef.metadataPreferences;
    // metaPrefs.copyrightNotice = mNotice;
    metaPrefs.copyrightStatus = CopyrightStatus.YES;
    metaPrefs.documentTitle = metaTitle;
    // metaPrefs.jobName = mJobName;
    metaPrefs.author = mAuthor;
    metaPrefs.description = metaDesc;


    var metaPrefsEpub = docRef.epubExportPreferences;

    // Document.epubExportPreferences
    // epubPublisher
    // epubDate
    metaPrefsEpub.epubDate = mCreationDate;
    metaPrefsEpub.epubPublisher = mEpubPublisher;

    if (metaKeys != undefined) metaPrefs.keywords = metaKeys;
    // if (metaURL != undefined) metaPrefs.copyrightInfoURL = metaURL;


    // var docRef = app.documents.item(0);
    // var myExportPrefs = docRef.epubExportPreferences;
    // myExportPrefs.epubDate = mCreationDate;
    // myExportPrefs.epubPublisher = mEpubPublisher;
    // myExportPrefs.includeDocumentMetadata = true;



    docRef.save();

    myDocument.save();
}