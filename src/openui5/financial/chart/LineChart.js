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
          items: {
            type: "openui5.financial.chart.LineChartItem",
            multiple: true
          }
        }
      },

      renderer: {},

      _draw: function() {
        Series.prototype._draw.apply(this);

        var oParent = this.getParent();
        var aItems = this.getItems();

        var timeScale = oParent.getAggregation("_timeAxis")._scale;
        var valueScale = oParent.getAggregation("_valueAxis")._scale;

        var series = d3.select("#" + this.getId());

        series
          .append("path")
          .datum(aItems)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
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
