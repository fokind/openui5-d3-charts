sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function(UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("ui5lab.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getModel().setProperty("/data", [
      	{ a: 0, b: 1 },
      	{ a: -1, b: 1 },
      	{ a: 2, b: 3 },
      	{ a: 3, b: 5 }
      ]);
    }
  });
});
