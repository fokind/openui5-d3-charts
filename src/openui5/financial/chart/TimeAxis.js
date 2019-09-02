/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.financial.chart.TimeAxis", {
    metadata: {
      library: "openui5.financial.chart",
      properties: {
        domain: "any",
        range: "any"
      }
    },

    init: function() {
      this._scale = d3.scaleTime();
    },

    setDomain: function(oDomain) {
      this._scale.domain(oDomain);
      this.setProperty("domain", oDomain, true);
    },

    setRange: function(oRange) {
      this._scale.range(oRange);
      this.setProperty("range", oRange, true);
    },

    _draw: function() {
      var oParent = this.getParent();
      if (oParent._fPlotAreaHeight) {
        d3.select("#" + this.getId())
          .attr(
            "transform",
            `translate(${oParent._fPaddingLeft}, ${oParent._fPaddingTop +
              oParent._fPlotAreaHeight})`
          )
          .call(d3.axisBottom(this._scale));
      }
    }
  });
});
