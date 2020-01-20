# OpenUI5 Charts based on d3.js
An OpenUI5 library based on [d3.js](https://github.com/d3/d3) to create charts as responsive bindable fiori-like controls.

## Demo
You can checkout a live demo here: https://fokind.github.io/openui5-d3-charts/demo/index.html

## Project Structure
* demo - Demo site for the library
* dist - Distribution folder that contains the library ready to use
* src  - Development folder
* test - Testing framework for the library

## Getting started

### Installation
Install openui5-charts as an npm module
```sh
$ npm install openui5-charts
```

### Configure manifest.json
Add the library to *sap.ui5/dependencies/libs* and set its path in *sap.ui5/resourceRoots* in your manifest.json file, as follows:

```json
{
  "sap.ui5": {
    "dependencies": {
      "libs": {
        "openui5.chart": {}
      }
    },
    "resourceRoots": {
      "openui5.chart": "./FOLDER_WHERE_YOU_PLACED_THE_LIBRARY/openui5/chart/"
    }
  }
}
```

## Usage
1. Prepare data model. For examle:
```
this.getModel().setProperty("/data", [
	{ y: 0 },
	{ y: -1 },
	{ y: 2 },
	{ y: 3 }
]);
```

2. Add the following namespace declarations to the view with chart control:
```
xmlns:core="sap.ui.core"
xmlns:chart="openui5.chart"
```

3. Add the following control to the view:
```
<chart:Chart items="{/data}">
	<core:Item text="{y}"/>
</chart:Chart>
```
It's all!

It is very simple to use in style like other bindable controls. All that is required is to make two bindings: a set of points and a property that contains values.

If the model changes, or the window is resized, the chart will redrawn.

## Author
Dmitry Fokin
- LinkedIn: [https://www.linkedin.com/in/fokind/](https://www.linkedin.com/in/fokind/)

## License
This project is licensed under the [MIT](LICENSE) License.
