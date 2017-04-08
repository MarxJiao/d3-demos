/**
 * @file 折线图
 * @author Mrax
 */

import * as d3 from 'd3';

// 数据源
const dataset = [
    {
        country: 'China',
        gdp: [
            [2000, 11920],
            [2001, 13170],
            [2002, 14550],
            [2003, 16500],
            [2004, 19440],
            [2005, 22880],
            [2006, 17930],
            [2007, 35040],
            [2008, 45479],
            [2009, 67868],
            [2010, 34234],
            [2011, 89876],
            [2012, 98787],
            [2013, 100000]
        ]
    },
    {
        country: 'Japan',
        gdp: [
            [2000, 65420],
            [2001, 45670],
            [2002, 56670],
            [2003, 43230],
            [2004, 23460],
            [2005, 43280],
            [2006, 13430],
            [2007, 45640],
            [2008, 89879],
            [2009, 78468],
            [2010, 56734],
            [2011, 38976],
            [2012, 67787],
            [2013, 89880]
        ]
    }
]


// svg尺寸
const width = 500;
const height = 500;


// 边距
const padding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
}

// 画svg区域
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 计算最大值
let gdpmax = 0;
for (let i = 0, l = dataset.length; i < l; i++) {
    let currentGdp = d3.max(dataset[i].gdp, d => d[1])
    gdpmax = currentGdp > gdpmax ? currentGdp : gdpmax;
}

// x比例尺
const xScale = d3.scaleLinear()
    .domain([2000, 2013])
    .range([0, width - padding.left - padding.right]);

// y比例尺
const yScale = d3.scaleLinear()
    .domain([0, gdpmax * 1.1])
    .range([height - padding.top - padding.bottom, 0]);

// 直线生成器
const linePath = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

console.log(linePath);

// 定义颜色
const colors = [d3.rgb(0, 0, 255), d3.rgb(0, 255, 0)];

// 添加路径
svg.selectAll('path')
    .data(dataset)
    .enter()
    .append('path')
    .attr('transform', 'translate(' + padding.left + ', ' + padding.top + ')')
    .attr('d', d => linePath(d.gdp))
    .attr('fill', 'none')
    .attr('stroke-width', 3)
    .attr('stroke', (d, i) => colors[i]);

// x轴
const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(d3.format('d')); // 去掉年份中间的逗号

const yAxis = d3.axisLeft(yScale);

// 添加x轴
svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' + (height - padding.bottom) + ')')
    .call(xAxis);

// 添加y轴
svg.append('g')
    .attr('transform', 'translate(' + padding.left + ', ' +  padding.top + ')')
    .call(yAxis);
