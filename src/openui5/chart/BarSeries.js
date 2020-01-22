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

    return Series.extend("openui5.chart.BarSeries", {
      metadata: {
        properties: {
          padding: { type: "float", defaultValue: 0.5 }
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

        var sId = this.getId();
        var fStep = Math.abs(
          scaleX(moment(aItems[1].getKey()).toDate()) -
            scaleX(moment(aItems[0].getKey()).toDate())
        );
        var fBandPadding = this.getPadding();
        var fBandWidth = fStep * (1 - fBandPadding);

        svg
          .append("g")
          .attr("id", sId)
          .attr("data-sap-ui", sId)
          .selectAll("rect")
          .data(aItems)
          .join("rect")
          .classed("oChartRect", true)
          .classed("oChartFill" + (iIndex + 1), true) // классы нумеруются с 1
          .attr("x", function(e) {
            return scaleX(moment(e.getKey()).toDate()) - fBandWidth * 0.5;
          })
          .attr("y", function(e) {
            return scaleY(+e.getText());
          })
          .attr("height", function(e) {
            return Math.abs(scaleY(0) - scaleY(+e.getText()));
          })
          .attr("width", fBandWidth);
      }
    });
  }
);
