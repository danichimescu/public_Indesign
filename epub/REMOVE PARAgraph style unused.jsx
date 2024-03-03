// app.menuActions.item("Delete Unused Layers").invoke();


// app.menus.item("Paragraph Style Panel Menu").menuItems.item("Select All Unused").associatedMenuAction.invoke();
// app.menus.item("Paragraph Style Panel Menu").menuItems.item("Delete Style...").associatedMenuAction.invoke();


// #target InDesign     
// var myDoc = app.activeDocument;
// var myParStyles = myDoc.paragraphStyles;
// for (i = myParStyles.length - 1; i >= 2; i--) {

// 	removeUnusedStyle(myParStyles)
// }

// function removeUnusedStyle(myStyle) {
// 	app.findTextPreferences = NothingEnum.nothing;

// 	app.changeTextPreferences = NothingEnum.nothing;

// 	app.findTextPreferences.appliedParagraphStyle = myStyle;

// 	var myFoundStyles = myDoc.findText();

// 	if (myFoundStyles == 0) {

// 		myStyle.remove();

// 	}

// 	app.findTextPreferences = NothingEnum.nothing;

// 	app.changeTextPreferences = NothingEnum.nothing;

// }
/// --------------------pt en a mers o data, dupa, nu
// var myMenu = app.menus.item("$ID/ParaStylePanelPopup");
// var myMenuItem = myMenu.menuItems.item("Select All Unused");
// var myMenuAction = myMenuItem.associatedMenuAction;
// myMenuAction.invoke();
// var myMenu = app.menus.item("$ID/ParaStylePanelPopup");
// var myMenuItem = myMenu.menuItems.item("Delete Style...");
// var myMenuAction = myMenuItem.associatedMenuAction;
// myMenuAction.invoke();
// /// ------------- pt en



// /// --------------------------------asta merge sterge toate caracterele unused!!!! pt en
// var myMenu = app.menus.item("$ID/CharStylePanelPopup");
// var myMenuItem = myMenu.menuItems.item("Select All Unused");
// var myMenuAction = myMenuItem.associatedMenuAction;
// myMenuAction.invoke();
// var myMenu = app.menus.item("$ID/CharStylePanelPopup");
// var myMenuItem = myMenu.menuItems.item("Delete Style...");
// var myMenuAction = myMenuItem.associatedMenuAction;
// myMenuAction.invoke();
// /// --------------------------------asta merge sterge toate caracterele unused!!!! pt en

// /// 2 --------------------------------asta merge sterge 
// try {

//     var menu = app.menus.item("$ID/CharStylePanelPopup");  
//     var menuItem = menu.menuItems.item("$ID/SelectAllUnused"); 
//     var menuAction = menuItem.associatedMenuAction;  
//     menuAction.invoke();  
//     menu = app.menus.item("$ID/CharStylePanelPopup");  
//     menuItem = menu.menuItems.item("$ID/Delete Style...");
//     if (!menuItem.isValid) {
//         menuItem = menu.menuItems.item("$ID/Delete Styles...");  
//     }
//     menuAction = menuItem.associatedMenuAction;  
//     menuAction.invoke(); 
// }

// catch(err) {
//     if (err.number == 53762) alert("There are no unused character styles in the document.", "Remove unused character styles script", false);
// }
// /// 2 --------------------------------asta merge sterge 

// /// 3 --------------------------------asta merge sterge 
// app.panels.itemByName("$ID/Character Styles").visible = true;  //
// app.panels.itemByName("$ID/ParaStylePanelPopup").visible = true;// nu merge
try {

    var menu = app.menus.item("$ID/ParaStylePanelPopup");  
    var menuItem = menu.menuItems.item("$ID/SelectAllUnused"); 
    var menuAction = menuItem.associatedMenuAction;  
    menuAction.invoke();  
    menu = app.menus.item("$ID/ParaStylePanelPopup");  
    menuItem = menu.menuItems.item("$ID/Delete Style...");
    if (!menuItem.isValid) {
        menuItem = menu.menuItems.item("$ID/Delete Styles...");  
    }
    menuAction = menuItem.associatedMenuAction;  
    menuAction.invoke(); 
}

catch(err) {
    if (err.number == 53762) alert("There are no unused character styles in the document.", "Remove unused character styles script", false);
}
// /// 3 --------------------------------asta merge sterge 