sap.ui.define(["./SeriesItem", "./library"], function(SeriesItem) {
  "use strict";

  return SeriesItem.extend("openui5.chart.LineChartItem", {
    metadata: {
      properties: {
        value: "float"
      }
    },

    setValue: function(fValue) {
      this.setProperty("value", fValue, true);
    },

    _getMin: function() {
      return this.getValue();
    },

    _getMax: function() {
      return this.getValue();
    }
  });
});
