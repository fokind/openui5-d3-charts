sap.ui.define(["sap/ui/core/Control", "./library"], function(Control) {
  "use strict";

  return Control.extend("openui5.financial.chart.SeriesItem", {
    metadata: {
      library: "openui5.financial.chart",
      properties: {
        time: "string"
      }
    },

    setTime: function(sValue) {
      this.setProperty("time", sValue, true);
    },

    _getMin: function() {
      return undefined;
    },

    _getMax: function() {
      return undefined;
    },

    renderer: {}
  });
});
