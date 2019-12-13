sap.ui.define(["jquery.sap.global", "sap/ui/core/library"], function() {
  "use strict";

  sap.ui.getCore().initLibrary({
    name: "openui5.financial.chart",
    dependencies: ["sap.ui.core", "sap.m"],
    types: [],
    interfaces: [],
    controls: [
      "openui5.financial.chart.Chart",
      "openui5.financial.chart.LineChart",
      "openui5.financial.chart.LineChartItem",
      "openui5.financial.chart.Series",
      "openui5.financial.chart.SeriesItem"
    ],
    elements: [],
    noLibraryCSS: true,
    version: "${version}"
  });

  return openui5.financial.chart;
});
