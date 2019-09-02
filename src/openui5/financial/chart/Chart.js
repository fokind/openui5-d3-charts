/* global d3 moment */

sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/ResizeHandler",
    "./TimeAxis",
    "./ValueAxis",
    "./library",
    "./thirdparty/d3",
    "./thirdparty/moment-with-locales"
  ],
  function(Control, ResizeHandler, TimeAxis, ValueAxis) {
    "use strict";

    return Control.extend("openui5.financial.chart.Chart", {
      metadata: {
        library: "openui5.financial.chart",
        properties: {
          height: { type: "string", defaultValue: "100%" },
          width: { type: "string", defaultValue: "100%" },
          padding: { type: "string", defaultValue: "0" },
          start: "string",
          end: "string",
          period: { type: "float", defaultValue: 1 }
        },
        aggregations: {
          _timeAxis: {
            type: "openui5.financial.chart.TimeAxis",
            multiple: false
          },
          _valueAxis: {
            type: "openui5.financial.chart.ValueAxis",
            multiple: false
          },
          series: { type: "openui5.financial.chart.Series", multiple: true }
        },
        defaultAggregation: "series"
      },

      init: function() {
        this.setAggregation("_timeAxis", new TimeAxis());
        this.setAggregation("_valueAxis", new ValueAxis());
        ResizeHandler.register(this, this.onResize.bind(this));
      },

      onResize: function(oEvent) {
        this._fWidth = oEvent.size.width;
        this._fHeight = oEvent.size.height;
        this._draw();
      },

      setStart: function(sValue) {
        this.setProperty("start", sValue, true);
      },

      setEnd: function(sValue) {
        this.setProperty("end", sValue, true);
      },

      setPeriod: function(fPeriod) {
        this.setProperty("period", fPeriod, true);
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

        this.setProperty("padding", sPadding, true);
      },

      onAfterRendering: function() {
        this._svg = d3.select("#" + this.getId()).select("svg");
        this._draw();
      },

      _draw: function() {
        if (!this._fWidth || !this._fHeight || !this._fPaddingTop) return;

        var fWidth = this._fWidth;
        this._svg.attr("width", fWidth);
        this._fPlotAreaWidth =
          fWidth - this._fPaddingLeft - this._fPaddingRight;
        this.getAggregation("_timeAxis").setRange([0, this._fPlotAreaWidth]);

        var fHeight = this._fHeight;
        this._svg.attr("height", fHeight);
        this._fPlotAreaHeight =
          fHeight - this._fPaddingBottom - this._fPaddingTop;
        this.getAggregation("_valueAxis").setRange([this._fPlotAreaHeight, 0]);
        // сдвинуть вниз ось времени
        this.getAggregation("_valueAxis")._draw();
        this.getAggregation("_timeAxis")._draw();

        var aSeries = this.getSeries();
        for (var i = 0; i < aSeries.length; i++) {
          aSeries[i]._draw();
        }
      },

      refresh: function() {
        var aSeries = this.getSeries();
        this.getAggregation("_valueAxis").setDomain([
          d3.min(aSeries, e => e._getMin()),
          d3.max(aSeries, e => e._getMax())
        ]);

        this.getAggregation("_timeAxis").setDomain([
          moment(this.getStart()).toDate(),
          moment(this.getEnd()).toDate()
        ]);

        this._draw();
      }
    });
  }
);
