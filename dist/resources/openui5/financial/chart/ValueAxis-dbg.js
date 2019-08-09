/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.financial.chart.ValueAxis", {
    metadata: {
      library: "openui5.financial.chart",
      properties: {
        max: "float",
        min: "float"
      }
    },

    init: function() {
      this._scale = d3.scaleLinear();
    },

    setMax: function(fMax) {
      this.setProperty("max", fMax, true);
    },

    setMin: function(fMin) {
      this.setProperty("min", fMin, true);
    },

  _draw: function() {
      var oControl = this;
      var oParent = oControl.getParent();

      var div = d3.select("#" + oParent.getId());
      var fHeight = div.node().offsetHeight;

      var fPaddingTop = oParent._fPaddingTop;
      var fPaddingLeft = oParent._fPaddingLeft;

      var fPlotAreaHeight = fHeight - oParent._fPaddingBottom - fPaddingTop;

      var scale = oControl._scale
        .range([fPlotAreaHeight, 0])
        .domain([oControl.getMin(), oControl.getMax()]);

      d3.select("#" + oControl.getId())
        .attr("transform", `translate(${fPaddingLeft}, ${fPaddingTop})`)
        .call(d3.axisLeft(scale));
    }
  });
});
