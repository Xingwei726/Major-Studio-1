
var margin = { top: 20, right: 20, bottom: 20, left: 50 },
    width = 1920 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    barwidth= 30,
    barOffset=5;
    
var svg = d3.select("#viz").append("svg")   
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', '#c9D7D6')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function ready(metdata) {
  console.log(metdata);
d3.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
       .attr('fill',"blue")
       .attr('width',barwidth)
       .attr('height', data.lifespan)
        .attr('x', function(d,i){
          return i*(barwidth + barOffset);
          // return xScale(d);
        })
        .attr('y',function (d,i) {
          return height-d;
        });
}
d3.csv("../data/lifespandata.csv", ready)



