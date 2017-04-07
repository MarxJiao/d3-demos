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
const width = 400;
const height = 400;
const xAxisWidth = 300;
const yAxisWidth = 300;
const padding = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const xScale = d3.scaleLinear()
    .domain([0, 1.2 * d3.max(center, d => d[0])])
    .range([0, xAxisWidth]);

const yScale = d3.scaleLinear()
    .domain([0, 1.2 * d3.max(center, d => d[1])])
    .range([yAxisWidth, 0]);

const circle = svg.selectAll('circle')
    .data(center)
    .enter()
    .append('circle')
    .attr('fill', 'black')
    .attr('cx', d => padding.left + xScale(d[0]))
    .attr('cy', d => padding.top + yScale(d[1]))
    .attr('r', 5);

const xAxis = d3.axisBottom(xScale);

svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' + (padding.top + yAxisWidth) + ')')
    .call(xAxis)

const yAxis = d3.axisLeft(yScale).ticks(5);

svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')')
    .call(yAxis);