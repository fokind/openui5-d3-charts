sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
  "use strict";

  return Controller.extend("ui5lab.demo.controller.App", {
    onInit: function() {
      var oModel = this.getOwnerComponent().getModel();

      var sUri = "./data/buffer.json";
      var oChart0 = this.byId("chart0");
      var oChart1 = this.byId("chart1");
      var oChart2 = this.byId("chart2");
      var oChart3 = this.byId("chart3");
      var oChart4 = this.byId("chart4");
      var oChart5 = this.byId("chart5");

      oModel.loadData(sUri, {}, false);
      setTimeout(() => {
        oChart0.refresh();
        oChart1.refresh();
        oChart2.refresh();
        oChart3.refresh();
        oChart4.refresh();
        oChart5.refresh();
      });
    }
  });
});
