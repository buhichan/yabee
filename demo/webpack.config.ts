import {Configuration} from "webpack"
import * as HTMLWebpackPlugin from "html-webpack-plugin"
import * as path from "path"

const config:Configuration = {
    entry:path.join(__dirname,"test.js"),
    mode:"development",
    output:{

    },
    plugins:[
        new HTMLWebpackPlugin({
            template:path.join(__dirname,"index.html")
        })
    ],
    devServer:{
        port:10020,
        historyApiFallback:true,
        contentBase: path.resolve(__dirname),
        publicPath: '/'
    },
    devtool:"inline-source-map"
}

module.exports = config