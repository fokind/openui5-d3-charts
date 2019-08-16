sap.ui.define(["../SeriesItem", "../library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.financial.chart.indicator.MACDItem", {
    metadata: {
      properties: {
        macd: "float",
        trigger: "float",
        histogram: "float"
      }
    },

    setMacd: function(fValue) {
      this.setProperty("macd", fValue, true);
    },

    setTrigger: function(fValue) {
      this.setProperty("trigger", fValue, true);
    },

    setHistogram: function(fValue) {
      this.setProperty("histogram", fValue, true);
    },

    _getMin: function() {
      return Math.min(this.getMacd(), this.getTrigger(), this.getHistogram());
    },

    _getMax: function() {
      return Math.max(this.getMacd(), this.getTrigger(), this.getHistogram());
    }
  });
});
