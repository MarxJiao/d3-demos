/**
 * @file 读取要处理的文件夹，按需配置文件
 * @author Marx
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs');
const pages = fs.readdirSync('src/demos', 'utf8');

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
        template: './src/demos/' + page + '/index.html',
        chunks: [page, 'commons']
    });
    entryFiles[page] = './src/demos/' + page + '/index.js';
    plugins.push(pagePlugin);
}
entryFiles['index'] = './src/index/index.js';

// 将js和html对应
plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index/index.html',
    chunks: ['index', 'commons']
}));



module.exports = {
    plugins,entryFiles
}