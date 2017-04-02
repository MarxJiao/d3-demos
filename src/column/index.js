import * as d3 from "d3";

d3.select('body')
    .selectAll('p')
    .text('你好世界')

const p = d3.select('body')
    .select('p')

p.datum(7).text((d, i) => { return d + i});
console.log(p.datum());