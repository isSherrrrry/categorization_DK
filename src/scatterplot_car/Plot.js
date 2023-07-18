import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './plot.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Plot = ({ data, xColumn, yColumn, selectedCategory, setData, zoomTransform, setZoomTransform}) => {
  const seedableRandom = (seed) => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const [userId] = useState(localStorage.getItem('userId'));


  
  const svgRef = useRef();
  const zoomRef = useRef();
  const jitterRef = useRef({});

  const getCategoryColor = (category) => {
    switch (category) {
      case 'SUV': return '#2ca02c94';
      case 'Minivan': return '#ff7e0ec0';
      case 'Sedan': return '#1f76b4b0';
      case 'Null': return 'white';
      default: return 'white';
    }
  };

  const tooltipRef = useRef();

  useEffect(() => {
    if (data) {
      const xJitter = d3.scaleLinear().domain([0, 1]).range([-10, 10]);
      const yJitter = d3.scaleLinear().domain([0, 1]).range([-10, 10]);
  
      data.forEach((d, i) => {
        if (!jitterRef.current[i]) {
          jitterRef.current[i] = {
            x: xJitter(seedableRandom(i)),
            y: yJitter(seedableRandom(i)),
          };
        }
      });
    }
  }, [data?.length]);


  useEffect(() => {
    if (!data || !xColumn || !yColumn) return;
    const firebaseConfig = {
      apiKey: "AIzaSyAHS7JCzpZAkLRmgilLdGDp9251l4HOO94",
      authDomain: "dkeffect-3776d.firebaseapp.com",
      projectId: "dkeffect-3776d",
      storageBucket: "dkeffect-3776d.appspot.com",
      messagingSenderId: "356413199968",
      appId: "1:356413199968:web:3211cbe960df3c8d4d9505",
      measurementId: "G-WE3CHELSN1"
    };
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    // Add category color property to data
    const updatedData = data.map(d => ({...d, color: getCategoryColor(d.category)}));

    const svg = d3.select(svgRef.current);
    const width = parseInt(svg.attr("width"));
    const height = parseInt(svg.attr("height"));
    // const computedStyle = window.getComputedStyle(svg.node());
    // const width = parseInt(computedStyle.width);
    // const height = parseInt(computedStyle.height);


    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d[xColumn]))
      .range([40, width - 20]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d[yColumn]))
      .range([height - 20, 20]);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    // Gridlines
    const xGridlines = d3.axisBottom(xScale)
      .tickSize(-height + 40)
      .tickFormat('')
      .ticks(10);

    const yGridlines = d3.axisLeft(yScale)
      .tickSize(-width + 60)
      .tickFormat('')
      .ticks(10);

    const zoom = d3.zoom()
      .scaleExtent([0.1, 30]) // Define the zoom limits (min, max)
      .on("zoom", (event) => {
        const { transform } = event;
        // Update the scales based on the zoom event
        const newXScale = transform.rescaleX(xScale);
        const newYScale = transform.rescaleY(yScale);
    
        // Update the gridlines
        svg.select('.x-gridlines').call(xGridlines.scale(newXScale));
        svg.select('.y-gridlines').call(yGridlines.scale(newYScale));
    
        // Maintain the opacity of the gridlines during zoom
        svg.selectAll('.x-gridlines .tick line')
          .style('stroke-opacity', 0.3);
        svg.selectAll('.y-gridlines .tick line')
          .style('stroke-opacity', 0.3);
    
        // Update the axes
        svg.select(".x-axis").call(xAxis.scale(newXScale));
        svg.select(".y-axis").call(yAxis.scale(newYScale));

        const jitterScaleFactor = transform.k;
    
        // Update the position and size of the points
        svg.selectAll(".point")
          // .attr("cx", d => newXScale(d[xColumn]))
          // .attr("cy", d => newYScale(d[yColumn]));
          .attr("cx", (d, i) => newXScale(d[xColumn]) + jitterRef.current[i].x * jitterScaleFactor)
          .attr("cy", (d, i) => newYScale(d[yColumn]) + jitterRef.current[i].y * jitterScaleFactor);
        
        setZoomTransform(event.transform);

        const eventsCollection = collection(firestore, userId);
        addDoc(eventsCollection, {
          event: 'interaction',
          type: 'zoom',
          task: 'car',
          zoom_level: event.transform.k,
          timestamp: new Date(),
        });
      });

    zoomRef.current = zoom;
    svg.selectAll(".x-gridlines").remove();
    svg.selectAll(".y-gridlines").remove();
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();
    svg.selectAll(".point").remove();

    svg.append('g')
      .attr('class', 'x-gridlines')
      .attr('transform', `translate(0, ${height - 20})`)
      .call(xGridlines);

    svg.append('g')
      .attr('class', 'y-gridlines')
      .attr('transform', 'translate(40, 0)')
      .call(yGridlines);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - 20})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(40, 0)")
      .call(yAxis);

      const pan = d3
      .drag()
      .on('start', () => {
        // Optional: you may want to add something here
      })
      .on('drag', (event) => {
        const { dx, dy } = event;
        const currentTransform = d3.zoomTransform(svg.node());
        const newTransform = d3.zoomIdentity
          .translate(currentTransform.x + dx, currentTransform.y + dy)
          .scale(currentTransform.k);
        svg.call(zoomRef.current.transform, newTransform);
        
        const eventsCollection = collection(firestore, userId);
        addDoc(eventsCollection, {
          event: 'interaction',
          type: 'drag',
          task: 'car',
          origin_x: currentTransform.x,
          origin_y: currentTransform.y,
          dx: dx,
          dy: dy,
          timestamp: new Date(),
        });
      });
  
      svg.call(pan);
  
      let hoverStartTime = null;
      
      
      const onMouseOver = (event, d) => {
          const tooltip = d3.select(tooltipRef.current);
          let content = '';
          for (const key in d) {
              content += `<b>${key}:</b> ${d[key]}<br>`;
          }
          tooltip.html(content)
              .style("opacity", 1)
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY + 10}px`);
          
          hoverStartTime = new Date();
          
      };
      
      const onMouseOut = (event, d) => {
        d3.select(tooltipRef.current).style("opacity", 0);
        const index = data.findIndex(el => el === d);
        const newData = [...data];
        if (hoverStartTime) {
          const hoverEndTime = new Date();
          const hoverTime = hoverEndTime - hoverStartTime;
      
          const eventsCollection = collection(firestore, userId);
          addDoc(eventsCollection, {
            event: 'interaction',
            type: 'hover',
            task: 'car',
            point: newData[index].name,
            x: d[xColumn],
            y: d[yColumn],
            elapsed_time: hoverTime,
            timestamp: new Date(),
          });
      
          hoverStartTime = null;
        }
      
      };
  
      const onClick = (event, d) => {
        const circle = d3.select(event.target);
        const index = data.findIndex(el => el === d);
        const newData = [...data];
        const newCategory = selectedCategory;
  
        
        newData[index] = { ...data[index], category: newCategory };
      
        setData(newData);
      
        circle.style("fill", getCategoryColor(newCategory));
      
        if (zoomRef.current) {
          const currentTransform = d3.zoomTransform(svg.node());
          setZoomTransform(currentTransform);
        }
  
        const eventsCollection = collection(firestore, userId);
        addDoc(eventsCollection, {
          event: 'interaction',
          type: 'click',
          task: 'car',
          point: newData[index].name,
          category: newData[index].category,
          x: d[xColumn],
          y: d[yColumn],
          timestamp: new Date(),
        });
      
      };

    // Add points
    svg.selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("r", 7)
      // .attr("cx", d => xScale(d[xColumn]))
      // .attr("cy", d => yScale(d[yColumn]))
      .attr("cx", (d, i) => xScale(d[xColumn]) + jitterRef.current[i].x)
      .attr("cy", (d, i) => yScale(d[yColumn]) + jitterRef.current[i].y)
      .attr('data-category', null)
      .style("fill", d => getCategoryColor(d.category))
      .style("stroke", "black")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .on("click", onClick);

    // Apply lower opacity to gridlines
    svg.selectAll('.x-gridlines .tick line')
        .style('stroke-opacity', 0.3);
    svg.selectAll('.y-gridlines .tick line')
        .style('stroke-opacity', 0.3);

    // Call the zoom behavior on the SVG
  
    if (zoomTransform && zoomRef.current) {
      svg.call(zoomRef.current.transform, zoomTransform);
    }

    svg.call(zoom);

    }, [data, xColumn, yColumn, setData, selectedCategory, setZoomTransform]);
    

return (
<div>
{/* <svg ref={svgRef} style={{ width: '80vw', height: '80vh' }} /> */}
{/* <svg ref={svgRef} width="1200" height="630" /> */}
<svg ref={svgRef} width="1000" height="450" />
<div ref={tooltipRef} className="tooltip" style={{ opacity: 0 }} />
</div>
);
};

export default Plot;





