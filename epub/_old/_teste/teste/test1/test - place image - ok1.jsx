var myDoc = app.activeDocument;

if(app.documents.length != 0){
    if(app.selection.length == 1){
        try{           
            var frame1 = app.selection[0];
            frame1 = app.paste();//works
            //app.pasteWithoutFormatting(frame1);;works too
         }
        catch(e){
            alert ("Exception : " + e, "Exception");
        }
    }
 else{
    alert ("Please select text", "Selection");
  }  
}
else{
    alert("Something wrong");
}