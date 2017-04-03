/**
 * @file 柱形图
 * @author Marx
 */

import './index.less';
import * as d3 from 'd3';

// 柱形图的数据
const dataset = [50, 43, 120, 87, 99, 167, 142];

// svg区域大小
const width = 400;
const height = 400;
const padding = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

// 矩形所占的宽度，包括空白
const rectStep = 35;
// 矩形所占的宽度，不包括空白
const rectwidth = 30;

// 画svg区域
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 画矩形
updateRect();

// 填写文字
updateText();

/**
 * 画矩形
 *
 * @param {Object} rect 矩形选择集
 */
function drawRect(rect) {
    rect.attr('fill', 'steelblue')
        .attr('x', (d, i) => padding.left + i * rectStep)
        .attr('y', d => height - padding.bottom - d)
        .attr('width', rectwidth)
        .attr('height', d => d);
}

/**
 * 填写文字
 *
 * @param {Object} text 文字选择集
 */
function drawText(text) {
    text.attr('fill', '#fff')
        .attr('font-size', '14px')
        .attr('text-anchor', 'middle')
        .attr('x', (d, i) => padding.left + i * rectStep)
        .attr('y', d => height - d - padding.top)
        .attr('dx', rectwidth / 2)
        .attr('dy', '1em')
        .text(d => d);
}

/**
 * 更新矩形
 */
function updateRect() {
    const update = svg.selectAll('rect')
        .data(dataset);
    const enter = update.enter()
        .append('rect');
    drawRect(update);
    drawRect(enter);
}

/**
 * 更新文字
 */
function updateText() {
    const update = svg.selectAll('text')
        .data(dataset);
    const enter = update.enter()
        .append('text');
    drawText(update);
    drawText(enter);
}
