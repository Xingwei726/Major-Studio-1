var H = window.innerHeight;
var W = window.innerWidth;


// const button = document.querySelector('.button');

// button.addEventListener('click', event => {
//   button.innerHTML = `Click count: ${event.detail}`;
// });


// var img1tooltip = d3.select("#page-1")
//     .append("div")
//     .attr("class", "tooltip")


// var mousemove = function(data) {
//     tooltip
//       .html("This apple was born in " + data.date + ".")
//       .style("color", "white")
//           // .attr("xlink:href", function(d) { return d.img;})
//       .style("left", (d3.mouse(this)[0]+40) + "px")
//       .style("top", (d3.mouse(this)[1]) + "px")//+150 reduce the distance between tooltip and mouse
//       d3.select(this)
//          .transition()
//          .ease(d3.easeElastic)
//          .attr("width", 200)
//          .attr("height", 200)
      
//   }
  
  
//  img1tooltip
    

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}