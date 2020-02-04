sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict";

  return UIComponent.extend("ui5lab.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getModel().setProperty("/data", [
        { x: "2020-01-01", o: 2, h: 4, l: 1, c: 3 },
        { x: "2020-01-02", o: 2, h: 4, l: 1, c: 3 },
        { x: "2020-01-03", o: 2, h: 6, l: 1, c: 4 },
        { x: "2020-01-04", o: 2, h: 5, l: 1, c: 3 }
      ]);
    }
  });
});
