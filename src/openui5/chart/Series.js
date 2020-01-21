sap.ui.define(["sap/ui/core/Control", "sap/ui/core/Item", "./library"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.chart.Series", {
    metadata: {
      library: "openui5.chart",
        aggregations: {
          items: { type: "sap.ui.core.Item", multiple: true }
        },
        defaultAggregation: "items"
    },

      // без этого связывается только 100 элементов
      bindAggregation: function(sName, oBindingInfo) {
        if (!oBindingInfo.length) oBindingInfo.length = 1000000; // Max number of lines to display
        return sap.ui.core.Control.prototype.bindAggregation.apply(
          this,
          arguments
        ); //call superclass
      },

    renderer: {},
    
    _draw: function() {
    	// abstract
    }
  });
});