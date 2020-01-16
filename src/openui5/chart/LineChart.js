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

    return Series.extend("openui5.chart.LineChart", {
      metadata: {
        aggregations: {
          items: {
            type: "openui5.chart.LineChartItem",
            multiple: true
          }
        }
      },

      renderer: {},

      _draw: function() {
        Series.prototype._draw.apply(this);
        var aItems = this.getItems();
        if (!aItems || !aItems.length) {
        	return;
        }
        
        var oParent = this.getParent();
        var svg = d3.select("#" + oParent.getId()).select("svg");
		if (svg.empty() || !oParent._fWidth || !oParent._fHeight) {
			return;
		}
        var svg = d3.select("#" + oParent.getId()).select("svg");
        var timeScale = d3.scaleTime().domain([
          moment(aItems[0].getTime()).toDate(),
          moment(aItems[aItems.length - 1].getTime()).toDate()
        ]).range([0, oParent._fWidth]);

        var valueScale = d3.scaleLinear().domain([
          d3.min(aItems, e => e.getValue()),
          d3.max(aItems, e => e.getValue())
        ]).range([oParent._fHeight, 0]);

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
