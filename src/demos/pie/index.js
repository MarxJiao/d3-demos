/**
 * @file pie layout
 * @author Marx
 */

import {pie, arc, scaleOrdinal, schemeCategory20, select, selectAll, sum} from 'd3';

const dataset = [
    ['小米', 60.8],
    ['大米', 90.8],
    ['小黑', 44.8],
    ['小白', 78.8],
    ['小六', 39.8]
]

// 新建pie layout
const myPie = pie()

// 将原始数据转换为我们需要的数据
const pieData =  myPie.value(d => d[1]);

// 布局数据
// svg宽度
const width = 400;

// svg高度
const height = 400;

const outerRadius = width / 3;
const innerRadius = 0;

const myArc = arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

const color = scaleOrdinal(schemeCategory20);

// 在body中添加svg，并设置尺寸
const svg = select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

const arcs = svg.selectAll('g')
                .data(pieData(dataset))
                .enter()
                .append('g')
                .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')');

arcs.append('path')
    .attr('fill', (d, i) => color(i))
    .attr('d', d => myArc(d));

arcs.append('text')
    .attr('transform', d => {
        const x = myArc.centroid(d)[0] * 1.4;
        const y = myArc.centroid(d)[1] * 1.4;
        return 'translate(' + x + ', ' + y + ')';
    })
    .attr('text-anchor', 'middle')
    .text(d => {
        const percent = Number(d.value) / sum(dataset, d => d[1]) * 100;
        return percent.toFixed(1) + '%';
    });

arcs.append('line')
    .attr('stroke', 'black')
    .attr('x1', d => myArc.centroid(d)[0] * 2)
    .attr('y1', d => myArc.centroid(d)[1] * 2)
    .attr('x2', d => myArc.centroid(d)[0] * 2.2)
    .attr('y2', d => myArc.centroid(d)[1] * 2.2)

arcs.append('text')
    .attr('transform', d => {
        const x = myArc.centroid(d)[0] * 2.5;
        const y = myArc.centroid(d)[1] * 2.5;
        return 'translate(' + x + ', ' + y + ')';
    })
    .attr('text-anchor', 'middle')
    .text(d => d.data[0])