
'use client';
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { drawBarChart } from './drawBarChart';

export default function BarChart(props) {
  const {
    svgWidth,
    svgHeight,
    marginLeft,
    marginTop,
    data,
    xScale,
    yScale
  } = props;

  const d3Ref = useRef();

  useEffect(() => {
    const svg = d3.select(d3Ref.current);
    svg.selectAll("*").remove(); // clear svg

    const chartWidth = svgWidth - marginLeft - 20;
    const chartHeight = svgHeight - marginTop - 20;

    const chartGroup = svg.append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    drawBarChart(chartGroup, data, xScale, yScale, chartWidth, chartHeight);
  }, [data]);

  return <svg width={svgWidth} height={svgHeight} ref={d3Ref}></svg>;
}
