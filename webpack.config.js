/**
 * @file webpack配置文件
 * @author Marx
 */

var OpenBrowserPlugin = require('open-browser-webpack-plugin');

let pack = require('./webapck.pack.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let plugins = [...pack.plugins, new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
})];
plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:9000' }))
const config = {
    entry: pack.entryFiles,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader' 
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader'
            ]
        },
        {
          // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
          test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
          use: 'file-loader?name=./static/fonts/[name].[ext]',
        }
        ]
    },
    
    plugins,
    devServer:{
        inline:true,
        contentBase: __dirname + "dist",
        compress: true,
        port: 9000,
        host: "0.0.0.0"
    },
    devtool: 'inline-source-map'
};
module.exports = config;