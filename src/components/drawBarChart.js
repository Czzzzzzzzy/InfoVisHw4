import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // Clear previous bars and axes
  barChartLayer.selectAll("*").remove();

  // Axis
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(10);

  // Append Y-axis with custom position
  barChartLayer.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(30, 20)") // Move Y-axis right
    .call(yAxis);

  // Style Y-axis ticks
  barChartLayer.select(".y-axis")
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", "black");

  // Add Y-axis label
  barChartLayer.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", (-barChartHeight / 2)+150)
    .attr("y", 50) // Push further left
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .text("Bikers start from");

  // Append X-axis
  barChartLayer.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(30, ${barChartHeight-100})`) // Push X-axis down
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "10px");

  // Draw bars
  barChartLayer.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
    .attr("x", d => xScale(d.station) + 30) // Apply same 30px shift as x-axis
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => barChartHeight - yScale(d.count)-100)
    .style("fill", "steelblue")
    .on("mouseover", function(event, d) {
      d3.select(this).style("fill", "red");

      const className = d3.select(this).attr("class").split(" ")[1];
      const points = d3.selectAll(`.point.${className}`);
      points.raise(); // move DOM elements before transition
      points.transition().duration(200)
        .attr("r", 10)
        .style("fill", "red");
    })
    .on("mouseout", function(event, d) {
      d3.select(this).style("fill", "steelblue");

      const className = d3.select(this).attr("class").split(" ")[1];
      d3.selectAll(`.point.${className}`)
        .transition().duration(200)
        .attr("r", 5)
        .style("fill", "steelblue");

      d3.select("#scatter-plot").select(".highlight-rect").remove();
    });
};