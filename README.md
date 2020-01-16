# OpenUI5 Financial Charts based on d3.js
An OpenUI5 control library based on [d3.js](https://github.com/d3/d3) to create charts as resposive bindable fiori-like controls.

## Demo
You can checkout a live demo here:
https://fokind.github.io/openui5-d3-charts/demo/webapp/index.html

## Project Structure
* demo - Demo site for the library
* dist - Distribution folder that contains the library ready to use
* src  - Development folder
* test - Testing framework for the library

## Getting started

### Installation
Install openui5-d3-charts as an npm module
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
1. Prepare data model.

2. Add the following to the same view's namespace declarations: `xmlns:chart="openui5.chart"`

3. It is very simple to use in style like other bindable controls. Insert the following control:
```
<chart:Chart>
	<chart:LineChart items="{/data}">
		<chart:LineChartItem
			time="{time}" 
			value="{value}"/>
	</chart:LineChart>
</chart:Chart>
```

## Author
Dmitry Fokin
- LinkedIn: [https://www.linkedin.com/in/fokind/](https://www.linkedin.com/in/fokind/)

## License
This project is licensed under the [MIT](LICENSE) License.
