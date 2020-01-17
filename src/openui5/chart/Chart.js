/* global d3 */

sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/ResizeHandler",
    "sap/ui/core/Item",
    "./thirdparty/d3",
    "./library"
  ],
  function(Control, ResizeHandler, Item) {
    "use strict";

    return Control.extend("openui5.chart.Chart", {
      metadata: {
        library: "openui5.chart",
        properties: {
          height: { type: "string", defaultValue: "100%" },
          width: { type: "string", defaultValue: "100%" },
          axisWidth: { type: "float", defaultValue: 0 },
          axisHeight: { type: "float", defaultValue: 0 }
        },
        aggregations: {
          //_axisX: {
          //  type: "openui5.chart.TimeAxis",
          //  multiple: false
          //},
          //_axisY: {
          //  type: "openui5.chart.ValueAxis",
          //  multiple: false
          //},
          items: { type: "sap.ui.core.Item", multiple: true }
        },
        defaultAggregation: "items"
      },
      
      _fWidth: 0,
      _fHeight: 0,
      _sResizeHandlerId: null,
      _scaleX: d3.scaleTime(),
      _scaleY: d3.scaleLinear(),

      init: function() {
        this._sResizeHandlerId = ResizeHandler.register(this, this._onResize.bind(this));
      },

      exit: function() {
        ResizeHandler.deregister(this._sResizeHandlerId);
      },

      // без этого связывается только 100 элементов
      bindAggregation: function(sName, oBindingInfo) {
        if (!oBindingInfo.length) oBindingInfo.length = 1000000; // Max number of lines to display
        return sap.ui.core.Control.prototype.bindAggregation.apply(
          this,
          arguments
        ); //call superclass
      },

      _draw: function() {
      	var div = d3.select("#" + this.getId());
		var svg = div.select("svg");
		
		if (svg.empty()) {
			svg = div.append("svg");
		}

		var aItems = this.getItems
		
		var fWidth = this._fWidth;
		var fHeight = this._fHeight;
		var fAxisWidth = this.getAxisWidth();
		var fAxisHeight = this.getAxisHeight();
		var fPlotAreaHeight = fHeight - fAxisHeight;

        svg.attr("width", fWidth);
        svg.attr("height", fHeight);

		var scaleX = this._scaleX
			.domain([0, aItems.length - 1])
			.range([fAxisWidth, fWidth]);

		var fMin = d3.min(aItems, function(e) {
			return +e.getText();
		});

		var fMax = d3.max(aItems, function(e) {
			return +e.getText();
		});
		
		var scaleY = this._scaleY
			.domain([fMin, fMax])
			.range([fPlotAreaHeight, 0]);
			
		svg.selectAll("*").remove();
		
		// inserting axisY
		// svg.append("g")
		// 	.attr(
		// 		"transform",
		// 		`translate(${fAxisWidth}, 0)`
		// 	)
		// 	.call(d3.axisLeft(this._scaleY));
		
		// inserting axisX
		// svg.append("g")
		// 	.attr(
		// 		"transform",
		// 		`translate(${fPlotAreaHeight}, ${fAxisWidth})`
		// 	)
		// 	.call(d3.axisBottom(this._scaleX));
		
		// inserting line series
		svg.append("path")
			.datum(aItems)
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr(
				"d",
				d3.line()
					.x(function(e, i) {
						return scaleX(i);
					})
					.y(function(e) {
						return scaleY(+e.getText());
					})
			);
      },

      _onResize: function(oEvent) {
        this._fWidth = oEvent.size.width;
        this._fHeight = oEvent.size.height;
        this._draw();
      },

      onAfterRendering: function() {
        this._draw();
      }
    });
  }
);
