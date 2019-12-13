/* global d3 moment */

sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/ResizeHandler",
    "./library",
    "./thirdparty/d3",
    "./thirdparty/moment-with-locales"
  ],
  function(Control, ResizeHandler) {
    "use strict";

    return Control.extend("openui5.financial.chart.Chart", {
      metadata: {
        library: "openui5.financial.chart",
        properties: {
          height: { type: "string", defaultValue: "100%" },
          width: { type: "string", defaultValue: "100%" }
        },
        aggregations: {
          series: { type: "openui5.financial.chart.Series", multiple: true }
        },
        defaultAggregation: "series"
      },

      init: function() {
        ResizeHandler.register(this, this.onResize.bind(this));
      },

      onResize: function(oEvent) {
        this._fWidth = oEvent.size.width;
        this._fHeight = oEvent.size.height;
        this._draw();
      },

      // без этого связывается только 100 элементов
      bindAggregation: function(sName, oBindingInfo) {
        if (!oBindingInfo.length) oBindingInfo.length = 1000000; // Max number of lines to display
        return sap.ui.core.Control.prototype.bindAggregation.apply(
          this,
          arguments
        ); //call superclass
      },

      onAfterRendering: function() {
        this._draw();
      },

      _draw: function() {
      	var div = d3.select("#" + this.getId());
		var svg = div.select("svg");
		
		if (svg.empty()) {
			svg = div.append("svg");
		}

        var fWidth = this._fWidth;
        svg.attr("width", fWidth);

        var fHeight = this._fHeight;
        svg.attr("height", fHeight);

        var aSeries = this.getSeries();
        for (var i = 0; i < aSeries.length; i++) {
          aSeries[i]._draw();
        }
      },

      refresh: function() {
        this._draw();
      }
    });
  }
);
