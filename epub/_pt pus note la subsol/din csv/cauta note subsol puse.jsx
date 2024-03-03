var myDocument = app.activeDocument;

var story_cunote = app.selection[0].parentStory;
// alert("Index story cu note " + story_cunote.index)
var indexMystory_cunote = story_cunote.index
// story_cunote.index = 0 // nu se poate
var stories_document = myDocument.stories;
// alert("stories_document " + stories_document.length)

var toate_stories = new Array; // fara story 0 
for (a = 0; a < stories_document.length; a++) { // 0 este story cu note

    if (stories_document[a].index != indexMystory_cunote) {
        // alert(stories_document[a].index)
        toate_stories.push(stories_document[a]);
    }
}

app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.position = Position.SUPERSCRIPT
app.findGrepPreferences.findWhat = "~F"; //"\\d+";// ~F
var myDocument = app.activeDocument;
var found = myDocument.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;

// var found = myDocument.findText();
var maxCounter_note = (found.length) /// 2
alert("nr note " + maxCounter_note)
