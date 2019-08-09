sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
  "use strict";

  return Controller.extend("ui5lab.demo.controller.Main", {
    onInit: function() {
      var oModel = this.getOwnerComponent().getModel();

      var sUri = "./data/buffer.json";
      var oChart0 = this.byId("chart0");
      var oChart1 = this.byId("chart1");
      var oChart2 = this.byId("chart2");

      oModel.loadData(sUri).then(() => {
        oChart0.refresh();
        oChart1.refresh();
        oChart2.refresh();
      });
    }
  });
});
