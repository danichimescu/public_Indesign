w = new Window ('dialog');
  w.edit = w.add ('edittext {characters: 5, active: true}');
    w.addEventListener ('keydown', function (kd) {pressed (kd)});
    function pressed (k) {
      $.writeln (k.keyName);
      $.writeln (k.keyIdentifier);
    }
w.show();