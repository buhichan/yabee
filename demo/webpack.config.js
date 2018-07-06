"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTMLWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var config = {
    entry: path.join(__dirname, "test.js"),
    mode: "development",
    output: {},
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "index.html")
        })
    ],
    devServer: {
        port: 10020,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname),
        publicPath: '/'
    },
    devtool: "inline-source-map"
};
module.exports = config;
//# sourceMappingURL=webpack.config.js.map