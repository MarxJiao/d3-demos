/**
 * @file 散点图实现
 * @author Marx
 */

import * as d3 from 'd3';

// 数据源
const center = [
    [0.5, 0.5],
    [0.7, 0.8],
    [0.4, 0.9],
    [0.11, 0.32],
    [0.88, 0.25],
    [0.75, 0.12],
    [0.5, 0.1],
    [0.2, 0.3],
    [0.4, 0.1],
    [0.6, 0.7]
];

// 布局数据
// svg宽度
const width = 400;

// svg高度
const height = 400;

// x轴长度
const xAxisWidth = 300;

// y轴长度
const yAxisWidth = 300;

// 边距
const padding = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// 在body中添加svg，并设置尺寸
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// x轴比例尺
const xScale = d3.scaleLinear()
    .domain([0, 1.2 * d3.max(center, d => d[0])])
    .range([0, xAxisWidth]);

// y轴比例尺
const yScale = d3.scaleLinear()
    .domain([0, 1.2 * d3.max(center, d => d[1])])
    .range([yAxisWidth, 0]);

// drag事件
const drag = d3.drag()
    .on('start', function () {
        console.log('拖拽开始');
    })
    .on('end', function () {
        console.log('拖拽结束');
    })
    .on('drag', function (d) {
        d3.select(this)
            .attr('cx', d3.event.x)
            .attr('cy', d3.event.y)
    });

// 为页面中的圆添加数据，因为初始页面没有圆，选数据的enter部分添加圆
const circle = svg.selectAll('circle')
    .data(center)
    .enter()
    .append('circle')
    .attr('fill', 'black')
    .attr('cx', d => padding.left + xScale(d[0]))
    .attr('cy', d => padding.top + yScale(d[1]))
    .attr('r', 5)
    // 鼠标事件
    .on('mouseover',function (d, i) {  // 注意这里不能使用箭头函数
        d3.select(this)
            .attr('fill', 'yellow');
    })
    .on('mouseout', function (d, i) {  // 注意这里不能使用箭头函数
        d3.select(this)
            .transition()
            .duration(500)
            .attr('fill', 'black');
    })
    .call(drag);

// x坐标轴
const xAxis = d3.axisBottom(xScale);

// 添加x坐标轴
svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' + (padding.top + yAxisWidth) + ')')
    .call(xAxis)

// y坐标轴
const yAxis = d3.axisLeft(yScale).ticks(5);

// 添加y轴
svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')')
    .call(yAxis);