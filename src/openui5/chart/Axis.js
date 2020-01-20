/* global d3 */

sap.ui.define(["sap/ui/core/Control", "./library", "./thirdparty/d3"], function(
  Control
) {
  "use strict";

  return Control.extend("openui5.chart.Axis", {
    metadata: {
      library: "openui5.chart",
      properties: {
        size: { type: "float", defaultValue: 0 }
      }
    },

    renderer: {}
  });
});