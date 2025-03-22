import * as d3 from "d3";


export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {

    scatterPlotLayer.selectAll('.point') //select all the circle elements with the class 'point'
      .data(data) //bind the data to the circle elements
      .enter() //create placeholder for each data point
      .append('circle') //append a circle element for each data point
      .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the circle element to 'point' and the station name
      .attr('cx', d => xScale(d.tripdurationS))
      .attr('cy', d => yScale(d.tripdurationE))
      .attr('r', "5")
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr("r", 10)
          .style("fill", "red");
  
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(d.station)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
  
        // Highlight same station's bar
        const className = d3.select(this).attr("class").split(" ")[1];
        d3.selectAll(`.bar.${className}`)
          .style("fill", "red");
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr("r", 5)
          .style("fill", "steelblue");
  
        tooltip.transition().duration(200).style("opacity", 0);
  
        const className = d3.select(this).attr("class").split(" ")[1];
        d3.selectAll(`.bar.${className}`)
          .style("fill", "steelblue");
      });
  };
  
       


