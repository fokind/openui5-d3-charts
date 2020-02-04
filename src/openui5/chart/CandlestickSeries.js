/* global d3 */

sap.ui.define(
	["openui5/chart/Series", "openui5/chart/Candle", "./library", "./thirdparty/d3"],
	function (Series) {
		"use strict";

		return Series.extend("openui5.chart.CandlestickSeries", {
			metadata: {
				aggregations: {
					items: {
						type: "openui5.chart.Candle",
						multiple: true
					}
				}
			},

			_draw: function () {
				Series.prototype._draw.apply(this);
				var oParent = this.getParent();
				var div = d3.select("#" + oParent.getId());
				var svg = div.select("svg");
				var aItems = this.getItems();
				var aSeries = oParent.getSeries();
				var iIndex = aSeries.indexOf(this);
				var aColumnSeries = aSeries.filter(function (e) {
					return e.isA("openui5.chart.CandlestickSeries");
				});
				var iColumnSeriesIndex = aColumnSeries.indexOf(this);
				var iColumnSeriesLength = aColumnSeries.length;
				var scaleX = oParent._scaleX;
				var scaleY = oParent._scaleY;
				var sId = this.getId();
				var fBandWidth = scaleX.bandwidth();
				var fHalfBandwidth = fBandWidth * 0.5;

				// область отображения данных
				var candles = svg
					.append("g")
					.attr("id", sId)
					.attr("data-sap-ui", sId)
					.selectAll()
					.data(aItems)
					.enter()
					.append("g")
					.classed("oChartGood", e => e.getClose() >= e.getOpen())
					.classed("oChartBad", e => e.getClose() < e.getOpen());

				// тень свечи
				candles
					.append("line")
					.attr(
						"x1",
						function (e) {
							return scaleX(e.getX()) + fHalfBandwidth;
						}
					)
					.attr(
						"x2",
						function (e) {
							return scaleX(e.getX()) + fHalfBandwidth;
						}
					)
					.attr("y1", function (e) {
						return scaleY(e.getHigh());
					})
					.attr("y2", function (e) {
						return scaleY(e.getLow());
					});

				// тело свечи
				candles
					.append("rect")
					.attr("x", function (e) {
						return (
							scaleX(e.getX()) +
							(fBandWidth * iColumnSeriesIndex) / iColumnSeriesLength
						);
					})
					.attr("y", function (e) {
						return scaleY(Math.max(e.getOpen(), e.getClose()));
					})
					.attr("height", function (e) {
						return Math.abs(scaleY(e.getClose()) - scaleY(e.getOpen()));
					})
					.attr("width", fBandWidth / iColumnSeriesLength);
			}
		});
	}
);