/**
 * @file webpack配置文件
 * @author Marx
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: './src/index/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    rules: [{
        test: /\.js$/,
        use: 'babel-loader' 
    }],
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index/index.html'
    })],
    devServer:{
        inline:true,
        contentBase: __dirname + "dist",
        compress: true,
        port: 9000
    }
};
module.exports = config;