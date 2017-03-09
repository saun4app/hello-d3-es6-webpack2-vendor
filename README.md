# hello-d3-es6-webpack2-vendor
`hello-d3-es6-webpack2-vendor` shows an example of using `webpack 2` to create a browser ready JavaScript files (`main.js`, `vendor.js`) from a ES6 class.  

<table>
<tr>
<td valign="top">ES6 Code
<ul>
<li>app/d3_circle.js</li>
<li>demo/demo.js</li>
</ul>
</td>
<td> ==> </td>
<td valign="top">Browser-ready JavaScript
<ul>
<li>demo/main.js</li>
<li>demo/vendor.js</li>
</ul>
</td>
</tr>
</table>


## Installation

### `npm` global
```
npm install -g http-server
```

### Clone `hello-d3-es6-webpack2-vendor` into `d3-demo` directory
```
git clone https://github.com/saun4app/hello-d3-es6-webpack2-vendor.git d3-demo
```

or

### Create the code manually

```
mkdir d3-demo
cd d3-demo
npm init -y
npm install --save -D webpack
npm install --save d3
```

#### Create Srouce Code
`app/d3_circle.js`, `demo/demo.js`, `demo/index.html`, see directory structure and file content below.

### Create Browser-ready Javascfipt file
```bash
webpack --config webpack.config.js
```

### Start the server from `demo` directory
```bash
http-server
```
`http-server` provided URL should display a circle:
<div>
<img src="https://rawgit.com/saun4app/hello-d3-es6-webpack2-vendor/master/circle.svg">
</div>

### Directory Structure
```
d3-demo
├── app
│   └── d3_circle.js
├── demo
│   ├── demo.js
│   ├── index.html
│   ├── main.js
│   └── vendor.js
├── node_modules
├── proj_config.js
├── webpack.config.js
```

### JavaScript and HTML Files

**app/d3_circle.js**

```javascript
import * as d3 from 'd3';

export class D3Circle {
    draw(container_id) {
        d3.select('#' + container_id)
            .append('svg')
            .attr('width', 250)
            .attr('height', 250)
            .append('circle')
            .attr('cx', 125)
            .attr('cy', 125)
            .attr('r', 30)
            .attr('fill', 'blue')
    }
}

```

**demo/demo.js**

```javascript
import { D3Circle } from '../app/d3_circle.js';

var chart_obj = new D3Circle();
chart_obj.draw('el_chart');
```

**demo/index.html**

```html
<html>
<head>
    <title>d3 demo ES6 webpack 2 </title>
</head>
<body>
    <div id='el_chart'></div>
    <script src='vendor.js'></script>
    <script src='main.js'></script>        
</body>
</html>
```

**webpack.config.js**

```javascript
var webpack = require('webpack');

var package_json = require('./package.json');
var package_name_array = Object.keys(package_json.dependencies);

var proj_config = require('./proj_config.json');
var dest_path = [__dirname, proj_config.output_path].join('/');

module.exports = function(env) {
    return {
        entry: {
            main: proj_config.entry_point,
            vendor: package_name_array
        },
        output: {
            filename: '[name].js',
            path: dest_path
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [proj_config.vendor_bundle_name]
            })
        ]
    }
}
```

**proj_config.json**

```json
{
  "entry_point": "./demo/demo.js",
  "output_file": "browser_bundle.js",
  "output_path": "demo",
  "vendor_bundle_name": "vendor"
}
```


Webpack 2 terminology
- `demo/demo.js` is the <a href="https://webpack.js.org/concepts/entry-points" target="_black">**entry point**</a>
- `demo/browser_bundle.js` is the <a href="https://webpack.js.org/concepts/output" target="_black">**entry output**</a>




## Resources
- https://webpack.js.org/guides/get-started
- https://webpack.js.org/concepts/entry-points
- https://webpack.js.org/concepts/output
- https://www.npmjs.com/package/http-server
