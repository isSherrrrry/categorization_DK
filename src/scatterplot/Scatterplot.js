import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';


const data = [
    // Add your data points here
    { x: 34, y: 78, category: null },
    { x: 84, y: 15, category: null },
    { x: 104, y: 425, category: null },
    { x: 234, y: 5, category: null },
    { x: 14, y: 105, category: null }
    // ...
  ];

  const Scatterplot = () => {
    const svgRef = useRef();
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const width = parseInt(svg.attr("width"));
      const height = parseInt(svg.attr("height"));
  
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([40, width - 20]);
  
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([height - 20, 20]);
  
      const colorMap = {
        a: 'red',
        b: 'green',
        c: 'blue'
      };
  
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      svg.append("g")
        .attr("transform", `translate(0, ${height - 20})`)
        .call(xAxis);
  
      svg.append("g")
        .attr("transform", "translate(40, 0)")
        .call(yAxis);
  
      if (!svg.selectAll(".point").size()) {
        svg.selectAll(".point")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "point")
          .attr("r", 5)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .style("fill", "white")
          .style("stroke", "black");
      }
  
      svg.selectAll(".point")
        .on("click", function (event, d) {
          if (selectedCategory) {
            d.category = selectedCategory;
            d3.select(this)
              .style("fill", colorMap[d.category]);
          }
        });
  
    }, [selectedCategory]);
  
    return (
        <div>
        <div>
          <button onClick={() => setSelectedCategory('a')}>Select Category A</button>
          <button onClick={() => setSelectedCategory('b')}>Select Category B</button>
          <button onClick={() => setSelectedCategory('c')}>Select Category C</button>
        </div>
        <svg ref={svgRef} width="600" height="400" />
      </div>
    );
  };
  

export default Scatterplot;
