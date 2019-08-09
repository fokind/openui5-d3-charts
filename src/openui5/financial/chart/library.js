sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.financial.chart",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.financial.chart.Candle",
      "openui5.financial.chart.CandlestickChart",
      "openui5.financial.chart.Chart",
      "openui5.financial.chart.LineChart",
      "openui5.financial.chart.LineChartItem",
      "openui5.financial.chart.Series",
      "openui5.financial.chart.SeriesItem",
      "openui5.financial.chart.SteppedLineChart",
      "openui5.financial.chart.TimeAxis",
      "openui5.financial.chart.ValueAxis"
    ],
    elements: [],
    noLibraryCSS: false,
    version: "${version}"
  });

  return openui5.financial.chart;
});
