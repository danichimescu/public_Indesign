/*
	 
	Add Labels v1 (2023)
	
	(c) Dan Ichimescu 2023(constantindan@gmail.com)
	very modified version of:

	Add Labels (2021)
	(c) 2020-2021 Paul Chiorean (jpeg@basement.ro)
	Adds or clears labels used by Batch processing automated resizing.jsx.
	Released under MIT License:
	https://choosealicense.com/licenses/mit/
	
	
	
*/

// @targetengine "session";
//if (app.documents.length == 0) exit();
var oldURL = app.generalPreferences.ungroupRemembersLayers;
var oldPRL = app.clipboardPreferences.pasteRemembersLayers;
app.generalPreferences.ungroupRemembersLayers = true;
app.clipboardPreferences.pasteRemembersLayers = true;

var ui = CreateUI();

ui.show();

app.generalPreferences.ungroupRemembersLayers = oldURL;
app.clipboardPreferences.pasteRemembersLayers = oldPRL;


function CreateUI() {
	var ui = new Window("palette", "Add labels for automating resizing", undefined, { closeButton: false });

	ui.orientation = "column";
	ui.alignChildren = ["fill", "top"];
	// Labels
	ui.labels = ui.add("panel", undefined, undefined);
	ui.labels.orientation = "column";
	ui.labels.alignChildren = ["center", "center"];
	ui.labels.align = ui.labels.add("group", undefined, undefined);
	ui.labels.align.orientation = "column";
	ui.labels.align.alignChildren = ["center", "center"];

	ui.labels.align.add('statictext  {text: "Align to visible/margins of page"}');
	ui.labels.align.row1 = ui.labels.align.add("group", undefined);
	ui.labels.align.row1.preferredSize.height = 25;
	ui.labels.align.row1.orientation = "row";
	ui.labels.align.row1.alignChildren = ["left", "fill"];
	ui.labels.align.row1.topleft = ui.labels.align.row1.add("button", undefined, "align Top Left");
	ui.labels.align.row1.topleft.helpTip = "Align to visible top-left";
	ui.labels.align.row1.topleft.preferredSize.width = 150;
	ui.labels.align.row1.top = ui.labels.align.row1.add("button", undefined, "align Top");
	ui.labels.align.row1.top.helpTip = "Align to visible top";
	ui.labels.align.row1.top.preferredSize.width = 150;
	ui.labels.align.row1.topright = ui.labels.align.row1.add("button", undefined, "align Top Right");
	ui.labels.align.row1.topright.helpTip = "Align to visible top-right";
	ui.labels.align.row1.topright.preferredSize.width = 150;

	ui.labels.align.row2 = ui.labels.align.add("group", undefined);
	ui.labels.align.row2.preferredSize.height = 25;
	ui.labels.align.row2.orientation = "row";
	ui.labels.align.row2.alignChildren = ["center", "fill"];
	ui.labels.align.row2.left = ui.labels.align.row2.add("button", undefined, "align Left");
	ui.labels.align.row2.left.helpTip = "Align to visible left";
	ui.labels.align.row2.left.preferredSize.width = 150;
	ui.labels.align.row2.center = ui.labels.align.row2.add("group", undefined, undefined);
	ui.labels.align.row2.center.preferredSize.width = 150;
	ui.labels.align.row2.center.alignment = ["center", "fill"];
	ui.labels.align.row2.right = ui.labels.align.row2.add("button", undefined, "align Right");
	ui.labels.align.row2.right.helpTip = "Align to visible right";
	ui.labels.align.row2.right.preferredSize.width = 150;

	ui.labels.align.row3 = ui.labels.align.add("group", undefined);
	ui.labels.align.row3.preferredSize.height = 25;
	ui.labels.align.row3.orientation = "row";
	ui.labels.align.row3.alignChildren = ["center", "fill"];
	ui.labels.align.row3.bottomleft = ui.labels.align.row3.add("button", undefined, "align Bottom Left");
	ui.labels.align.row3.bottomleft.helpTip = "Align to visible bottom-left";
	ui.labels.align.row3.bottomleft.preferredSize.width = 150;
	ui.labels.align.row3.bottom = ui.labels.align.row3.add("button", undefined, "align Bottom");
	ui.labels.align.row3.bottom.helpTip = "Align to visible bottom";
	ui.labels.align.row3.bottom.preferredSize.width = 150;
	ui.labels.align.row3.bottomright = ui.labels.align.row3.add("button", undefined, "align Bottom Right");
	ui.labels.align.row3.bottomright.helpTip = "Align to visible bottom-right";
	ui.labels.align.row3.bottomright.preferredSize.width = 150;

	ui.labels.div = ui.labels.add("panel", undefined, undefined);
	ui.labels.div.alignment = "fill";
	ui.labels.finish = ui.labels.add("group", undefined);
	ui.labels.finish.preferredSize.height = 25;
	ui.labels.finish.orientation = "row";
	ui.labels.finish.alignChildren = ["center", "fill"];

	ui.labels.finish.bleed = ui.labels.finish.add("button", undefined, "Expand to bleed");
	ui.labels.finish.bleed.helpTip = "Expand to bleed";
	ui.labels.finish.bleed.preferredSize.width = 150;


	// Actions
	ui.actions = ui.add("group", undefined);
	ui.actions.orientation = "row";
	ui.actions.alignChildren = ["center", "center"];

	ui.actions.clear = ui.actions.add("button", undefined, "Clear label/s");
	ui.actions.close = ui.actions.add("button", undefined, "Close");


	// UI functions
	ui.labels.align.row1.topleft.onClick = function () { Label("alignTo_Visible_Corner_leftTop") }
	ui.labels.align.row1.top.onClick = function () { Label("alignTo_Visible_Top") }
	ui.labels.align.row1.topright.onClick = function () { Label("alignTo_Visible_Corner_RightTop") }
	ui.labels.align.row2.left.onClick = function () { Label("alignTo_Visible_Left") }
	ui.labels.align.row2.right.onClick = function () { Label("alignTo_Visible_Right") }
	ui.labels.align.row3.bottomleft.onClick = function () { Label("alignTo_Visible_Corner_leftBottom-HW") }
	ui.labels.align.row3.bottom.onClick = function () { Label("alignTo_Visible_Bottom-HW") }
	ui.labels.align.row3.bottomright.onClick = function () { Label("alignTo_Visible_Corner_rightBottom-HW") }

	ui.labels.finish.bleed.onClick = function () { Label("expandToBleed") }



	ui.actions.clear.onClick = function () {
		app.doScript(function () {
			if (app.activeDocument.selection.length == 0 && !confirm("All labels from the document will be deleted. Are you sure?")) return;
			var item, items = (app.activeDocument.selection.length > 0) ?
				app.activeDocument.selection : app.activeDocument.allPageItems;
			while (item = items.shift()) item.label = "";

		}, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "Clear");
	}


	ui.actions.close.onClick = function () { ui.close() }

	ui.onClose = function () {


		ui.close();

		exit();
	}
	return ui;
}



function Label(label) {
	app.doScript(function () {
		var item, items = app.activeDocument.selection;
		if (items.length == 0) return;
		while (item = items.shift()) {

			item.label = ("");
			item.label = label;

		}
		UpdateStatus();
	}, ScriptLanguage.javascript, [label], UndoModes.ENTIRE_SCRIPT, "Label")
}
