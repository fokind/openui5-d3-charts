/* global d3 */

sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/ResizeHandler",
    "sap/ui/core/Item",
    "openui5/chart/Axis",
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
          padding: { type: "string", defaultValue: "0" }
        },
        aggregations: {
          xAxes: { type: "openui5.chart.Axis", multiple: true },
          yAxes: { type: "openui5.chart.Axis", multiple: true },
          items: { type: "sap.ui.core.Item", multiple: true }
        },
        defaultAggregation: "items"
      },

      _fWidth: 0,
      _fHeight: 0,
      _fPaddingTop: 0,
      _fPaddingRight: 0,
      _fPaddingBottom: 0,
      _fPaddingLeft: 0,

      _sResizeHandlerId: null,

      _scaleX: d3.scaleLinear(),
      _scaleY: d3.scaleLinear(),

      init: function() {
        this._sResizeHandlerId = ResizeHandler.register(
          this,
          this._onResize.bind(this)
        );
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

      setPadding: function(sPadding) {
        var aPadding = sPadding.split(" ");
        var iPaddingLength = aPadding.length;

        this._fPaddingTop = +aPadding[0];
        this._fPaddingRight = +aPadding[iPaddingLength === 1 ? 0 : 1];
        this._fPaddingBottom = +aPadding[iPaddingLength < 3 ? 0 : 2];
        this._fPaddingLeft = +aPadding[
          iPaddingLength === 1 ? 0 : iPaddingLength === 4 ? 3 : 1
        ];

        this.setProperty("padding", sPadding);
      },

      _draw: function() {
        var div = d3.select("#" + this.getId());
        var svg = div.select("svg");

        if (svg.empty()) {
          svg = div.append("svg");
        }

        var aItems = this.getItems();
        var aXAxes = this.getXAxes();
        var aYAxes = this.getYAxes();

        var fWidth = this._fWidth;
        var fHeight = this._fHeight;
        var fPaddingTop = this._fPaddingTop;
        var fPaddingLeft = this._fPaddingLeft + aYAxes.map(function(e) { return e.getSize(); }).reduce(function(a, b) {
        	return a + b;
        }, 0);
        // UNDONE a padding and a shift border of plot area are not same
        var fPaddingRight = this._fPaddingRight;
        var fPaddingBottom = this._fPaddingBottom + aXAxes.map(function(e) { return e.getSize(); }).reduce(function(a, b) {
        	return a + b;
        }, 0);
        var fPlotAreaHeight = fHeight - fPaddingTop - fPaddingBottom;

        svg.attr("width", fWidth);
        svg.attr("height", fHeight);

        var scaleX = this._scaleX
          .domain([0, aItems.length - 1])
          .range([fPaddingLeft, fWidth - fPaddingRight]);

        var fMin = d3.min(aItems, function(e) {
          return +e.getText();
        });

        var fMax = d3.max(aItems, function(e) {
          return +e.getText();
        });

        var scaleY = this._scaleY
          .domain([fMin, fMax])
          .range([fPaddingTop + fPlotAreaHeight, fPaddingTop]);

        svg.selectAll("*").remove();

        // inserting axisY
        if(aYAxes.length) {
	        svg
	          .append("g")
	          .attr("transform", `translate(${fPaddingLeft}, 0)`)
	          .call(d3.axisLeft(this._scaleY));
		}

        // inserting axisX
        if(aXAxes.length) {
	        svg
	          .append("g")
	          .attr("transform", `translate(0, ${fPaddingTop + fPlotAreaHeight})`)
	          .call(d3.axisBottom(this._scaleX));
        }
        
        // inserting line series
        svg
          .append("path")
          .datum(aItems)
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr(
            "d",
            d3
              .line()
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
