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
myDocument.changeText();
//Clear the find/change text preferences after the search.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;