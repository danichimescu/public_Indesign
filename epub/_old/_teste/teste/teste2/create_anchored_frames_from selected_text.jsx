#targetengine boriskasmoscow
/*
 CreateAnchoredTextFramesFromSelectedText.jsx
 An InDesign CS6 JavaScript
 ----------------------------------------------

 
1. Create an object style, in which specify the anchor parameters
 and, if necessary, set other properties of the anchored frame - fill,
 stroke, paragraph style, etc.
 

2. Run the screen. In the dialog box, set the object style of the anchored frames
 and their size is width and height.

 3. Run the script by clicking the Start button. Highlight text.
 After the end of each selection, the script without additional actions will be
 create anchor frames according to the parameters given
 in object style. Enjoy!
 

4. You can click the Stop button and then change the dimensions and object style in the dialog box.
 After that, you need to click the Start button.
 Subsequent text selection will create anchored text frames
 with new parameters.
 5. Click the Exit button to exit.

 RU
 1. Создайте объектный стиль, в котором укажите параметры привязки
 и при необходмости задайте другие свойства привязанного фрейма - заливку,
 обводку, стиль абзаца и т.д.
 2. Запустите скрит. В диалоговом окне задайте объектный стиль привязанных фреймов
 и их размер - ширину и высоту.
 3. Запустите скрипт нажатием кнопки Start. Выделяйте текст.
 После окончания каждого выделения скрипт без дополнительных действий будет
 создавать привязанные фреймы в соответствии с параметрами, заданными
 в объектном стиле.  Наслаждайтесь!
 4. Можно нажать кнопку Stop и затем поменять размеры и объектный стиль в диалоговом окне.
 После этого надо нажать кнопку Start.
 Последующее выделение текста будет создавать привязанные текстовые фреймы
 с новыми параметрами.
 5. Нажмите кнопку Exit для завершения работы.
 ---------------------------------------------
 boriskasmoscow@gmail.com, www.adobeindesign.ru
*/
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
var myH, myW, myObjStyleName;
var myDocument = app.activeDocument;

if(parseInt(app.version) >= 8)
{
    with (myDocument.viewPreferences){
        // Сохраняем старые единицы измерения в переменных myOldXUnits, myOldYUnits
        var myOldXUnits = horizontalMeasurementUnits;
        var myOldYUnits = verticalMeasurementUnits;
        // Устанавливаем новые единицы измерения
        horizontalMeasurementUnits = MeasurementUnits.millimeters;
        verticalMeasurementUnits = MeasurementUnits.millimeters;
    }   
    var myObjStyleList = myGetObjStyleNames();
    var myWin = myDialog(myObjStyleList);
        
    myWin.show();
    // Восстанавливаем единицы измерения
    with (myDocument.viewPreferences){
        try{
            horizontalMeasurementUnits = myOldXUnits;
            verticalMeasurementUnits = myOldYUnits;
        }
        catch(myError){
            alert("Could not reset custom measurement units.");
        }
    }

}
else
{
    alert("Sorry, for InDesign CS6 only");
}

function myDialog(myObjStyleList)
{
    var myDialog = new Window('palette', "Create AnchoredFrame from Selected Text");
    this.windowRef = myDialog;
	myDialog.orientation = "column";
    myDialog.alignChildren = "center";

    // добавляем панель 1 с элементами управления // add panel1
    myDialog.Pnl1 = myDialog.add("panel", undefined, '');
	myDialog.Pnl1.orientation = "column";
    myDialog.Pnl1.alignChildren = "left";
    myDialog.Pnl1.dropdownObjStyle = myDialog.Pnl1.add("dropdownlist", undefined, myObjStyleList);
    myDialog.Pnl1.dropdownObjStyle.title = 'Select Object Style'; 
    myDialog.Pnl1.dropdownObjStyle.minimumSize = [250,20];
    myDialog.Pnl1.dropdownObjStyle.enabled = true;
    myDialog.Pnl1.dropdownObjStyle.selection = 0;
    
    myDialog.Pnl1.sizeGroup = myDialog.Pnl1.add( "group" );
    myDialog.Pnl1.sizeGroup.stxt1 = myDialog.Pnl1.sizeGroup.add("statictext", undefined, "Width (mm): ");
    myDialog.Pnl1.sizeGroup.etxt1 = myDialog.Pnl1.sizeGroup.add("edittext", undefined, "50");
    myDialog.Pnl1.sizeGroup.etxt1.characters = 5;
    myDialog.Pnl1.sizeGroup.stxt2 = myDialog.Pnl1.sizeGroup.add("statictext", undefined, "Height (mm): ");
    myDialog.Pnl1.sizeGroup.etxt2 = myDialog.Pnl1.sizeGroup.add("edittext", undefined, "50");
    myDialog.Pnl1.sizeGroup.etxt2.characters = 5;
    
// add buttons    
    var myButtonGroup = myDialog.add( "group" );
    myButtonGroup.orientation = 'row';
    myButtonGroup.startButton = myButtonGroup.add( "button", undefined, "Start" );
    myButtonGroup.startButton.enabled = true;
    myButtonGroup.startButton.helpTip = "To create an anchored frame click the Start button and then select the text";
    myButtonGroup.startButton.onClick = function() 
    {
       if(myDialog.Pnl1.sizeGroup.etxt1.text =='')
       {
           alert('Width is not defined'); return;
       }
       else myW = myDialog.Pnl1.sizeGroup.etxt1.text;
       if(myDialog.Pnl1.sizeGroup.etxt2.text=='')
       {
           alert('Height is not defined'); return;
       }
        else  myH = myDialog.Pnl1.sizeGroup.etxt2.text; 
   
        myObjStyleName= myDialog.Pnl1.dropdownObjStyle.selection.text;
        // add EventListener
        app.addEventListener("afterSelectionChanged", createAnchoredTextFrame);
        // Change Tool
        app.toolBoxTools.currentTool = UITools.TYPE_TOOL;
        // Change userInteractionLevel
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
        // Bootons management
        myButtonGroup.startButton.enabled = false;
        myButtonGroup.StopButton.enabled = true;
    } //onClick
    myButtonGroup.cancelButton = myButtonGroup.add( "button", undefined, "Exit" );
    myButtonGroup.cancelButton.onClick = function() 
    { 
        app.removeEventListener("afterSelectionChanged", createAnchoredTextFrame);
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
        myDialog = this.window.close( 0 ); 
    }
    // add Stop-button
    myButtonGroup.StopButton = myButtonGroup.add( "button", undefined, "Stop" );
    myButtonGroup.StopButton.enabled = false;
    myButtonGroup.StopButton.helpTip = "Put button for change parametrs";
    myButtonGroup.StopButton.onClick = function() 
    { 
        app.removeEventListener("afterSelectionChanged", createAnchoredTextFrame);
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
        myButtonGroup.startButton.enabled = true;
    }
    //myDialog.stxt = myDialog.add("statictext", undefined, "www.adobeindesign.ru");
return myDialog;
} //fnc myDialog

function myGetObjStyleNames()
{
    var curGroup;
	var curGroupName;
	var curNameInGroup;
	var myObjStyleNames = app.activeDocument.objectStyles.everyItem().name;
    myObjStyleNames.shift();
    var objGroups = app.activeDocument.objectStyleGroups;
    var objStyleGroupLen = objGroups.length;
    for(var i=0; i < objStyleGroupLen; i++)
	{
		curGroup = objGroups[i];
		curGroupName = objGroups[i].name;
		curGroupStyleNames = curGroup.objectStyles.everyItem().name;
		for (var j=0; j< curGroupStyleNames.length; j++)
		{
			curNameInGroup = curGroupName +":"+ curGroupStyleNames[j];
			myObjStyleNames.push(curNameInGroup);
		}
	} //for
    
    return myObjStyleNames;
} // fnc

function getObjectStyleByName(myStyleName)
{
    var DocObjStyles = app.activeDocument.objectStyles;
    var DocCObjGroups = app.activeDocument.objectStyleGroups;
    myStyleName = String (myStyleName);
    var pos = myStyleName.indexOf(":");
    if(pos == -1)
	{
	// стиль не в группе
		return DocObjStyles.item(myStyleName);
	} //if...
    var myGroupAndStyleNames = myStyleName.split(":");
    var myGroupName = myGroupAndStyleNames[0];
    var myStyleName = myGroupAndStyleNames[1];
    var myGroup = DocObjGroups.item(myGroupName);
		return myGroup.objectStyles.itemByName(myStyleName);
} //fnc

function createAnchoredTextFrame(e)
{
 
 switch(app.selection[0].constructor.name)      
	{      
		case "Character":      
		case "Word":      
		case "TextStyleRange":      
		case "Line":      
		case "Paragraph":      
		case "TextColumn":      
		case "Text": 
            really_createAnchoredTextFrame(app.selection[0]);
            break;
		default :      
            break;    
	}  
} // fnc

function really_createAnchoredTextFrame(myText)
{
    var myInsertionPoint = myText.insertionPoints[0];   
    var myPage = myInsertionPoint.parentTextFrames[0].parentPage;
    var AnchoredTextFrame = myPage.textFrames.add();
    AnchoredTextFrame.geometricBounds = [0,0, parseFloat(myH), parseFloat(myW)];
    myText.move(LocationOptions.AFTER, AnchoredTextFrame.texts[0]);
    AnchoredTextFrame.anchoredObjectSettings.insertAnchoredObject(myInsertionPoint);
    myObjStyle = getObjectStyleByName(myObjStyleName);
    AnchoredTextFrame.appliedObjectStyle = myObjStyle;
}


