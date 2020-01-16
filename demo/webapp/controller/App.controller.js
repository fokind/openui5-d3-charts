sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ui5lab.demo.controller.App", {
		onInit: function () {
			var oModel = new JSONModel({
				candles: []
			});
			var oDataModel = new JSONModel();
			this.getView().setModel(oModel);
			var sUri = "./data/buffer.json";
			var oChart0 = this.byId("chart0");
			oDataModel.loadData(sUri, {}, false);
			var aCandles = oDataModel.getProperty("/candles");
			var iLength = aCandles.length;
			var i = 0;
			setInterval(function () {
				if (++i > 1 && i < iLength) {
					oModel.setProperty("/candles", aCandles.slice(Math.max(i - 15, 0), i));
					oChart0.refresh();
				}
			}, 300);
		}
	});
});