/* global d3 moment */

sap.ui.define(
  [
    "openui5/chart/Series",
    "./library",
    "./thirdparty/d3",
    "./thirdparty/moment-with-locales"
  ],
  function(Series) {
    "use strict";

    return Series.extend("openui5.chart.LineSeries", {
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
                return scaleX(e.getKey()) + fHalfBandwidth;
              })
              .y(function(e) {
                return scaleY(+e.getText());
              })
          );
      }
    });
  }
);
