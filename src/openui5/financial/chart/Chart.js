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
          timeframe: "string"
        },
        aggregations: {
          _timeAxis: { type: "openui5.financial.chart.TimeAxis", multiple: false },
          _valueAxis: { type: "openui5.financial.chart.ValueAxis", multiple: false },
          series: { type: "openui5.financial.chart.Series", multiple: true }
        },
        defaultAggregation: "series"
      },

      init: function() {
        var oControl = this;
        oControl.setAggregation("_timeAxis", new TimeAxis());
        oControl.setAggregation("_valueAxis", new ValueAxis());

        ResizeHandler.register(oControl, function() {
          oControl._draw();
        });
      },

      setStart: function(sValue) {
        this.getAggregation("_timeAxis").setStart(sValue);
        this.setProperty("start", sValue, true);
      },

      setEnd: function(sValue) {
        this.getAggregation("_timeAxis").setEnd(sValue);
        this.setProperty("end", sValue, true);
      },

      setTimeframe: function(sValue) {
        this.getAggregation("_timeAxis").setTimeframe(sValue);
        this.setProperty("timeframe", sValue, true);
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

      onAfterRendering: function() {
        this._draw();
      },

      refresh: function() {
        var oControl = this;
        // посчитать мин макс
        var aSeries = oControl.getSeries();
        var oValueAxis = this.getAggregation("_valueAxis");

        var fMin = d3.min(aSeries, function(e) {
          return e._getMin();
        });
        oValueAxis.setMin(fMin);

        var fMax = d3.max(aSeries, function(e) {
          return e._getMax();
        });
        oValueAxis.setMax(fMax);

        // перерисовать
        this._draw();
      },

      _draw: function() {
        var oControl = this;
        var div = d3.select("#" + oControl.getId());

        if (!div.node()) return;

        var fWidth = div.node().offsetWidth;
        var fHeight = div.node().offsetHeight;

        var svg = div
          .select("svg")
          .attr("width", fWidth)
          .attr("height", fHeight);

        // оси
        oControl.getAggregation("_timeAxis")._draw();
        oControl.getAggregation("_valueAxis")._draw();

        // все серии
        var aSeries = oControl.getSeries();
        for (var i = 0; i < aSeries.length; i++) {
          aSeries[i]._draw();
        }
      }
    });
  }
);
