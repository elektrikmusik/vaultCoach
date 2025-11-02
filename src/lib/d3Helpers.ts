import * as d3 from 'd3';

/**
 * D3 utility functions and helpers
 */

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * Create a basic bar chart scale
 */
export function createBarScale(
  data: ChartDataPoint[],
  width: number
): d3.ScaleLinear<number, number, never> {
  const maxValue = d3.max(data, d => d.value) ?? 0;
  return d3.scaleLinear().domain([0, maxValue]).range([0, width]);
}

/**
 * Create a color scale
 */
export function createColorScale(data: ChartDataPoint[]): d3.ScaleOrdinal<string, string, never> {
  const colors = data.map(d => d.color || '#3b82f6');
  return d3
    .scaleOrdinal<string>()
    .domain(data.map(d => d.label))
    .range(colors);
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return d3.format(',.0f')(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return d3.format('.1%')(value);
}
