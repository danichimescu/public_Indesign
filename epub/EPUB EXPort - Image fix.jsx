
/////8888888888***************** - pt export epub cu breakdocument

mDoc = app.documents[0];

var myFile_Cale = app.documents[0].filePath.fsName;
var myFileName = app.activeDocument.name;
var finalFileName = myFileName.replace(".indd", "");
// alert("myFile_Cale "+myFile_Cale)

var filejpgName = decodeURI(app.activeDocument.filePath.name)
// alert("filejpgName:  "+filejpgName)

// var caleNamejpgCover = myFile_Cale + "\\" + filejpgName + "_ebook.jpg"
var caleNamejpgCover = myFile_Cale + "\\" + filejpgName + ".jpg"
alert(caleNamejpgCover)

var docRef = app.activeDocument;
var metaPrefs = docRef.metadataPreferences;
var metaTitle = metaPrefs.documentTitle; 

with (mDoc.epubExportPreferences) {
    /*SPLIT DOCUMENT*/
    breakDocument = true;
    // paragraphStyleName = ''; // 
    paragraphStyleName = "";
    /*VERSION*/
    version = EpubVersion.EPUB2;

    epubCover = EpubCover.EXTERNAL_IMAGE
    coverImageFile = caleNamejpgCover
    imageAlignment = ImageAlignmentType.ALIGN_CENTER
    imageExportResolution = ImageResolution.PPI_150

    tocStyleName = "Cuprins"
    customImageSizeOption = ImageSizeOption.SIZE_FIXED
    imageSpaceAfter = 5
    imageSpaceBefore = 5
    footnotePlacement = EPubFootnotePlacement.FOOTNOTE_AFTER_STORY  //_AFTER_PARAGRAPH

    epubTitle  = metaTitle

    // customImageSizeOption = 
    // ImageSizeOption
    // ImageSizeOption.SIZE_FIXED
    // ImageSizeOption.SIZE_RELATIVE_TO_TEXT_FLOW



    // imageAlignment = 
    // ImageAlignmentType
    // ImageAlignmentType.ALIGN_LEFT
    // ImageAlignmentType.ALIGN_CENTER
    // ImageAlignmentType.ALIGN_RIGHT
    // footnotePlacement = 
    // EPubFootnotePlacement
    // EPubFootnotePlacement.FOOTNOTE_AFTER_STORY
    // EPubFootnotePlacement.FOOTNOTE_AFTER_PARAGRAPH
    // EPubFootnotePlacement.FOOTNOTE_INSIDE_POPUP



}
// var mFile = File('/Users/rhanot/Downloads/test.epub');
// mDoc.exportFile(ExportFormat.EPUB, mFile, false);
mDoc.save();
var mFile = File(myFile_Cale+"\\"+finalFileName+".epub");
mDoc.exportFile(ExportFormat.EPUB, mFile, false);