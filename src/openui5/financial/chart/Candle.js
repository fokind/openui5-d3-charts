sap.ui.define(["./SeriesItem", "./library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.financial.chart.Candle", {
    metadata: {
      properties: {
        open: "float",
        high: "float",
        low: "float",
        close: "float"
      }
    },

    setOpen: function(fValue) {
      this.setProperty("open", fValue, true);
    },

    setHigh: function(fValue) {
      this.setProperty("high", fValue, true);
    },

    setLow: function(fValue) {
      this.setProperty("low", fValue, true);
    },

    setClose: function(fValue) {
      this.setProperty("close", fValue, true);
    },

    _getMin: function() {
      return this.getLow();
    },

    _getMax: function() {
      return this.getHigh();
    }
  });
});
