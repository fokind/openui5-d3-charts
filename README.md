# OpenUI5 Financial Charts based on d3.js
An OpenUI5 control library based on [d3.js](https://github.com/d3/d3) to create financial charts like candlestick diagramm, indicators e.t.c.

[Imgur](https://i.imgur.com/DZWgXx4.png)

## Demo
You can checkout a live demo here:
https://fokind.github.io/fc/demo/webapp/index.html

## Project Structure
* demo - Demo site for the library
* dist - Distribution folder that contains the library ready to use
* src  - Development folder
* test - Testing framework for the library

## Getting started

### Installation
Install openui5-financial-charts as an npm module
```sh
$ npm install openui5-financial-charts
```

### Configure manifest.json
Add the library to *sap.ui5/dependencies/libs* and set its path in *sap.ui5/resourceRoots* in your manifest.json file, as follows:

```json
{
  "sap.ui5": {
    "dependencies": {
      "libs": {
        "openui5.financial.chart": {}
      }
    },
    "resourceRoots": {
      "openui5.financial.chart": "./FOLDER_WHERE_YOU_PLACED_THE_LIBRARY/openui5/financial/chart/"
    }
  }
}
```

## Usage
1. Prepare data model.

2. Add callback method refresh when the model is ready.
```
var sUri = "./data/buffer.json";
var oChart0 = this.byId("chart0");
oModel.loadData(sUri).then(() => {
  oChart0.refresh();
});
```

3. Add the following to the same view's namespace declarations: `xmlns:chart="openui5.financial.chart"`

4. In the view you want to use chart, insert the following:
```
<chart:Chart id="chart0"
    height="400px"
    padding="5 20 25 60"
    start="{/start}"
    end="{/end}"
    timeframe="15">
    <chart:CandlestickChart items="{/candles}">
        <chart:Candle time="{time}" 
            open="{open}" 
            high="{high}" 
            low="{low}" 
            close="{close}"/>
    </chart:CandlestickChart>
</chart:Chart>
```

## Author
Dmitry Fokin
- LinkedIn: [https://www.linkedin.com/in/fokind/](https://www.linkedin.com/in/fokind/)

## License
This project is licensed under the [MIT](LICENSE) License.
