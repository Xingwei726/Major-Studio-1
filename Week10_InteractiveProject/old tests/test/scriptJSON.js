const fs = require('fs');
var data = fs.readFileSync('./dataAll.json', 'utf-8');
console.log (data[i].objectID);

// import 'intersection-observer';
// import scrollama from 'scrollama';
// const scroller = scrollama();
// set the dimensions and margins of the graph;

// var margin = {top: 80, right: 50, bottom: 30, left: 65};
// var padding = {top: 80, right: 50, bottom: 30, left: 65};
//     width = 1480 - margin.left - margin.right,
//     height = 800 - margin.top - margin.bottom,
//     xaxis = 1800;
  
// // append the svg object to the body of the page
// var svg = d3.select("#dataviz")
//             .append("svg")
//             .attr("width", width + margin.left*2 + margin.right*2)
//             .attr("height", height + margin.top*3 + margin.bottom*3)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
// var title = d3.select("svg")
//             .attr("class","title")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append("g")
//             .attr("transform", "translate(0," + margin.top + ")");
            
// //Read the data
// d3.csv("data.csv", function(data) {
//   d3.json("dataAll.json", function(imageData){
//       var myCountry = d3.map(data, function(d){return d.country;}).keys()
//   var myMedium = d3.map(data, function(d){return d.medium;}).keys()
//   var myimg = d3.map(data, function(d){return d.url;}).keys()

//   // X scales and axis:
//   var x = d3.scaleBand()
//     .domain(myCountry)
//     .range([ 0, width ])
//     .padding(0.15);
    
//   svg.append("g")
//     .style("font-size", 15)
//     .attr("transform", "translate(-30, 40)")
//     .call(d3.axisBottom(x).tickSize(0))
//     .select(".domain").remove()
//   svg.append("g")
//     .style("font-size", 15)
//     .attr("transform", "translate(-30, 800)")
//     .call(d3.axisBottom(x).tickSize(0))
//     .select(".domain").remove()

//   // Y scales and axis:
//   var y = d3.scaleBand()
//     .range([ height, 0 ])
//     .domain(myMedium)
//     .paddingInner(0.05);
    
//   svg.append("g")
//     .style("font-size", 12)
//     .attr("transform", "translate(0, 80)")
//     .call(d3.axisLeft(y).tickSize(0))
//     .select(".domain").remove()

//   // Build color scale
//   var myColor = d3.scaleSequential()
//     .domain([0,100])
//     .interpolator(d3.interpolateInferno)
    
//   // Linear Color Scheme
//   // var myColor = d3.scaleLinear()
//   // .domain([0, 1000, 1500])
//   // .range(['#FE9393', '#ddd', 'blue']);

//   // create a tooltip
//   var tooltip = d3.select("#dataviz")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("position", "absolute")
//     .style("display","inline")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "6px")

//   // Three function that change the tooltip when user hover / move / leave a cell
//   var mouseover = function(d) {
//     tooltip
//       .style("opacity", 1)
//     d3.select(this)
//       .style("stroke", "black")
//       .attr("r", 60 )

//       .style("stroke-width","2px")
//       .style("opacity", 1)
//   }
//   var mousemove = function(d) {
//     tooltip
//       .html("This apple is " + d.value+ " years old.")
//       .style("left", (d3.mouse(this)[0]+40) + "px")
//       .style("top", (d3.mouse(this)[1]+1000) + "px")//+150 reduce the distance between tooltip and mouse
//   }
//   var mouseleave = function(d) {
//     tooltip
//       .style("opacity", 0)
//     d3.select(this)
//       .attr("r", 40 )

//       .style("stroke", "none")
//       .style("opacity", 0.8)
//   }

//   // add the squares
//   svg.selectAll("cirlce")
//     .data(data, function(d) {return d.country+':'+d.medium;})
//     .enter()
//     .append("circle")
//       // .transition()
//       // .duration(2000) 
//       .attr("cx", function(d) { return x(d.country) })
//       .attr("cy", function(d) { return y(d.medium) })
//       // .attr("rx", 4)
//       // .attr("ry", 4)
//       .attr("r", 40 )
//       // .attr("height", y.bandwidth() )
//       .style("fill", function(d) { return myColor(d.value)} )
//       .attr("transform", "translate(55, 110)")
//       .style("stroke-width", 4)
//       .style("stroke", "none")
//       .style("opacity", 0.8)
//     .on("mouseover", mouseover)
//     .on("mousemove", mousemove)
//     .on("mouseleave", mouseleave)

//   });
// });

// // Add title to graph
// title.append("text")
//         .attr("x", 0)
//         .attr("y", -20)
//         .attr("text-anchor", "left")
//         .style("font-family", "Helvetica Neue")
//         .style("font-size", "26px")
//         .text("Apples In the Met");

// // Add subtitle to graph
// title.append("text")
//         .attr("x", 0)
//         .attr("y", 10)
//         .attr("text-anchor", "left")
//         .style("font-family", "Helvetica Neue")
//         .style("font-size", "14px")
//         .style("fill", "grey")
//         .style("max-width", 400)
//         .text("How old are they?");
