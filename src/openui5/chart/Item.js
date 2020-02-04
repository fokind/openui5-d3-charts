sap.ui.define(["sap/ui/core/Element", "./library"], function(Element) {
  "use strict";

  return Element.extend("openui5.chart.Item", {
    metadata: {
      library: "openui5.chart",
      properties: {
        x: "string"
      }
    },

    _getMin: function() {
      return undefined;
    },

    _getMax: function() {
      return undefined;
    }
  });
});
