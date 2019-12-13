sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
  "use strict";

  return Controller.extend("ui5lab.demo.controller.App", {
    onInit: function() {
      var oModel = this.getOwnerComponent().getModel();

      var sUri = "./data/buffer.json";
      var oChart0 = this.byId("chart0");
      oModel.loadData(sUri, {}, false);
      setTimeout(() => {
        oChart0.refresh();
      });
    }
  });
});
