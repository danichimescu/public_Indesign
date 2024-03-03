Main();

function Main() {
	// The platform-specific full path name for the xlsx-file -- fsName
	// If you pass it as a string, make sure to double the backslashes in the path like in the line below
	var myDocument = app.activeDocument;
	var myPage_length = app.activeDocument.pages.length
	var myPages = app.activeDocument.pages

	var mEpubPublisher = "EuroPress";// OK
	
	// alert(mEpubPublisher)
	myNote = app.selection[0];
	// myNote.texts[0].contents = "ISBN pdf: "+metaIsbn_pdf +"\r"+ "ISBN epub: "+metaIsbn_epub;


try{
if (mEpubPublisher=="Ideea Europeană"){
my_urlforinput = "https://www.ideeaeuropeana.ro"
my_emailforinput = "mailto:office@ideeaeuropeana.ro" // mailto:kenw@leadingswmaniacs.com
}
if (mEpubPublisher=="Contemporanul"){
my_urlforinput = "https://www.contemporanul.ro"
my_emailforinput = "mailto:office@contemporanul.ro"
}
if (mEpubPublisher=="EuroPress"){
my_urlforinput = "https://www.europressgroup.ro"
my_emailforinput = "mailto:office@europress.ro"
}
}
catch(e){
	alert(e)
}
// alert(my_urlforinput +" "+my_emailforinput)

	// myNote.texts[0].contents = "www.ideeaeuropeana.ro";
	myNote.texts[0].contents = "E-mail: "+my_emailforinput+" \r"+my_urlforinput ;
	try{
		myCharacterStyleforww = myDocument.characterStyles.add({name:"Hyperliks"});
		// myColorforHyper = myDocument.colors.add({name:"bluehyper", model:ColorModel.process, colorValue:[0, 0, 0, 100]});
		myColorforHyper = myDocument.colors.add({ name: "bluehyper", model: ColorModel.PROCESS, space: ColorSpace.RGB, colorValue: [0, 0, 255] })
		myCharacterStyleforww.fillColor = myColorforHyper;
	}catch(e)
	{
		// myCharacterStyleforww.fillColor = "bluehyper";
	}

//////******************************************* */ email input
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = my_emailforinput;
// app.findGrepPreferences.findWhat = "^[\\u\\d \\:\\;\\?\\-\\'\\\"\\$\\%\\&\\!\\@\\*\\#\\,\\.\\(\\)]+[\\u\\d](?=\\.|,)";
// app.findGrepPreferences.appliedParagraphStyle = "Main";
var myFound = [];
myFound = app.documents[0].findGrep();

myFound[0].appliedCharacterStyle = myDocument.characterStyles.item("Hyperliks");

app.select(myFound[0])

var myPageItem= getTextSelection();




// var myPageItem = myPageItem_cev.contents
var myEMail = my_emailforinput; //Pick any URL myEMail
// var source = app.documents[0].hyperlinkPageItemSources.add(myPageItem);// HyperlinkTextSource
var source = app.documents[0].hyperlinkTextSources.add(myPageItem);
var dest = app.documents[0].hyperlinkURLDestinations.add(myEMail);
//Add hyperlink to the pageItem
app.documents[0].hyperlinks.add(source, dest, { name: myEMail })

//////************************************************* */ email input end


//////******************************************* */ url input
	app.findGrepPreferences = NothingEnum.nothing;
	app.changeGrepPreferences = NothingEnum.nothing;
	app.findGrepPreferences.findWhat = my_urlforinput;
	// app.findGrepPreferences.findWhat = "^[\\u\\d \\:\\;\\?\\-\\'\\\"\\$\\%\\&\\!\\@\\*\\#\\,\\.\\(\\)]+[\\u\\d](?=\\.|,)";
	// app.findGrepPreferences.appliedParagraphStyle = "Main";
	var myFound = [];
	myFound = app.documents[0].findGrep();
	app.select(myFound[0])
	
	myFound[0].appliedCharacterStyle = myDocument.characterStyles.item("Hyperliks");

	var myPageItemdoi= getTextSelection();

	// alert(myPageItem)



	// var myPageItem = myPageItem_cev.contents
	var myURLdoi = my_urlforinput; //Pick any URL
	// var source = app.documents[0].hyperlinkPageItemSources.add(myPageItem);// HyperlinkTextSource
	var source = app.documents[0].hyperlinkTextSources.add(myPageItemdoi);
	var dest = app.documents[0].hyperlinkURLDestinations.add(myURLdoi);
	//Add hyperlink to the pageItem
	app.documents[0].hyperlinks.add(source, dest, { name: myURLdoi })

//////************************************************* */ url input end





app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = "mailto:";
app.changeGrepPreferences.changeTo = ""; //\r

app.documents[0].changeGrep();


function getTextSelection()   {
        
	if (app.documents.length == 0) {
		util.error_exit("No documents are open.  Please open a document and try again.");
	}
	if (app.selection.length == 0) {
		util.error_exit("Please select something and try again.");
	}
	
	var myObject;
	var mySel = app.selection[0];

	switch (mySel.constructor.name) {
		case "Character":
		case "Word":
		case "TextStyleRange":
		case "Line":
		case "Paragraph":
		case "TextColumn":
		case "Text":
		case "Cell":
		case "Column":
		case "Row":
		case "Table":
		case "InsertionPoint":
		
		myObject = mySel;
		break;
		
		case "TextFrame":
		util.error_exit ("Please select some text (not a whole text frame) and try again.");
		break;
		
		case "Story":
		util.error_exit ("Please select some text (not a whole story) and try again.");
		break;
		
		default:
		util.error_exit("Please select some text and try again.");
		if (!myObject.isValid) {
			util.error_exit( "There's been an error of indeterminate nature.  " + 
							 "Probably best to blame the programmer." );
		}
	}

	if (myObject.parentStory.lockState == LockStateValues.CHECKED_IN_STORY || 
			myObject.parentStory.lockState == LockStateValues.LOCKED_STORY) {
		util.error_exit ("Please check out the story you're trying to place text into, and try again.");
	}
			
	return myObject;
}






}

