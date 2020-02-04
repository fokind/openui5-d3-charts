sap.ui.define(["openui5/chart/Item", "./library"], function(Item) {
  "use strict";

  return Item.extend("openui5.chart.Point", {
    metadata: {
      properties: {
        y: "float"
      }
    },
    
    _getMax: function () {
      return this.getY();
    },
    
    _getMin: function () {
      return this.getY();
    }
  });
});
