# OpenUI5 Financial Charts based on d3.js
Финансовые диаграммы, такие как Candlestick, индикаторы CCI и др. для создания собственных инструментов технического анализа в OpenUI5. Выполнена с использованием популярной библиотеки [d3.js](https://github.com/d3/d3). Подходит для использования как на настольных компьютерах, так и на мобильных устройствах.

...
A control library wich use the  in UI5 controls to create financial charts like candlestick diagramm, indicators e.t.c.
This is a work in progress.

// красивый скриншот можно разместить здесь
![QRCode preview](https://raw.githubusercontent.com/StErMi/openui5-qrcode/master/preview.PNG)

## Demo
You can checkout a live demo here:
https://.../demo/webapp/index.html

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
To use it you must first install this code in your app.
// привести пример с демо

1. Prepare data model
Сделаем на примере Candlestick chart.
Модель должна представлять свобой массив свечей, где свеча имеет время и четыре значения.

2. Добавьте в контроллер команду на перерисовку диаграммы после загрузки данных
Если модель подключается асинхронно или изменяется, то после обновления модели необходимо перерисовать диаграмму.
Диаграмма не поддерживает "live mode" следит за моделью, но без команды не перерисовывается.

2. Add the following to the same view's namespace declarations: `xmlns:chart="openui5.financial.chart"`

2. In the view you want to use chart, insert the following:
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

## API
### Chart
#### Properties
| Name | Type | Default| Description
| :---- | :------------------- | :---- | :---------  |
| id | string | auto | Нужно чтобы перерисовать диаграмму после обновления модели данных.
| height | CSS | 150px | Minimum number of characters. Value '0' means the feature is switched off.
| padding | boolean | true | Indicates that input must contain numbers
| start | moment like | true | Indicates that input must contain symbols
| end | moment like | true | Indicates that input must contain letters
| timeframe | integer | 1 | The score is a number which indicates the password strength.

### CandlestickChart
#### Aggregations
| Name | Type | Default| Description
| :---- | :------------------- | :---- | :---------  |
| items | string | auto | Нужно чтобы перерисовать диаграмму после обновления модели данных.

### Candle
| Name | Type | Default| Description
| :---- | :------------------- | :---- | :---------  |
| time | integer | 0 | Maximum number of characters. Value '0' means the feature is switched off.
| open | integer | 0 | Minimum number of characters. Value '0' means the feature is switched off.
| high | boolean | true | Indicates that input must contain numbers
| low | boolean | true | Indicates that input must contain symbols
| close | boolean | true | Indicates that input must contain letters

## Author
Dmitry Fokin
- LinkedIn: [https://www.linkedin.com/in/fokind/](https://www.linkedin.com/in/fokind/)

## License
This project is licensed under the [MIT](LICENSE) License.
