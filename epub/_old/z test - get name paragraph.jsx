var  myparag = app.selection[0].paragraphs.item(0)
// alert(myparag.appliedParagraphStyle.name)
var myParagRafName = myparag.appliedParagraphStyle.name
alert(myParagRafName)
// myPar.appliedParagraphStyle = app.activeDocument.paragraphStyles.item('Normal');
// g.doc = app.activeDocument;
// g.doc.paragraphStyles[i].name

// if(g.win.ddlStyles.selection.text != "[No Paragraph Style]"){
// 	g.txf.parentStory.insertionPoints[-1].appliedParagraphStyle = g.doc.paragraphStyles.item(g.win.ddlStyles.selection.text);
// 	 }