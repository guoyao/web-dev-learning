require(["jquery","prettify","gui"],function(e,t){gui.browserInfo.isIE&&(gui.browserInfo.version<=8&&e(".module-container .gui-table").guiTable(),gui.browserInfo.version<=7&&e(".module-container .gui-panel").guiPanel()),t.prettyPrint()});