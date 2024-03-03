// Main();

// function Main() {
// The platform-specific full path name for the xlsx-file -- fsName
// If you pass it as a string, make sure to double the backslashes in the path like in the line below
var myDocument = app.activeDocument;
var myPage_length = app.activeDocument.pages.length
var myPages = app.activeDocument.pages
var docRef = app.activeDocument;
var metaPrefs = docRef.metadataPreferences;
var metaPrefsEpub = docRef.epubExportPreferences;
metaPrefs.copyrightStatus = CopyrightStatus.YES;

var myFile_calea = app.activeDocument.filePath.fsName;
var excelFilePath = "c:\\lucru\\ideea\\Partida2\\excelInput\\partida2input.xlsx"
var excelFile = new File(excelFilePath)


var myFile_ID = app.documents[0].filePath.fsName;
// var myFile_calea = myFile_calea.match(/\d\d\d/g);
var myFile_ID = myFile_ID.match(/\d\d\d/);
var myFile_ID = Number(myFile_ID);
var Id_nr = myFile_ID
// alert("myFileNameInfo  "+myFile_ID);

var metaTitle = metaPrefs.documentTitle; // OK
var mAuthor = metaPrefs.author; // OK
//colectie?
// traducator?//
var mEpubPublisher = metaPrefsEpub.epubPublisher;  // OK
var mCreationDate = metaPrefsEpub.epubDate; // nu m // OK
var metaDesc = metaPrefs.description; // OK bisac descr



metaPrefs.documentTitle = metaTitle;
metaPrefs.author = mAuthor;
metaPrefs.description = metaDesc;
metaPrefsEpub.epubDate = mCreationDate; // epub!!!
metaPrefsEpub.epubPublisher = mEpubPublisher;// epub!!!
metaPrefs.copyrightNotice = metaPrefsEpub.epubPublisher;

// metaPrefsEpub.epubDescription = mEpubDescription;
// metaPrefsEpub.epubSubject = mEpubSubject;

// if (metaKeys != undefined) metaKeys=metaPrefs.keywords ;
// if (metaKeys !== undefined) metaPrefs.keywords = metaKeys;

// epubCreator
// epubDate //*
// epubDescription
// epubPublisher //*
// epubRights
// epubSubject
// epubTitle

// var Info_date = []
// var Info_date = [Id_nr, metaTitle, mAuthor, metaDesc, mCreationDate, mEpubPublisher, mEpubDescription, mEpubSubject]
// for (var i = 0; i < Info_date.length; i++) {
// 	line = Info_date[i];
// 	if (line == "") continue;

// 	if (Info_date[i] != null) {

// 	}
// 	if (Info_date[i] != undefined) {
// 		alert("!!")

// 	}

// }

try {
	alert(Id_nr + " \r " + " \r " + "Titlu = " + metaTitle + " \r " + "Autor = " + mAuthor + " \r " + "description = " + metaDesc + 
	" \r " + "CreationDate = " + mCreationDate + " \r "
		+ "EpubPublisher = " + mEpubPublisher + " \r "
		)
} catch (e) {
	alert(e)
}

	// }
