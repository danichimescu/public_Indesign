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
var myFileNameInfo = "info1";

var definitionsFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
// alert("definitionsFile "+definitionsFile);

definitionsFile.open("r");
var countLines = 0;
while (!definitionsFile.eof) {
    countLines++;
    // var numarLinii = countLines_l++;
    var readedLine = definitionsFile.readln().split("\t");//split("\t");
    // var readedLine = definitionsFile.readln().split("\t"); // umplutura ca altfel da eroare
    // if (countLines_l != 0) {
    // var vizibil_W_mmoo = readedLine_l[1].split("x")[0]; // umplutura ca altfel da eroare
    // }
    // alert("readedLine[8] : "+readedLine[8]+"\n"+"readedLine[9] : "+readedLine[9]+"\n"+"readedLine[12] : "+readedLine[14]+"\n"+"readedLine[3] : "+
    // readedLine[3]+"\n"+"readedLine[4] : "+readedLine[4]+"\n"+"readedLine[5] : "+readedLine[5])

    if (countLines == 2) {
        // ==================================================  PROGRESS BAR
        // var finalFileName = readedLine[7];

        var metaTitle = readedLine[7]; // OK
        var mAuthor = readedLine[8]; // OK
        var mEpubPublisher = readedLine[11];  // OK
        var mCreationDate = readedLine[12]; // nu m // OK
        var metaDesc = readedLine[13]; // OK
        // var metaKeys = readedLine[16]+; //Subject este la epub // OK
        var metaKeys = ["", readedLine[15]];
        // var metaKeys = ["test", "metadata"];
        
        

        alert("metaTitle "+metaTitle+" / "+ mAuthor+" / "+metaDesc+" / "+metaKeys+" / "+mCreationDate+" / "+mEpubPublisher)
        inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys,mCreationDate,mEpubPublisher );
    }

    


}
function inputMetaDocumen(metaTitle, mAuthor, metaDesc, metaKeys,mCreationDate,mEpubPublisher ){


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
    var metaPrefsEpub = docRef.epubExportPreferences;
    
    metaPrefs.copyrightStatus = CopyrightStatus.YES;
    metaPrefs.documentTitle = metaTitle;
    // metaPrefs.jobName = mJobName;
    metaPrefs.author = mAuthor;
    metaPrefs.description = metaDesc;


    

    // Document.epubExportPreferences
    // epubPublisher
    // epubDate
    metaPrefsEpub.epubDate = mCreationDate;
    metaPrefsEpub.epubPublisher = mEpubPublisher;
    metaPrefs.copyrightNotice = metaPrefsEpub.epubPublisher;

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