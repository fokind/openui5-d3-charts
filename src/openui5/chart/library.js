sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.chart",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.chart.Chart"
    ],
    elements: [
      "openui5.chart.Axis",
      "openui5.chart.Candle",
      "openui5.chart.CandlestickSeries",
      "openui5.chart.ColumnSeries",
      "openui5.chart.Item",
      "openui5.chart.LineSeries",
      "openui5.chart.Point",
      "openui5.chart.Series"
	],
    noLibraryCSS: false,
    version: "${version}"
  });

  return openui5.chart;
});
