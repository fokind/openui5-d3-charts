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

    return Series.extend("openui5.financial.chart.indicator.MACD", {
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

        var candles = series
          .selectAll()
          .data(aItems)
          .enter()
          .filter(e => moment(e.getTime()).isBetween(sStart, sEnd, "m", "[]"))
          .append("g")
          .classed("fcNone", true);

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
          .attr("y", e => valueScale(Math.max(e.getHistogram(), 0)))
          .attr("height", e =>
            Math.max(
              1,
              valueScale(Math.min(e.getHistogram(), 0)) -
                valueScale(Math.max(e.getHistogram(), 0))
            )
          )
          .attr("width", fCandleBodyWidth * fTickWidth);

        series
          .append("path")
          .datum(aItems)
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .attr(
            "d",
            d3
              .line()
              .x(e => timeScale(moment(e.getTime()).toDate()))
              .y(e => {
                return valueScale(e.getMacd());
              })
              .curve(d3.curveMonotoneX)
          );

        series
          .append("path")
          .datum(aItems)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 1)
          .attr(
            "d",
            d3
              .line()
              .x(e => timeScale(moment(e.getTime()).toDate()))
              .y(e => valueScale(e.getTrigger()))
              .curve(d3.curveMonotoneX)
          );
      }
    });
  }
);
