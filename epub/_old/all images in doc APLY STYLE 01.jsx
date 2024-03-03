// Tested script to create an empty style to all frames with .eps or .tif. Running the script add two object styles to the document that can be modified.

// Styles

//ApplyObjectStylesTo_ContainersOf_TIF_EPS.jsx  
//Uwe Laubender  

/** 
* @@@BUILDINFO@@@ ApplyObjectStylesTo_ContainersOf_TIF_EPS.jsx !Version! Thu     Dec 12 2013 13:15:30 GMT+0100 
*/  

//Edit your style names here. Change the name between the two " " only!!  
//OR: edit your object styles in InDesign after running the script.  

var styleNameForEPS = "EPS-Containers-Only";  
var styleNameForTIF = "objStyle_imag_intext"; 
var styleNameForPNG = "objStyle_imag_intext";  
var styleNameForJPG = "objStyle_imag_intext";  

app.scriptPreferences.userInteractionLevel =     UserInteractionLevels.interactWithAll;  

app.doScript(_ApplyObjectStylesToContainers, ScriptLanguage.JAVASCRIPT, [],     UndoModes.ENTIRE_SCRIPT, "Apply object styles to containers for TIF and EPS graphics");  

function _ApplyObjectStylesToContainers(){  

var d=app.documents[0];  
var allGraphicsArray = d.allGraphics;  

// if(!d.objectStyles.itemByName(styleNameForEPS).isValid){  
// d.objectStyles.add({name:styleNameForEPS});  
// };  

// if(!d.objectStyles.itemByName(styleNameForTIF).isValid){  
// d.objectStyles.add({name:styleNameForTIF});  
// };  
// if(!d.objectStyles.itemByName(styleNameForPNG).isValid){  
//     d.objectStyles.add({name:styleNameForPNG});  
//     };  
//     if(!d.objectStyles.itemByName(styleNameForJPG).isValid){  
//         d.objectStyles.add({name:styleNameForJPG});  
//         };  

for(var n=0;n<allGraphicsArray.length;n++){  

//The EPS case:  
if(allGraphicsArray[n].getElements()[0].constructor.name === "EPS"){  
    allGraphicsArray[n].parent.appliedObjectStyle =     d.objectStyles.itemByName(styleNameForEPS);  
    };  
//The TIF case  
if(allGraphicsArray[n].getElements()[0].constructor.name === "Image" && allGraphicsArray[n].getElements()[0].imageTypeName === "TIFF"){  
    allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.itemByName(styleNameForTIF);  
    };  
//The png case  
if(allGraphicsArray[n].getElements()[0].constructor.name === "Image" && allGraphicsArray[n].getElements()[0].imageTypeName === "PNG"){  
    allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.itemByName(styleNameForPNG);  
    };  
//The jpg case  
if(allGraphicsArray[n].getElements()[0].constructor.name === "Image" && allGraphicsArray[n].getElements()[0].imageTypeName === "JPG"){  
    // allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.itemByName(styleNameForJPG); // nu merge
    allGraphicsArray[n].parent.appliedObjectStyle = d.objectStyles.item(styleNameForJPG);  
    };          

};  

}; //END: function _ApplyObjectStylesToContainers() 