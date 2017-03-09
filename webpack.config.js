var webpack = require('webpack');

var package_json = require('./package.json');
var npm_package_array = Object.keys(package_json.dependencies);

var proj_config = require('./proj_config.json');
var dest_path = [__dirname, proj_config.output_path].join('/');

module.exports = function(env) {
    return {
        entry: {
            main: proj_config.entry_point,
            vendor: npm_package_array
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
