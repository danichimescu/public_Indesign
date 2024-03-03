// var doc = app.activeDocument;

// var parentFolder = doc.filePath.fsName

// alert(parentFolder.replace(/%20/g," "))



alert(decodeURI(app.activeDocument.filePath.name));

// alert(decodeURI(app.activeDocument.path.parent.name));

// alert(decodeURI(app.activeDocument.path.parent.parent.name));

// alert(decodeURI(app.activeDocument.path.name));