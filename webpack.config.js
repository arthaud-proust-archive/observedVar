const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ObservedVar',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    },
};