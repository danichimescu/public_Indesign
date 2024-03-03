
// myFinds.texts[0].changecase(ChangecaseMode.UPPERCASE);

// ChangecaseMode.uppercase
var main = function () {
	app.findGrepPreferences = null;

	app.findGrepPreferences.findWhat = ".+";

	// app.findGrepPreferences.appliedCharacterStyle = app.activeDocument.characterStyles.item("Titlu");
	// app.findGrepPreferences.appliedParagraphStyle = "#Titlu 2"; 
	//Capitol Mare
	//Autor articol
	//Autor functie
	//Subtitle
	//Subsub cap
	// app.findGrepPreferences.appliedParagraphStyle = "Capitol Mare"; //
	// app.findGrepPreferences.appliedParagraphStyle = "Autor articol"; //
	// app.findGrepPreferences.appliedParagraphStyle = "Autor functie"; //
	// app.findGrepPreferences.appliedParagraphStyle = "Subtitle"; //
	app.findGrepPreferences.appliedParagraphStyle = "Subsub cap"; //

	// app.activeDocument.characterStyles.item("SC");

	foundList = app.activeDocument.findGrep(true);

	for (i = 0; i < foundList.length; i++) {

		foundList[i].changecase(ChangecaseMode.UPPERCASE);
	}



}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");


// //DESCRIPTION: Update of Dave Saunder's ChangeCaseOfSelectedStyle script for CS5 and later

// if ((app.documents.length != 0) && (app.selection.length != 0)) {

// 	myDoc = app.activeDocument;

// 	myStyles = myDoc.characterStyles;

// 	myStringList = myStyles.everyItem().name;

// 	myCaseList = ["Uppercase", "Lowercase", "Title case", "Sentence case"];

// 	myCases = [ChangecaseMode.uppercase, ChangecaseMode.lowercase, ChangecaseMode.titlecase, ChangecaseMode.sentencecase];

// 	var myDialog = app.dialogs.add({ name: "Case Changer" })

// 	with (myDialog) {

// 		with (dialogColumns.add()) {

// 			with (dialogRows.add()) {

// 				with (dialogColumns.add()) {

// 					staticTexts.add({ staticLabel: "Character Style:" });

// 				}

// 				with (dialogColumns.add()) {

// 					myStyle = dropdowns.add({ stringList: myStringList, selectedIndex: 0, minWidth: 133 });

// 				}

// 			}

// 			with (dialogRows.add()) {

// 				with (dialogColumns.add()) {

// 					staticTexts.add({ staticLabel: "Change Case to:" });

// 				}

// 				with (dialogColumns.add()) {

// 					myCase = dropdowns.add({ stringList: myCaseList, selectedIndex: 0, minWidth: 133 });

// 				}

// 			}

// 		}

// 	}

// 	var myResult = myDialog.show();

// 	if (myResult != true) {

// 		// user clicked Cancel

// 		myDialog.destroy();

// 		errorExit();

// 	}

// 	theStyle = myStyle.selectedIndex;

// 	theCase = myCase.selectedIndex;

// 	myDialog.destroy();

// 	app.findTextPreferences = NothingEnum.NOTHING;

// 	app.changeTextPreferences = NothingEnum.NOTHING;

// 	app.findTextPreferences.appliedCharacterStyle = myStyles[theStyle]; var myFinds = myDoc.findText();

// 	myLim = myFinds.length;

// 	for (var j = 0; myLim > j; j++) {

// 		myFinds.texts[0].changecase(myCases[theCase]);

// 	}

// } else {

// 	errorExit();

// }

// // +++++++ Functions Start Here +++++++++++++++++++++++

// function errorExit(message) {

// 	if (arguments.length > 0) {

// 		if (app.version != 3) { beep() }

// 		alert(message);

// 	}

// 	exit();

// }
