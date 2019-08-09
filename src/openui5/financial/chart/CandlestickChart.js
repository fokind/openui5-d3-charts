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

    return Series.extend("openui5.financial.chart.CandlestickChart", {
      metadata: {
        aggregations: {
          items: { type: "openui5.financial.chart.Candle", multiple: true }
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

        // область отображения данных
        var candles = series
          .selectAll()
          .data(aItems)
          .enter()
          .filter(e => moment(e.getTime()).isBetween(sStart, sEnd, "m", "[]"))
          .append("g")
          .classed("fcBullish", e => e.getClose() >= e.getOpen())
          .classed("fcBearish", e => e.getClose() < e.getOpen());

        // тень свечи
        candles
          .append("line")
          .classed("fcCandleShadow", true)
          .attr(
            "x1",
            e => timeScale(moment(e.getTime()).toDate()) + fTickWidth / 2
          )
          .attr(
            "x2",
            e => timeScale(moment(e.getTime()).toDate()) + fTickWidth / 2
          )
          .attr("y1", e => valueScale(e.getHigh()))
          .attr("y2", e => valueScale(e.getLow()));

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
          .attr("y", e => valueScale(Math.max(e.getOpen(), e.getClose())))
          .attr("height", e =>
            Math.max(
              1,
              valueScale(Math.min(e.getOpen(), e.getClose())) -
                valueScale(Math.max(e.getOpen(), e.getClose()))
            )
          )
          .attr("width", fCandleBodyWidth * fTickWidth);
      }
    });
  }
);
