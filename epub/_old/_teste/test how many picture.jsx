// var doc = app.documents[0];
var doc = app.activeDocument;

// var allGraphicsPerPages = doc.pages.everyItem().allGraphics;
alert(doc.allGraphics.length)

// // var result = [doc.name];

// // result[1] = [ "Page Name" +" : "+ "Number of Graphics on Page" ];

// // for(var n=0;n<allGraphicsPerPages.length;n++)

// // {

// //     result[n+2] = doc.pages.name +" : "+allGraphicsPerPages.length;

// // };

// // $.writeln(result.join("\r"));

// // ****** merge asta :
// var doc = app.documents[0];   

// var result = [ "Doc Name" +" : "+ "Total Number of Graphics on Doc" ];   

// result[1] = doc.name + " : " + doc.allGraphics.length 

// alert("RESULT"+"\r"+result.join("\r"));

// // ****** merge asta : stop end