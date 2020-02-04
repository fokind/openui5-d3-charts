/* global d3 */

sap.ui.define(["sap/ui/core/Element", "./library", "./thirdparty/d3"], function(
  Element
) {
  "use strict";

  return Element.extend("openui5.chart.Axis", {
    metadata: {
      library: "openui5.chart",
      properties: {
        size: { type: "float", defaultValue: 0 }
      }
    }
  });
});
