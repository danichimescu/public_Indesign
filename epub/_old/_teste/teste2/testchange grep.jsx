var myDocument = app.activeDocument;
myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(-1).contents = "##";
// myNote.texts[0].contents = "##";
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// app.findGrepPreferences.findWhat = ".\z";
app.findGrepPreferences.findWhat = "##";
app.changeGrepPreferences.changeTo = "\r~c"; //\r
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// app.select(myDocument.textFrames.itemByName("image_text").parentStory.insertionPoints.item(0));
myDocument.textFrames.itemByName("image_text").parentStory.changeGrep();