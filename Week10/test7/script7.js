// set the dimensions and margins of the graph
var H = window.innerHeight;
var W = window.innerWidth;
var margin = {top: 80, right: 50, bottom: 30, left: 65};
// var padding = {top: 80, right: 50, bottom: 30, left: 65};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;
// var xaxis = 1800;

const r = 10;
const rando = v => Math.min(v - 1.5 * r, Math.max(1.5 * r, Math.random() * v));
    
    
// append the svg object to the body of the page
var svg = d3.select("#dataviz")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", 2500)
            .append("g")




d3.json("dataAll.json").then(function(data){
    
//Data Sorting Section
 var yearData=[];
 var countryData =[];
 var mediumData = [];
 var classificationData =[];
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
 
 for (let i=0; i<data.length; i++) {
    let classification = data[i].classification;
    classificationData.push(classification);
 }


// Console.log Just for checking 
// console.log(nodes); 
//  console.log(yearData);
console.log(countryData);
// console.log(ageData);
// console.log(mediumData);
// console.log(nestedClassification);
// console.log(nestedCountry);     


//X-axis
var x = d3.scaleBand()
    .domain(countryData)
    .range([ 0, width ])
    .padding(0.15);
 svg.append("g")
    .style("font-size", 15)
    .style("color","#194F39")
    // .attr("opacity",0)
    .attr("transform", "translate(0, 40)")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()
    
   svg.append("g")
    .style("font-size", 15)
    .style("color","#194F39")
    // .attr("opacity",0)
    .attr("transform", "translate(0, 2100)")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()



//Color Palette 
var colors = d3.scaleOrdinal()
    .domain(countryData)
    .range(["#7ED6B3","#ffaa00","#ff5147","#ffcb47","#5047ff"]);



//tooltip
var tooltip = d3.select("#dataviz")
    .append("div")
    .style("opacity", 1)
    .attr("class", "tooltip")
    .style("background-color", "#194F39")
    .style("position", "absolute")
    .style("display","inline")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px")

  var mouseover = function(data) {
    tooltip
      .style("opacity", 1)
      .transition()
      .duration(100)
    d3.select(this)
      .style("stroke", "#194F39")
      .attr("width", 400)
    //   .attr("clip-path", "circle(60px at 50% 50%)")
      .style("stroke-width","2px")
      .style("opacity", 1)
      .style("fill-opacity", 1)
      .transition()
      .duration(750)
  }
  
  
  var mousemove = function(data) {
    tooltip
      .html("This apple was born in " + data.date + ".")
      .style("color", "white")
          // .attr("xlink:href", function(d) { return d.img;})
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+800) + "px")//+150 reduce the distance between tooltip and mouse
  }
  
  
  var mouseleave = function(data) {
//     tooltip
//       .style("opacity", 1)
// //     d3.select(this)
// //       .attr("r", 40 )
// //       .style("fill","#FBAAB8")
// //       .style("stroke", "none")
// //       .style("opacity", 0.8)

    apple.transition()
         .attr("x", function(d) { return x(d.culture)+60 })
         .attr("y", function(d,i) { return i*10})
         .style("fill-opacity", 0.8)
         .duration(1000)
//         // .ease(d3.easeIn)


  }





// Draw Circle Images                    
var apple = svg.selectAll("img")
    .data(data)
    .enter()
    
    .append('image')
    .attr('class', 'image')
        .attr('href', data => {
            return '../images/' + data.filename;
        })
        .attr("x", d => rando(width))
        .attr("y", d => rando(height*2))
        .style("fill-opacity", 1)
        // .attr("x", function(d) { return x(d.culture)+60 })
        // .attr("y", function(d,i) { return i*10})
        .attr("width", 200)
        .attr("height", 200)
        .attr("transform", "translate(-55, 110)")
        .style("opacity", 0.8)


        // .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function(d, i) {
            window.open(d.metURL);
            const el = d3.select(this);
            el.transition()
            .duration(750)
        });

        

    
})



