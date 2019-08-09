/* global d3 moment */

sap.ui.define(
  [
    "./Series",
    "./library",
    "./thirdparty/d3",
    "./thirdparty/moment-with-locales"
  ],
  function(Series) {
    "use strict";

    return Series.extend("openui5.financial.chart.LineChart", {
      metadata: {
        aggregations: {
          items: { type: "openui5.financial.chart.LineChartItem", multiple: true }
        }
      },

      renderer: {},

      _draw: function() {
        var oControl = this;
        Series.prototype._draw.apply(oControl);

        var oParent = oControl.getParent();
        var oTimeAxis = oParent.getAggregation("_timeAxis");
        var sStart = oTimeAxis.getStart();
        var sEnd = oTimeAxis.getEnd();
        var aItems = oControl
          .getItems()
          .filter(e => moment(e.getTime()).isBetween(sStart, sEnd, "m", "[]"));

        var timeScale = oTimeAxis._scale;
        var valueScale = oParent.getAggregation("_valueAxis")._scale;

        var series = d3.select("#" + oControl.getId());

        series
          .append("path")
          .datum(aItems)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2)
          .attr(
            "d",
            d3
              .line()
              .x(e => timeScale(moment(e.getTime()).toDate()))
              .y(e => valueScale(e.getValue()))
          );
      }
    });
  }
);
