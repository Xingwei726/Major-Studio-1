d3.csv('lifespandata.csv', function(d){

var bardata= [];
for (var i=0; i<d.lifespan.length; i++) {
    bardata.push(d.lifespan[i]);
}

console.log(bardata);

 var margin = { top: 20, right: 20, bottom: 20, left: 50 },
    width = 1920 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    barwidth= 30,
    barOffset=5;
    
d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', '#c9D7D6')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
    // .selectAll("rect")
    // .data(d)
    // .enter()
    // .append('rect')
    //   .attr('fill',"blue")
    //   .attr('width',barwidth)
    //   .attr('height',function(d) { return d.lifespan; })
    //     .attr('x', function(d,i){
    //       return i*(barwidth + barOffset);
    //       // return xScale(d);
    //     })
    //     .attr('y',function (d,i) {
    //       return height-d;
    //     });
    
});