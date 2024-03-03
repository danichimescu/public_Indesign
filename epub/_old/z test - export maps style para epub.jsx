#target InDesign

// [Format, Tag, Klasse]
var _map = [
  ["w_Zag1", "h1", "Zag1", "", true],
  ["w_Text_normal", "p", "Text1", "", false],
  ["w_Text_Bold", "p", "Text5", "", false],
  ["w_Text_BoldItalic", "p", "Text6", "", false],
] ;

var _mac = [
  ["w_bold", "em", "chs01"],
  ["w_italic", "em", "chs02"],
  ["w_bolditalic", "em", "chs03"],
] ;

if (app.documents.length == 0) {
  alert ("Нет открытого документа!");
  exit();
}
var _dok = app.activeDocument;
for( var j = 0; j < _map.length; j++ ) {  
  var _ps = _dok.paragraphStyles.itemByName(_map[j][0]);
    
  if (_ps.isValid) {
    _ps.styleExportTagMaps.add("EPUB", _map[j][1], _map[j][2], "", _map[j][4]); 
  }
  else { 
    alert ("Внимание!\r У вас нет стилей абзаца..." + _map[j][0]);
  }    
}

for( var j = 0; j < _mac.length; j++ ) {  
  var _ps = _dok.characterStyles.itemByName(_mac[j][0]);
    
  if (_ps.isValid) {
    _ps.styleExportTagMaps.add("EPUB", _mac[j][1], _mac[j][2], ""); 
  }
  else { 
    alert ("Внимание!\r У вас нет стилей символа..." + _mac[j][0]);
  }    
}

alert("Готово!");