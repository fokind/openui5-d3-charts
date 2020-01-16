sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.chart",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.chart.Chart",
      "openui5.chart.LineChart",
      "openui5.chart.LineChartItem",
      "openui5.chart.Series",
      "openui5.chart.SeriesItem"
    ],
    elements: [],
    noLibraryCSS: true,
    version: "${version}"
  });

  return openui5.chart;
});
