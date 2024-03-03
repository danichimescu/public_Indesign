var myDocument = app.activeDocument;

var story_cunote = app.selection[0].parentStory;
// alert("Index story cu note " + story_cunote.index)
var indexMystory_cunote = story_cunote.index
// story_cunote.index = 0 // nu se poate
var stories_document = myDocument.stories;
// alert("stories_document " + stories_document.length)

// var toate_stories = new Array; // fara story 0 
// for (a = 0; a < stories_document.length; a++) { // 0 este story cu note

//     if (stories_document[a].index != indexMystory_cunote) {
//         // alert(stories_document[a].index)
//         toate_stories.push(stories_document[a]);
//     }
// }


app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.position = Position.SUPERSCRIPT
app.findGrepPreferences.findWhat = "\\d+";
var found = story_cunote.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = null;

// var found = myDocument.findText();
var maxCounter_note = (found.length) /// 2
alert("nr note " + maxCounter_note)

var index_note_renumoratate = 14+maxCounter_note-1


for (k = story_cunote.paragraphs.length - 1; k >= 0; k--) {
    // alert(nr_nota+"  "+c)
    if (story_cunote.paragraphs[k].contents.search(/^\d+/) == 0 ) { // || story_cunote.paragraphs[k].contents.search(nr_nota) == 0  //if (story.paragraphs[k].contents.search(/^\[\d+\]/) == 0) {
        // currPara = story_cunote.paragraphs[k].move(LocationOptions.AT_BEGINNING, mEndNotes.parentStory);
        var nr_nota = index_note_renumoratate.toString();
        currPara = story_cunote.paragraphs[k]
        // currPara.words[0].remove();
        currPara.words[0].contents=nr_nota;
        index_note_renumoratate--
        // alert("k = "+k+" nr nota  "+nr_nota+"  index nota "+index_note_renumoratate)
    }
}


// var note_gasite = new Array; // IN STORY CU NOTE
// for (e = 0; e < found.length; e++) { // 0 este story cu note

//     note_gasite.push(found[e].contents);

//     // alert(note_gasite[e])
// }

// note_gasite.sort(function (a, b) { return a - b });


// var index_note_renumoratate = 14+maxCounter_note


// for (e = found.length; e >=1 ; e--) { // 0 este story cu note  //e = 0; e < found.length; e++

//     var nr_nota = index_note_renumoratate.toString();
//     app.findGrepPreferences = app.changeGrepPreferences = null;
//     app.findGrepPreferences.position = Position.SUPERSCRIPT
//     app.findGrepPreferences.findWhat = "^"+(e);//"^(\\d+)";
//     app.changeGrepPreferences.changeTo = nr_nota;
//     // var found = story_cunote.findGrep();
//     var found = story_cunote.changeGrep();
//     app.findGrepPreferences = app.changeGrepPreferences = null;
//     index_note_renumoratate--
//     // alert("e = "+e+" nr nota  "+nr_nota+"  index nota "+index_note_renumoratate)
// }









// // var found = myDocument.findText();
// var maxCounter_note = (found.length) /// 2
// alert("nr note " + maxCounter_note)



// var note_gasite = new Array; // IN STORY CU NOTE
// for (e = 0; e < found.length; e++) { // 0 este story cu note

//     note_gasite.push(found[e].contents);

//     // alert(note_gasite[e])
// }

// note_gasite.sort(function (a, b) { return a - b });


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
//     // for (b = 0; b < maxCounter_note; b++) {
//     var counter_nr = 0
//     for (b = maxCounter_note - 1; b >= 0; b--) {


//         var mEndNotes = myDocument.textFrames.add({ name: "EndNotes" })

//         // var num = 15;
//         // var a = num.toString();

//         var nr_nota_nr = note_gasite[b];
//         var nr_nota = nr_nota_nr.toString();
//         // var nr_nota = b + 1 + "";
//         // alert("nr_nota " + nr_nota)

//         // app.findTextPreferences = NothingEnum.nothing;
//         // app.changeTextPreferences = NothingEnum.nothing;
//         // app.findChangeTextOptions.caseSensitive = false;
//         // app.findChangeTextOptions.includeFootnotes = false;
//         // app.findChangeTextOptions.includeHiddenLayers = false;
//         // app.findChangeTextOptions.includeLockedLayersForFind = false;
//         // app.findChangeTextOptions.includeLockedStoriesForFind = false;
//         // app.findChangeTextOptions.includeMasterPages = false;
//         // app.findChangeTextOptions.wholeWord = true;
//         // app.findTextPreferences.position = Position.SUPERSCRIPT
//         // app.findTextPreferences.findWhat = nr_nota;



//         // app.findGrepPreferences = app.changeGrepPreferences = null;
//         // app.findGrepPreferences.position = Position.SUPERSCRIPT
//         // app.findGrepPreferences.findWhat = nr_nota;



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
//                 // alert(nr_nota+"  "+c)
//                 if (toate_stories[c].paragraphs[k].contents.search(/^\[\d+\]/) == 0 || toate_stories[c].paragraphs[k].contents.search(nr_nota) == 0) { //if (story.paragraphs[k].contents.search(/^\[\d+\]/) == 0) {
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


//         currFoot = story_cunote.footnotes[counter_nr];
//         // counter_nr++;
//         mEndNotes.paragraphs[0].texts[0].move(LocationOptions.AT_END, currFoot.texts[0]); // *******
//         if (story_cunote.footnotes[counter_nr].characters[-1].contents == "\r") story_cunote.footnotes[counter_nr].characters[-1].remove();

//         mEndNotes.remove();

//         if (nr_nota == 1) {
//             alert("done")
//             // exit()
//         }



//     }
// }
// catch (e) {
//     alert(e + "\r" + b)
// }

