//tool libraries
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';

// set the dimensions and margins of the graph
const H = window.innerHeight;
const W = window.innerWidth;
var margin = {top: 80, right: 50, bottom: 30, left: 65};
var padding = {top: 80, right: 50, bottom: 30, left: 65};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;
var xaxis = 1800;

const r = 10;
const rando = v => Math.min(v - 1.5 * r, Math.max(1.5 * r, Math.random() * v));
    
// append the svg object to the body of the page
var svg = d3.select("#dataviz")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", H*2)
            .append("g")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
var title = d3.select("svg")
            .attr("class","title")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0," + margin.top + ")");
            
            

d3.json("dataAll.json").then(function(data){
    
 var yearData=[];
 var countryData =[];
 var mediumData = [];
 var ageData = [];
 var nodes = data;
 

 var nestedClassification = d3.nest() //group data together
                    .key(function(d){ return d.classification;})
                    .entries(data);
                    
 var nestedCountry = d3.nest()
                    .key(function(d){ return d.culture;})
                    .entries(data);
                    
                    
 for (let i=0; i<data.length; i++) {
    let date = data[i].date;
    yearData.push(date);
 }
 
 for (let i=0; i<data.length; i++) {
    let age = 2019-(data[i].date);
    ageData.push(age);
 }
 
 for (let i=0; i<data.length; i++) {
    let culture = data[i].culture;
    countryData.push(culture);
 }
 
 for (let i=0; i<data.length; i++) {
    let medium = data[i].medium;
    mediumData.push(medium);
 }
 
 console.log(nodes); // Just for checking
 console.log(yearData);
 console.log(countryData);
 console.log(ageData);
 console.log(nestedClassification);
 console.log(nestedCountry); 


// var force = d3.layout.force()
//     .charge(-120)
//     .linkDistance(20)
//     .size([width, height])
//     .nodes(d3.value(nodes))
//     .on("tick",tick)

//   force
//       .nodes(nodes)
//       .start();
      
//   var node = svg.selectAll(".node")
//       .data(force.nodes())
//       .enter().append("circle")
//       .attr("class", "node")
//       .attr("r", 5)
//       .style("fill", "blue" );

// function tick (e) {
       
//     node.attr("cx", function(d) { return d.x; })
//         .attr("cy", function(d) { return d.y; })
//         .call(force.drag);
//   };




//color
var myColor = d3.scaleSequential()
    .domain([-4000,1000,2000])
    .interpolator(d3.interpolateInferno)


//tooltip
  var tooltip = d3.select("#dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position", "absolute")
    .style("display","inline")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px")

  var mouseover = function(data) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .attr("r", 40 )
      .style("stroke-width","2px")
      .style("opacity", 1)
    svg.append('div')
        .attr('class', 'image')
        .data(data)
        .enter()
        .append('img')
        .attr('src', data => {
            return '../images/' + data.filename;
        });
  }
  
  var mousemove = function(data) {
    tooltip
      .html("This apple was born in " + data.date + ".")
          // .attr("xlink:href", function(d) { return d.img;})
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+1000) + "px")//+150 reduce the distance between tooltip and mouse
  }
  
  var mouseleave = function(data) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .attr("r", 10 )

      .style("stroke", "none")
      .style("opacity", 0.8)
  }
  
  

  

 
// Draw Shapes                    
    svg.selectAll("cirlce")
    .data(data)
    .enter()
    
    .append("circle")
      .attr("cx", d => rando(width))
      .attr("cy", d => rando(height*2))
      // .attr("rx", 4)
      // .attr("ry", 4)
      .attr("r", 10 )
      .style("fill","blue")
      .style("fill-opacity", 0.5)
      // .style("fill", function(data) { return myColor(data.date)} )
      .attr("transform", "translate(55, 110)")
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on('click', function(d, i) {
      window.location.href = d.metURL;
    });


    
})
