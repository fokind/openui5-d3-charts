sap.ui.define(["./Series","./library","./thirdparty/d3","./thirdparty/moment-with-locales"],function(e){"use strict";return e.extend("openui5.financial.chart.LineChart",{metadata:{aggregations:{items:{type:"openui5.financial.chart.LineChartItem",multiple:true}}},renderer:{},_draw:function(){e.prototype._draw.apply(this);var t=this.getParent();var a=d3.select("#"+t.getId()).select("svg");if(a.empty()||!t._fWidth||!t._fHeight){return}var i=this.getItems();var a=d3.select("#"+t.getId()).select("svg");var r=d3.scaleTime().domain([moment(i[0].getTime()).toDate(),moment(i[i.length-1].getTime()).toDate()]).range([0,t._fWidth]);var n=d3.scaleLinear().domain([d3.min(i,e=>e.getValue()),d3.max(i,e=>e.getValue())]).range([t._fHeight,0]);var d=d3.select("#"+this.getId());d.append("path").datum(i).attr("fill","none").attr("stroke","steelblue").attr("d",d3.line().x(e=>r(moment(e.getTime()).toDate())).y(e=>n(e.getValue())))}})});