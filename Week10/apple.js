d3.json('Data/dataAll.json')
  .then( json => {
      displayImages(json);

  }); 
 

function displayImages(json){
    let apples = d3.select('#apples').text('');

    let descending = (a,b) => {
        return b.date - a.date;
    };
    
    // let ascending = (a,b) => {
    //     return a.date - b.date;
    // };

    let data = json.sort( (a,b)=>descending(a,b) );
    let card = apples.selectAll('div.met-card')
                .data(data)
                .join('div')
                .attr('class', 'met-card');
                
    card.append('div')
        .attr('class', 'image')
        .append('img')
        .attr('src', d => {
            return './images/' + d.filename;
        });

    // create a paragraph that will
    // hold the object date
    card.append('p')
        .attr('class', 'object-date')
        .text(d=>d.date);

    // create a heading tag
    // that will be the object title
    card.append('h2')
        .attr('class', 'title')
        .text(d=>d.title);
    
}

                

// var bardata = [1817,1700,1745,1390];
// var height =800;
// var width = 1376;

// var appleYear=[];
// var yScale = d3.scaleLinear()
//   .domain([0,d3.max(d=>d.date)])
//   .range([0,height]);
   
// var xScale = d3.scaleBand()
//   .domain([0,d3.max(d=>d.date)])
//   .paddingInner(0.2)
//   .paddingOuter(0.1)
//   .range([0,width]);
   
// // var colors = d3.scaleLinear()
// // //   .domain([1390,d3.max(d)])//Use data value to map color
// //   .domain([0,d.length*0.33,
// //               d.length*0.66,
// //               d.length])//Use data index value to map color
// //   .range(["#B58929","#C61C6F",
// //           "#268BD2","#85992C"]);
   
var viz = d3.select("#viz").append("svg")
        .attr("width", "100%")
        .attr("height", 800)
        .style("background","#93A1A1");

        

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


  
    
