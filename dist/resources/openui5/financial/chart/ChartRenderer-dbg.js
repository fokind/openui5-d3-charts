sap.ui.define(
  [],
  function() {
    "use strict";

    return {
      render: function(oRm, oControl) {
        oRm.write("<div");
        oRm.writeControlData(oControl);
        oRm.addStyle("height", oControl.getHeight());
        oRm.addStyle("width", oControl.getWidth());
        oRm.writeStyles();
        oRm.write(">");
        oRm.write("<svg>");

        oRm.renderControl(oControl.getAggregation("_timeAxis"));
        oRm.renderControl(oControl.getAggregation("_valueAxis"));

        var aSeries = oControl.getSeries();
        for (var i = 0; i < aSeries.length; i++) {
          oRm.renderControl(aSeries[i]);
        }

        oRm.write("</svg>");
        oRm.write("</div>");
      }
    };
  },
  /* bExport= */ true
);
