/* global d3 moment */

sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/ResizeHandler",
    "openui5/chart/Axis",
    "openui5/chart/Series",
    "./thirdparty/d3",
    "./thirdparty/moment-with-locales",
    "./library"
  ],
  function(Control, ResizeHandler) {
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
          series: { type: "openui5.chart.Series", multiple: true }
        },
        defaultAggregation: "series"
      },

      _fWidth: 0,
      _fHeight: 0,
      _fPaddingTop: 0,
      _fPaddingRight: 0,
      _fPaddingBottom: 0,
      _fPaddingLeft: 0,

      _sResizeHandlerId: null,

      _scaleBand: d3.scaleBand(),
      _scaleX: d3.scaleTime(),
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

        svg.selectAll("*").remove();

        var aXAxes = this.getXAxes();
        var aYAxes = this.getYAxes();

        var fWidth = this._fWidth;
        var fHeight = this._fHeight;
        var fPaddingTop = this._fPaddingTop;
        var fPaddingLeft =
          this._fPaddingLeft +
          aYAxes
            .map(function(e) {
              return e.getSize();
            })
            .reduce(function(a, b) {
              return a + b;
            }, 0);
        // UNDONE a padding and a shift border of plot area are not same
        var fPaddingRight = this._fPaddingRight;
        var fPaddingBottom =
          this._fPaddingBottom +
          aXAxes
            .map(function(e) {
              return e.getSize();
            })
            .reduce(function(a, b) {
              return a + b;
            }, 0);
        var fPlotAreaHeight = fHeight - fPaddingTop - fPaddingBottom;

        svg.attr("width", fWidth);
        svg.attr("height", fHeight);

        var aSeries = this.getSeries();
        if (!aSeries.length) {
          return;
        }

        var iLength = d3.max(aSeries, function(e) {
          return e.getItems().length;
        });

        if (iLength <= 1) {
          return;
        }
        
        var aMergedItems = d3.merge(
          aSeries.map(function(e) {
            return e.getItems();
          })
        );

        var aXs = aSeries[0].getItems().map(function(e) { // UNDONE берет из первой серии
        	return moment(e.getKey()).toDate();
        });
        
        // var interval = d3
        //   .timeDay
        //   .every(1)
        //   .range([d3.min(aXs), moment(d3.max(aXs)).add(1).toDate()]);
        
        var iPeriod = moment(aXs[1]).diff(aXs[0]); // UNDONE берет первый период из первой серии данных
        var scaleX = this._scaleX
          .domain([d3.min(aXs), moment(d3.max(aXs)).add(1, "d").toDate()])
          //.ticks(d3.timeDay.every(1))
          //.nice()
          .range([fPaddingLeft, fWidth - fPaddingRight]);

        var scaleY = this._scaleY
          .domain(
            d3.extent(aMergedItems, function(e) {
              return +e.getText();
            })
          )
          .range([fPaddingTop + fPlotAreaHeight, fPaddingTop]);

        // inserting axisY
        if (aYAxes.length) {
          var sYAxisId = aYAxes[0].getId();
          svg
            .append("g")
            .attr("id", sYAxisId)
            .attr("data-sap-ui", sYAxisId)
            .attr("transform", `translate(${fPaddingLeft}, 0)`)
            .call(d3.axisLeft(this._scaleY));
        }

        // inserting axisX
        if (aXAxes.length) {
          var sXAxisId = aXAxes[0].getId();
          svg
            .append("g")
            .attr("id", sXAxisId)
            .attr("data-sap-ui", sXAxisId)
            .attr("transform", `translate(0, ${fPaddingTop + fPlotAreaHeight})`)
            .call(d3.axisBottom(this._scaleX).ticks(d3
              .timeDay
              .every(1))
            );
        }

        // inserting line series
        for (var i = 0; i < aSeries.length; i++) {
          aSeries[i]._draw();
        }
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
