/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.financial.chart.Series", {
    metadata: {
      library: "openui5.financial.chart",
      aggregations: {
        items: { type: "openui5.financial.chart.SeriesItem", multiple: true }
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

    addItem: function(oValue) {
      this.addAggregation("items", oValue, true);
    },

    removeItem: function(oValue) {
      this.removeAggregation("items", oValue, true);
    },

    _getTickWidth: function() {
      var aItems = this.getItems();
      if (aItems.length < 1) return;
      var oParent = this.getParent();
      var fPeriod = oParent.getPeriod();
      var timeScale = oParent.getAggregation("_timeAxis")._scale;

      return timeScale(
        moment(moment(oParent.getStart()).toDate())
          .add(fPeriod, "m")
          .toDate()
      );
    },

    _getMin: function() {
      var aItems = this.getItems();
      return d3.min(aItems, function(e) {
        return e._getMin();
      });
    },

    _getMax: function() {
      var aItems = this.getItems();
      return d3.max(aItems, function(e) {
        return e._getMax();
      });
    },

    _draw: function() {
      var oParent = this.getParent();
      d3.select("#" + this.getId())
        .attr(
          "transform",
          `translate(${oParent._fPaddingLeft}, ${oParent._fPaddingTop})`
        )
        .selectAll("*")
        .remove();
    }
  });
});
