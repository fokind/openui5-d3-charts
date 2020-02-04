/* global d3 */

sap.ui.define(
  ["openui5/chart/Series", "openui5/chart/Point", "./library", "./thirdparty/d3"],
  function(Series) {
    "use strict";

    return Series.extend("openui5.chart.LineSeries", {
      metadata: {
        aggregations: {
          items: { type: "openui5.chart.Point", multiple: true }
        }
      },

      _draw: function() {
        Series.prototype._draw.apply(this);
        var oParent = this.getParent();
        var div = d3.select("#" + oParent.getId());
        var svg = div.select("svg");
        var aItems = this.getItems();
        var iIndex = oParent.getSeries().indexOf(this);
        var scaleX = oParent._scaleX;
        var scaleY = oParent._scaleY;
        var fHalfBandwidth = scaleX.bandwidth() * 0.5; // это для типа шкалы band

        var sId = this.getId();

        svg
          .append("g")
          .attr("id", sId)
          .attr("data-sap-ui", sId)
          .append("path")
          .datum(aItems)
          .classed("oChartLine", true)
          .classed("oChartStroke" + (iIndex + 1), true) // классы нумеруются с 1
          .attr(
            "d",
            d3
              .line()
              .x(function(e) {
                return scaleX(e.getX()) + fHalfBandwidth;
              })
              .y(function(e) {
                return scaleY(e.getY());
              })
          );
      }
    });
  }
);
