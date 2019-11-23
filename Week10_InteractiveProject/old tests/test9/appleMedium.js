var appleMedium = d3.select("#dataviz3")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", 1000)
            .append("g")
            
  
            
 d3.json("dataAll.json").then(function(data){
    
 var yearData=[];
 var countryData =[];
 var mediumData = [];
 var classificationData =[];
 var ageData = [];
 
//15 
 var nestedClassification = d3.nest() //group data together
                    .key(function(d){ return d.classification;})
                    .entries(data);
                    
 var nestedCountry = d3.nest()
                    .key(function(d){ return d.culture;})
                    .entries(data);

// var nestedMedium = d3.nest()
//                     .key(function(d){ return d.medium;})
//                     .entries(data);

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
 
 console.log(nestedClassification);


//color palette                    
 var colors = d3.scaleOrdinal()
    .domain(["painting", "earthenware", "porcelain", "sculpture", "ivory statue", "print","drawing", "terracotta", "silverwork","textile", "photograph", "metalwork","woodwork", "miniature", "dagger" ])
    .range(["494D4E","#994E53","E7C3C1","#FF5400","FE9920","gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue"]);



//force layout setup
 var width2 = 100;
 var height2 = 100;
 
 var x = d3.scaleBand()
    .domain(classificationData)
    .range([ 0, W ])
    .padding(0.15);
    
//tooltip
  var tooltip = d3.select("#dataviz3")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "#194F39")
    .style("position", "absolute")
    .style("display","absolute")
    .style("border-radius", "5px")
    .style("padding", "6px")

  var mouseover = function(data) {
    tooltip
      .style("opacity", 1)
      .transition()
      .duration(100)
    d3.select(this)
      .style("stroke", "#194F39")
      .attr("r", 20 )
      .style("stroke-width","2px")
      .style("opacity", 1)
      .transition()
      .duration(750)
  }
  

  var mousemove = function(data) {
    tooltip
      .html("This apple is a " + data.classification + ".")
      .style("opacity", 1)
      .style("color","white")
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[0]+500) + "px")//+150 reduce the distance between tooltip and mouse
  }
  

  var mouseleave = function(data) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .attr("r", 10 )
      .style("stroke", "none")
      .style("opacity", 0.8)
      
    d3.select(this)
    .transition()
        .force("forceX", d3.forceX().strength(.5))
        .force("forceY", d3.forceY().strength(.1))
        .duration(1500)

  }


var simulation = d3.forceSimulation(data)
        .force('center', d3.forceCenter().x(320).y(320))
        .force("charge", d3.forceManyBody().strength(-40))
        .force("forceX", d3.forceX().strength(.1))
        .force("forceY", d3.forceY().strength(.1))
        .alphaTarget(1)
        .on("tick", ticked);



var u;
 
function ticked() {
var u =appleMedium.selectAll('circle')
     .data(data);
    u.enter()
    .append('circle')
    .attr('r', 10)
    .merge(u)
    .attr('cx', function(d,i) {
      return d.x
    })
    .attr('cy', function(d,i) {
      return d.y
    })
    .style('fill', function(data) {
      return colors(data.classification);
    })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on('click', function(d, i) {
      window.open(d.metURL);
       const el = d3.select(this);
       el.transition()
      .duration(750)
      
    })
    
    u.exit().remove()
}



 
 
 
 
 
});


