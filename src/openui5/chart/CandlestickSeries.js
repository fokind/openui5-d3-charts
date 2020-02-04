/* global d3 */

sap.ui.define(
  ["openui5/chart/Series", "openui5/chart/Candle", "./library", "./thirdparty/d3"],
  function(Series) {
    "use strict";

    return Series.extend("openui5.chart.CandlestickSeries", {
      metadata: {
        aggregations: {
          items: { type: "openui5.chart.Candle", multiple: true }
        }
      },

      _draw: function() {
        Series.prototype._draw.apply(this);
        var oParent = this.getParent();
        var div = d3.select("#" + oParent.getId());
        var svg = div.select("svg");
        var aItems = this.getItems();
        var aSeries = oParent.getSeries();
        var iIndex = aSeries.indexOf(this);
        var aColumnSeries = aSeries.filter(function(e) {
          return e.isA("openui5.chart.CandlestickSeries");
        });
        var iColumnSeriesIndex = aColumnSeries.indexOf(this);
        var iColumnSeriesLength = aColumnSeries.length;
        var scaleX = oParent._scaleX;
        var scaleY = oParent._scaleY;
        var sId = this.getId();
        var fBandWidth = scaleX.bandwidth();

        svg
          .append("g")
          .attr("id", sId)
          .attr("data-sap-ui", sId)
          .selectAll()
          .data(aItems)
          .enter()
          .append("rect")
          .classed("oChartRect", true)
          .classed("oChartFill" + (iIndex + 1), true) // классы нумеруются с 1
          .attr("x", function(e) {
            return (
              scaleX(e.getKey()) +
              (fBandWidth * iColumnSeriesIndex) / iColumnSeriesLength
            );
          })
          .attr("y", function(e) {
            return scaleY(Math.max(+e.getOpen(), +e.getClose()));
          })
          .attr("height", function(e) {
            return Math.abs(scaleY(+e.getClose()) - scaleY(+e.getOpen()));
          })
          .attr("width", fBandWidth / iColumnSeriesLength);
      }
    });
  }
);
