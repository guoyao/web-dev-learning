require(["jquery","prettify","gui"],function(e,t){var n=window,r=n.gui;r.browserInfo.isIE&&(r.browserInfo.version<=9&&e(".gui-btn").guiButton(),r.browserInfo.version<=8&&e(".bs-callout p:last-child").css("margin-bottom",0)),t.prettyPrint()});