/**
 * @file 读取要处理的文件夹，按需配置文件
 * @author Marx
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const pages = fs.readdirSync('src', 'utf8');

// 将文件信息保存在files.js里面
fs.writeFile('./files.js', 'export const files = ["' + pages.join('","') + '"];', () => {
    console.log('Saved.');  
})

// HtmlWebpackPlugin数组，用来保存要打包的页面
let plugins = [];

// 入口配置
let entryFiles = {};

for (let page of pages) {
    let pagePlugin = new HtmlWebpackPlugin({
        filename: page + '.html',
        template: './src/' + page + '/index.html',
        chunks: [page, 'commons']
    });
    entryFiles[page] = './src/' + page + '/index.js';
    plugins.push(pagePlugin);
}
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "commons",
    filename: "commons.js"
}))
plugins.push(new webpack.optimize.UglifyJsPlugin({}));

module.exports = {
    plugins,entryFiles
}