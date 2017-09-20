/**
 * @file 缩放
 *
 * @author Marx
 */

import * as d3 from 'd3';

const circle = [
    {cx: 150, cy: 200, r: 30},
    {cx: 220, cy: 200, r: 30},
    {cx: 150, cy: 270, r: 30},
    {cx: 220, cy: 270, r: 30}
];

const width = 500;
const height = 500;

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const zoom = d3.zoom()
    .scaleExtent([0.5, 10])
    
    .on('zoom', function (d) {
        d3.select(this)
            .attr('transform', d3.event.transform);
    });

const g = svg.append('g')
    .call(zoom);

g.selectAll('circle')
    .data(circle)
    .enter()
    .append('circle')
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', d => d.r)
    .attr('fill', 'blue');