require(["jquery","prettify","gui"],function(e,t){var n=window,r=n.gui;e(".module-container .gui-splitter").guiSplitter(),r.browserInfo.isIE&&r.browserInfo.version<=8&&e(".module-container .gui-table").guiTable(),t.prettyPrint()});