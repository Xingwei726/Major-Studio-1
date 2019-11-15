let group = test.append("g")

let circle1 = group.append("circle")

function f1 (){
      circle1
        .transition()
        .duration(600)
        // .ease("elastic")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 5)
        .attr("fill", "#99c125")
        .attr("opacity", "1")
}
function f2 (){
      circle1
        .transition()
        .duration(600)
        // .ease("elastic")
        .attr("cx", 50)
        .attr("cy", 20)
        .attr("r", 20)
        .attr("fill", "#99c125")
        .attr("opacity", "1")
}

function f3 (){
      circle1
        .transition()
        .duration(600)
        // .ease("elastic")
        .attr("cx", 50)
        .attr("cy", 20)
        .attr("r", 100)
        .attr("fill", "#99c125")
        .attr("opacity", "1")
}


function scroll(n, offset, func1, func2){
      return new Waypoint({
        element: document.getElementById(n),
        handler: function(direction) {
          direction == 'down' ? func1() : func2();
        },
        //start 75% from the top of the div
        offset: offset
      });
    };


new scroll('dataviz', '75%', f1, f2);
new scroll('scrolly', '75%', f2, f3);