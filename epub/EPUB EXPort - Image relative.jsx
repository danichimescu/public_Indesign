
/////8888888888***************** - pt export epub cu breakdocument

mDoc = app.documents[0];

var myFile_Cale = app.documents[0].filePath.fsName;
var myFileName = app.activeDocument.name;
var finalFileName = myFileName.replace(".indd", "");


// var myFileName_full_length = myFileName_full.length
// var myFileName_length = myFileName.length
var myFileName = app.documents[0].name + "";
var myFileName = myFileName.substr(0, myFileName.lastIndexOf("."));
var myFileName = myFileName.replace(".indd", "");

alert("my file name "+myFileName)


var myFile_Cale = app.documents[0].filePath.fsName;
// // alert("myFile_Cale "+myFile_Cale)

var filejpgName = decodeURI(app.activeDocument.filePath.name)
// alert("filejpgName:  "+filejpgName)

// var caleNamejpgCover = myFile_Cale +"\\" +filejpgName + "_ebook.jpg"
var caleNamejpgCover = myFile_Cale +"\\" +filejpgName + ".jpg"
alert(caleNamejpgCover)

var docRef = app.activeDocument;
var metaPrefs = docRef.metadataPreferences;
var metaTitle = metaPrefs.documentTitle; 

with (mDoc.epubExportPreferences) {
    /*SPLIT DOCUMENT*/
    breakDocument = true;
    paragraphStyleName = "";
    // paragraphStyleName = ''; // namnt
    /*VERSION*/
    version = EpubVersion.EPUB2;
  
    epubCover = EpubCover.EXTERNAL_IMAGE
    coverImageFile = caleNamejpgCover
    imageAlignment = ImageAlignmentType.ALIGN_CENTER
    imageExportResolution =  ImageResolution.PPI_150

    tocStyleName = "Cuprins"
    customImageSizeOption = ImageSizeOption.SIZE_RELATIVE_TO_TEXT_FLOW
    imageSpaceAfter = 5
    imageSpaceBefore = 5
    footnotePlacement = EPubFootnotePlacement.FOOTNOTE_AFTER_STORY //FOOTNOTE_AFTER_PARAGRAPH
    
    epubTitle  = metaTitle




    // customImageSizeOption = 
    // ImageSizeOption
    // ImageSizeOption.SIZE_FIXED
    // ImageSizeOption.SIZE_RELATIVE_TO_TEXT_FLOW

    // epubTitle



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

mDoc.save();
var mFile = File(myFile_Cale+"\\"+finalFileName+".epub");
mDoc.exportFile(ExportFormat.EPUB, mFile, false);

// var mFile = File('/Users/rhanot/Downloads/test.epub');
// mDoc.exportFile(ExportFormat.EPUB, mFile, false);