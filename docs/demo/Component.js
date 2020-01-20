sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function(UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("ui5lab.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getModel().setProperty("/data", [
      	{ y: 0 },
      	{ y: -1 },
      	{ y: 2 },
      	{ y: 3 }
      ]);
    }
  });
});
