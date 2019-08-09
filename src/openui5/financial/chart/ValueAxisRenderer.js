sap.ui.define(
  [],
  function() {
    "use strict";

    return {
      render: function(oRm, oControl) {
        oRm.write("<g");
        oRm.writeControlData(oControl);
        oRm.write("></g>");
      }
    };
  },
  /* bExport= */ true
);
