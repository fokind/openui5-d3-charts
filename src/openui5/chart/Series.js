sap.ui.define(
  ["sap/ui/core/Element", "openui5/chart/Item", "./library"],
  function(Element) {
    "use strict";

    return Element.extend("openui5.chart.Series", {
      metadata: {
        library: "openui5.chart",
        aggregations: {
          items: { type: "openui5.chart.Item", multiple: true }
        },
        defaultAggregation: "items"
      },

      // без этого связывается только 100 элементов
      bindAggregation: function(sName, oBindingInfo) {
        if (!oBindingInfo.length) oBindingInfo.length = 1000000; // Max number of lines to display
        return sap.ui.core.Element.prototype.bindAggregation.apply(
          this,
          arguments
        ); //call superclass
      },

      renderer: {},

      _draw: function() {
        // abstract
      }
    });
  }
);
