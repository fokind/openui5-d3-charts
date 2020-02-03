sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict";

  return UIComponent.extend("ui5lab.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getModel().setProperty("/data", [
        { x: "2020-01-01", a: 0, b: 1 },
        { x: "2020-01-02", a: 3, b: 0 },
        { x: "2020-01-03", a: 2, b: 3 },
        { x: "2020-01-04", a: 3, b: 5 }
      ]);
    }
  });
});
