var viz = d3.select("#viz").append("svg")
        .attr("width", "100%")
        .attr("height", 800)
        .style("background","#e0e0e0");   
d3.json ('Data/dataAll.json', function(d){

for (var i=0; i<d.length; i++){
    bardata.push(d.length[i].date)
}

});
   

        

// d3.json("Data/dataAll.json")
//   .then (json => {
//   drawCircle(json);
// });

// function drawCircle(json){
//     viz.selectAll("circle").data(d)
//         .enter().append ("circle")
//         .style("fill","#B58929")
//         .attr("cx",function(d){
//             return xScale(d=>d.date);
//         })
//         .attr("cy",function(d){
//             return height-yScale(d=>d.date)+100;
//         })
//         .attr("r","20");  
// }


  
    
