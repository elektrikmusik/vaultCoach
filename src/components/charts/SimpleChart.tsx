import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { createBarScale, createColorScale, formatNumber } from '@/lib/d3Helpers';
import type { ChartDataPoint } from '@/lib/d3Helpers';

interface SimpleChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
}

/**
 * Example D3 bar chart component
 */
export function SimpleChart({ data, width = 400, height = 300 }: SimpleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(0.2);

    const yScale = createBarScale(data, chartHeight);
    const colorScale = createColorScale(data);

    // Add bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label) ?? 0)
      .attr('y', d => chartHeight - yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d.value))
      .attr('fill', d => colorScale(d.label));

    // Add value labels
    g.selectAll('.value-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', d => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
      .attr('y', d => chartHeight - yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .attr('font-size', '12px')
      .text(d => formatNumber(d.value));

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    g.append('g').call(d3.axisLeft(yScale));
  }, [data, width, height]);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}
