var myDocument = app.activeDocument;

var story_cunote = app.selection[0].parentStory;

var nr_nota_nr = 1;
var nr_nota = nr_nota_nr.toString();
var mEndNotes = myDocument.textFrames.add({ name: "EndNotes" })
for (k = story_cunote.paragraphs.length - 1; k >= 0; k--) {
    // alert(nr_nota+"  "+c)
    if (story_cunote.paragraphs[k].contents.search(/^\[\d+\]/) == 0 ||story_cunote.paragraphs[k].contents.search(nr_nota) == 0 ) { //if (story.paragraphs[k].contents.search(/^\[\d+\]/) == 0) {  ///^/+
        alert("gasit "+nr_nota)
        currPara = story_cunote.paragraphs[k].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory);
        currPara.words[0].remove();
    }
}





// // alert("Index story cu note " + story_cunote.index)
// var indexMystory_cunote = story_cunote.index
// // story_cunote.index = 0 // nu se poate
// var stories_document = myDocument.stories;
// // alert("stories_document " + stories_document.length)

// var toate_stories = new Array; // fara story 0 
// for (a = 0; a < stories_document.length; a++) { // 0 este story cu note

//     if (stories_document[a].index != indexMystory_cunote) {
//         // alert(stories_document[a].index)
//         toate_stories.push(stories_document[a]);
//     }
// }

// app.findGrepPreferences = app.changeGrepPreferences = null;
// app.findGrepPreferences.position = Position.SUPERSCRIPT
// app.findGrepPreferences.findWhat = "\\d+";
// var found = story_cunote.findGrep();
// app.findGrepPreferences = app.changeGrepPreferences = null;

// // var found = myDocument.findText();
// var maxCounter_note = (found.length) /// 2
// alert("nr note " + maxCounter_note)



// var note_gasite = new Array; // IN STORY CU NOTE
// for (e = 0; e < found.length; e++) { // 0 este story cu note

//     note_gasite.push(found[e].contents);

//     // alert(note_gasite[e])
// }
// // check_note()
// function check_note() {
//     for (f = 1; f < maxCounter_note + 1; f++) {
//         var f_text = f + ""
//         if (f_text !== note_gasite[(f - 1)]) {
//             alert("if.. " + f_text + " / " + note_gasite[f])
//             alert("Something is wrong! I found footnote in text = " + note_gasite[f] + "\r" + " for footnote number " + (f + 1))
//             scrieToateNotele()

//             exit()
//         }
//     }
// }
// try {
//     for (b = 0; b < maxCounter_note; b++) {


//         var mEndNotes = myDocument.textFrames.add({ name: "EndNotes" })

//         // var num = 15;
//         // var a = num.toString();

//         var nr_nota_nr = note_gasite[b];
//         var nr_nota = nr_nota_nr.toString();
//         // var nr_nota = b + 1 + "";
//         // alert("nr_nota " + nr_nota)
//         app.findTextPreferences = NothingEnum.nothing;
//         app.changeTextPreferences = NothingEnum.nothing;
//         app.findChangeTextOptions.caseSensitive = false;
//         app.findChangeTextOptions.includeFootnotes = false;
//         app.findChangeTextOptions.includeHiddenLayers = false;
//         app.findChangeTextOptions.includeLockedLayersForFind = false;
//         app.findChangeTextOptions.includeLockedStoriesForFind = false;
//         app.findChangeTextOptions.includeMasterPages = false;
//         app.findChangeTextOptions.wholeWord = true;
//         app.findTextPreferences.position = Position.SUPERSCRIPT
//         app.findTextPreferences.findWhat = nr_nota;



//         app.findGrepPreferences = app.changeGrepPreferences = null;
//         app.findGrepPreferences.position = Position.SUPERSCRIPT
//         app.findGrepPreferences.findWhat = nr_nota;



//         for (c = 0; c < toate_stories.length; c++) {

//             // ///-------- v1
//             // app.findGrepPreferences = app.changeGrepPreferences = null;
//             // app.findGrepPreferences.position = Position.SUPERSCRIPT
//             // app.findGrepPreferences.findWhat = nr_nota;
//             // var found_nr_nota_in_celelaltestory = toate_stories[c].findGrep();

//             // try {

//             //     if (found_nr_nota_in_celelaltestory[0].contents == nr_nota) {
//             //         currPara = found_nr_nota_in_celelaltestory[0].texts[0].paragraphs[0].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory);
//             //         currPara.words[0].remove();
//             //         break;
//             //     }
//             // } catch (e) {
//             //     // alert(e)
//             // }
//             // ///////------ v1


//             // varianta originala
//             // move endnotes to a separate textFrame  
//             for (k = toate_stories[c].paragraphs.length - 1; k >= 0; k--) {
//                 alert(nr_nota+"  "+c)
//                 if (toate_stories[c].paragraphs[k].contents.search(/^/+nr_nota) == 0) { //if (story.paragraphs[k].contents.search(/^\[\d+\]/) == 0) {
//                     currPara = toate_stories[c].paragraphs[k].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory);
//                     currPara.words[0].remove();
//                 }
//             }
//             //--------------------------------------  









//         }
//         app.findGrepPreferences = app.changeGrepPreferences = null;
//         app.findGrepPreferences.position = Position.SUPERSCRIPT
//         app.findGrepPreferences.findWhat = nr_nota; // la final de cuvant + "\\>" - paote sa fie o virgula si nu o mai gaseste

//         mMarkers = story_cunote.findGrep();
//         cIP = mMarkers[0].insertionPoints[0].index;
//         mMarkers[0].remove();
//         story_cunote.footnotes.add(LocationOptions.AFTER, story_cunote.insertionPoints[cIP]);


//         currFoot = story_cunote.footnotes[b];
//         mEndNotes.paragraphs[0].texts[0].move(LocationOptions.AT_END, currFoot.texts[0]); // *******
//         if (story_cunote.footnotes[b].characters[-1].contents == "\r") story_cunote.footnotes[b].characters[-1].remove();

//         mEndNotes.remove();

//         if (nr_nota == maxCounter_note) {
//             alert("done")
//             // exit()
//         }



//     }
// }
// catch (e) {
//     alert(e + "\r" + b)
// }


// function scrieToateNotele() {
//     app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
//     var myDocument = app.activeDocument;
//     var myPage = myDocument.pages[0];
//     var story_cunote = app.selection[0].parentStory;

//     var myFile_calea = app.activeDocument.filePath.fsName;
//     // alert("calea e "+myFile_calea)	
//     var myFileName_full = app.activeDocument.fullName + "";
//     var myFileName = app.activeDocument.name + "";

//     var myFileName_full_length = myFileName_full.length
//     var myFileName_length = myFileName.length

//     app.findGrepPreferences = app.changeGrepPreferences = null;
//     app.findGrepPreferences.position = Position.SUPERSCRIPT
//     app.findGrepPreferences.findWhat = "\\d+";
//     var found = story_cunote.findGrep();
//     app.findGrepPreferences = app.changeGrepPreferences = null;

//     var maxCounter_note = (found.length) // cand NU sunt in acelasi story si notele
//     alert("nr notele " + maxCounter_note)

//     for (i = 0; i < maxCounter_note; i++) {

//         var ceagasit = found[i].contents
//         currPara = found[i].texts[0].paragraphs[0].contents;
//         var message = (i + 1) + " _ " + ceagasit + " = " + currPara + "\r";
//         var path = myFile_calea;
//         var filename = myFileName + "_test_note_" + ".txt"; // merge!
//         var file = new File(path + "/" + filename);
//         // alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)
//         file.encoding = 'UTF-8';

//         if (file.exists) {
//             file.open("e");
//             file.seek(0, 2);
//         }
//         else {
//             file.open("w");
//         }
//         // file.open('w');
//         file.write(message + "\r");
//         file.close();
//     }
// }