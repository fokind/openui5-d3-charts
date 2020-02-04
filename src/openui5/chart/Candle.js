sap.ui.define(["sap/ui/core/Element", "./library"], function(Element) {
  "use strict";

  return Element.extend("openui5.chart.Candle", {
    metadata: {
      properties: {
      	key: "string",
        open: "float",
        high: "float",
        low: "float",
        close: "float"
      }
    },
    
    getText: function () {
      return this.getClose();
    }
  });
});
