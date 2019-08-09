/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.financial.chart.TimeAxis", {
    metadata: {
      library: "openui5.financial.chart",
      properties: {
        start: "string",
        end: "string",
        timeframe: "string"
      }
    },

    init: function() {
      this._scale = d3.scaleTime();
    },

    setStart: function(sValue) {
      this.setProperty("start", sValue, true);
    },

    setEnd: function(sValue) {
      this.setProperty("end", sValue, true);
    },

    setTimeframe: function(sValue) {
      this.setProperty("timeframe", sValue, true);
    },

    _draw: function() {
      var oControl = this;
      var oParent = oControl.getParent();

      var div = d3.select("#" + oParent.getId());

      if (!div.node()) return;

      var fWidth = div.node().offsetWidth;
      var fHeight = div.node().offsetHeight;

      var fPaddingTop = oParent._fPaddingTop;
      var fPaddingLeft = oParent._fPaddingLeft;

      var fPlotAreaWidth = fWidth - fPaddingLeft - oParent._fPaddingRight;
      var fPlotAreaHeight = fHeight - oParent._fPaddingBottom - fPaddingTop;

      var scale = oControl._scale.range([0, fPlotAreaWidth]).domain([
        moment(oControl.getStart()).toDate(),
        moment(oControl.getEnd())
          .add(1, "m")
          .toDate()
      ]);

      d3.select("#" + oControl.getId())
        .attr(
          "transform",
          `translate(${fPaddingLeft}, ${fPaddingTop + fPlotAreaHeight})`
        )
        .call(d3.axisBottom(scale));
    }
  });
});
