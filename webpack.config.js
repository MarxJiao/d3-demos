/**
 * @file webpack配置文件
 * @author Marx
 */

let pack = require('./webapck.pack.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [...pack.plugins, new ExtractTextPlugin('[name].css')]
const config = {
    entry: pack.entryFiles,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader' 
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader!less-loader'
            })
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
        port: 9000
    },
    devtool: 'inline-source-map'
};
module.exports = config;