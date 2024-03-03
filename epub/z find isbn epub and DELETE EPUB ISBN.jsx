var myDocument = app.activeDocument;
//Clear the find/change text preferences.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
//Set the find options.
app.findChangeTextOptions.caseSensitive = false;
app.findChangeTextOptions.includeFootnotes = false;
app.findChangeTextOptions.includeHiddenLayers = false;
app.findChangeTextOptions.includeLockedLayersForFind = false;
app.findChangeTextOptions.includeLockedStoriesForFind = false;
app.findChangeTextOptions.includeMasterPages = false;
app.findChangeTextOptions.wholeWord = false;
//Search the document for the string "copy" and change it to "text".
app.findTextPreferences.findWhat = "Editori: Aura Christi & Andrei Potlog";
app.changeTextPreferences.changeTo = "";
try{
myDocument.changeText();
} catch(e){

}
//Clear the find/change text preferences after the search.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;



//Clear the find/change grep preferences.
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
//Set the find options.
app.findChangeGrepOptions.includeFootnotes = false;
app.findChangeGrepOptions.includeHiddenLayers = false;
app.findChangeGrepOptions.includeLockedLayersForFind = false;
app.findChangeGrepOptions.includeLockedStoriesForFind = false;
app.findChangeGrepOptions.includeMasterPages = false;
//Regular expression for finding an email address.
// app.findGrepPreferences.findWhat = "Ediţie Digitală \(epub\)/rISBN \d+-\d+-\d+-\d+-\d+";
app.findGrepPreferences.findWhat = "Ediţie Digitală \\(epub\\)\\rISBN \\d+-\\d+-\\d+-\\d+-\\d+";
app.changeGrepPreferences.changeTo="";
// app.findGrepPreferences.changeTo = 
//Apply the change to 24-point text only.
// app.findGrepPreferences.pointSize = 24;
// app.changeGrepPreferences.underline = true;
app.selection[0].changeGrep();
// myDocument.changeGrep();
//Clear the find/change preferences after the search.
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;