try {

    var menu = app.menus.item("$ID/ParaStylePanelPopup");  
    var menuItem = menu.menuItems.item("$ID/Edit All Export Tags..."); 
    var menuAction = menuItem.associatedMenuAction;  
    menuAction.invoke(); 
}

catch(err) {
    alert("Hmmm");
}