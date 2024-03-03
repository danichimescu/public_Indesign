// w = new Window ('dialog');
//   w.edit = w.add ('edittext {characters: 5, active: true}');
//     w.addEventListener ('keydown', function (kd) {pressed (kd)});
//     function pressed (k) {
//       $.writeln (k.keyName);
//       $.writeln (k.keyIdentifier);
//     }
// w.show();

// initKeyboardEvent() eventObj.initKeyboardEvent (eventName, bubble, isCancelable, view, keyID, keyLocation, modifiersList)  
// initKeyboardEvent() eventObj.initKeyboardEvent ("Escape")


// initKeyboardEvent()
// eventObj.initKeyboardEvent (eventName, bubble, isCancelable, view, keyID,
// keyLocation, modifiersList)
// var myDocument = app.documents[0];
var myDocument = app.activeDocument;
// var keyboardEvent = myDocument.createEvent("KeyboardEvent");
// var eventObject = new Event(events[i], {"bubbles":true, "cancelable":false});
var keyboardEvent = new Event("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

keyboardEvent[initMethod](
  "keydown", // event type: keydown, keyup, keypress
  true,      // bubbles
  true,      // cancelable
  window,    // view: should be window
  false,     // ctrlKey
  false,     // altKey
  false,     // shiftKey
  false,     // metaKey
  27,        // keyCode: unsigned long - the virtual key code, else 0
  0          // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
);
document.dispatchEvent(keyboardEvent);