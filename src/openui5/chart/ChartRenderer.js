sap.ui.define(
  [],
  function() {
    "use strict";

    return {
      render: function(oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.writeClasses();
        oRm.addStyle("height", oControl.getHeight());
        oRm.addStyle("width", oControl.getWidth());
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("</div>");
      }
    };
  },
  /* bExport= */ true
);
