/**
 * @file webpack配置文件
 * @author Marx
 */

let pack = require('./webapck.pack.js');

const config = {
    entry: pack.entryFiles,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader' 
        }]
    },
    
    plugins: pack.webpackPages,
    devServer:{
        inline:true,
        contentBase: __dirname + "dist",
        compress: true,
        port: 9000
    }
};
module.exports = config;