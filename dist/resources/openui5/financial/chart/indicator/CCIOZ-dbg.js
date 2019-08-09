/* global d3 moment */

sap.ui.define(
  [
    "../Series",
    "../library",
    "../thirdparty/d3",
    "../thirdparty/moment-with-locales"
  ],
  function(Series) {
    "use strict";

    return Series.extend("openui5.financial.chart.indicator.CCIOZ", {
      metadata: {
        properties: {
          overboughtZone: "float",
          oversoldZone: "float"
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

        // подготовка переменных
        var fCandleBodyWidth = 0.8; // TODO заменить на ось категорий
        var fTickWidth = timeScale(
          moment(moment(sStart).toDate())
            .add(+oParent.getTimeframe(), "m")
            .toDate()
        );

        var fOverboughtZone = oControl.getOverboughtZone();
        var fOversoldZone = oControl.getOversoldZone();

        var candles = series
          .selectAll()
          .data(aItems)
          .enter()
          .filter(e => moment(e.getTime()).isBetween(sStart, sEnd, "m", "[]"))
          .append("g")
          .classed("fcBullish", e => e.getValue() > fOverboughtZone)
          .classed("fcBearish", e => e.getValue() < fOversoldZone)
          .classed(
            "fcNone",
            e =>
              e.getValue() >= fOversoldZone && e.getValue() <= fOverboughtZone
          );

        // тело свечи
        candles
          .append("rect")
          .classed("fcCandleBody", true)
          .attr(
            "x",
            e =>
              timeScale(moment(e.getTime()).toDate()) +
              ((1 - fCandleBodyWidth) * fTickWidth) / 2
          )
          .attr("y", e => valueScale(Math.max(e.getValue(), 0)))
          .attr("height", e =>
            Math.max(
              1,
              valueScale(Math.min(e.getValue(), 0)) -
                valueScale(Math.max(e.getValue(), 0))
            )
          )
          .attr("width", fCandleBodyWidth * fTickWidth);
      }
    });
  }
);
