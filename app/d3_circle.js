import * as d3 from 'd3';

export class D3Circle {
    draw(container_id) {
        d3.select('#' + container_id)
            .append('svg')
            .attr('width', 250)
            .attr('height', 250)
            .append('circle')
            .attr('cx', 125)
            .attr('cy', 125)
            .attr('r', 30)
            .attr('fill', 'blue')
    }
}
