//DESCRIPTION: Add Text to selected image by Dave Saunders 

if (app.documents.length > 0 && app.selection.length > 0) { 
  addTextToImage(app.selection[0]); 
} 

function addTextToImage(obj) { 
  if (obj instanceof Image) { 
    obj = obj.parent; 
  } else if (!obj.hasOwnProperty("images") || obj.images.length == 0) { 
    alert("Please select an image or its frame"); 
  } 
  var myTF = obj.textFrames.add({geometricBounds:obj.geometricBounds}); 
  myTF.textFramePreferences.properties = { 
    verticalJustification:VerticalJustification.bottomAlign, 
    ignoreWrap:true, 
    insetSpacing:["0p4", "0p4", "0p4", "0p4"] 
  } 
  myTF.texts[0].contents = "Your text here"; 
  myTF.texts[0].properties = { 
    fillColor:"Paper", 
    justification:Justification.centerAlign 
  } 
}