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



/*Metadata information to be returned from a custom dialog*/
var metaTitle = "Title for Publication";
var metaName = "Name of ePub";
var mAuthor = "Name of Author";
var metaDesc = "Descrirea";
var metaKeys = ["test", "metadata"]; //Subject este la epub
var mJobName = "Job Name";
var mCreationDate = "20200"; // nu m
var mEpubPublisher = "Editura mataaa"; 


/*Copyright information could be har-coded in script*/
var mNotice = "Copyrighted 2013 Your Name";
var metaURL = "www.yourURL.com";
/*Assumes document is open and has been saved*/
var docRef = app.documents.item(0);
var metaPrefs = docRef.metadataPreferences;
metaPrefs.copyrightNotice = mNotice;
metaPrefs.copyrightStatus = CopyrightStatus.YES;
metaPrefs.documentTitle = metaTitle;
metaPrefs.jobName = mJobName;
metaPrefs.author = mAuthor;
metaPrefs.description = metaDesc;


var metaPrefsEpub = docRef.epubExportPreferences;

// Document.epubExportPreferences
// epubPublisher
// epubDate
metaPrefsEpub.epubDate = mCreationDate;
metaPrefsEpub.epubPublisher = mEpubPublisher;

if (metaKeys != undefined) metaPrefs.keywords = metaKeys;
if (metaURL != undefined) metaPrefs.copyrightInfoURL = metaURL;


// var docRef = app.documents.item(0);
// var myExportPrefs = docRef.epubExportPreferences;
// myExportPrefs.epubDate = mCreationDate;
// myExportPrefs.epubPublisher = mEpubPublisher;
// myExportPrefs.includeDocumentMetadata = true;



docRef.save();

 myDocument.save();
// savedoc.close(SaveOptions.no);
