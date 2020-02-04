sap.ui.define(["openui5/chart/Item", "./library"], function(Item) {
  "use strict";

  return Item.extend("openui5.chart.Candle", {
    metadata: {
      properties: {
        open: "float",
        high: "float",
        low: "float",
        close: "float"
      }
    },
    
    _getMax: function () {
      return this.getHigh();
    },
    
    _getMin: function () {
      return this.getLow();
    }
  });
});
