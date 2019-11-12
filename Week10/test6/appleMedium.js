var appleMedium = d3.select("#dataviz3")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", 1000)
            .append("g")
            
// var myColor = d3.scaleSequential()
//   .domain([-3900,0, 2000])
//   .interpolator(d3.interpolatePlasma);



  
            
 d3.json("dataAll.json").then(function(data){
    
 var yearData=[];
 var countryData =[];
 var mediumData = [];
 var classificationData =[];
 var ageData = [];
 
//33 classifications 
 var nestedClassification = d3.nest() //group data together
                    .key(function(d){ return d.classification;})
                    .entries(data);
                    
 var nestedCountry = d3.nest()
                    .key(function(d){ return d.culture;})
                    .entries(data);
//87 mediums
 var nestedMedium = d3.nest()
                    .key(function(d){ return d.medium;})
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
 


//color palette                    
 var colors = d3.scaleOrdinal()
    .domain(nestedClassification)
    .range(["494D4E","#994E53","E7C3C1","#FF5400","FE9920","gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange","#390099","#9E0059"]);



//force layout setup
 var width2 = 100;
 var height2 = 100;
 
 var x = d3.scaleBand()
    .domain(classificationData)
    .range([ 0, W ])
    .padding(0.15);



 var simulation = d3.forceSimulation(data)
  .force('charge', d3.forceManyBody().strength(-2))
  .force('center', d3.forceCenter().x(300).y(300))
//   .force('x', d3.forceX().x(function(d) {
//     return xCenter[d.medium];
//   }))
//   .force('collision', d3.forceCollide().radius(25))
  .on('tick', ticked);
  
 function dragstarted() {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended() {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}
 

function ticked() {
  var u= appleMedium.selectAll('circle')
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
              .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .on('click', function(d, i) {
      window.open(d.metURL);
       const el = d3.select(this);
       el.transition()
      .duration(750)
      
    
    })
    
    function dragsubject() {
     return simulation.find(d3.event.x, d3.event.y);
  }

  
  
    u.exit().remove()
}


//tooltip setup
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
    appleMedium.transition()
         .attr("cx", function(d) { return x(data.classification) })
         .attr("cy", function(d,i) { return i*10})
         .duration(2000)
    //  .transition()
    //  .ease(d3.easeBounce)

  }


 
});


