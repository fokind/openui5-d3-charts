sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict";

  return UIComponent.extend("openui5.demo.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);

      var oViewModel = this.getModel("view");
      oViewModel.setData({
        start: "2019-06-10T00:00:00",
        end: "2019-06-16T23:59:00"
      });
    }
  });
});
