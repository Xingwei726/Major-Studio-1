// set the dimensions and margins of the graph
var H = window.innerHeight;
var W = window.innerWidth;
var margin = {top: 80, right: 50, bottom: 30, left: 65};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

const r = 10;
const rando = v => Math.min(v - 1.5 * r, Math.max(1.5 * r, Math.random() * v));
    
    
// append the svg object to the body of the page

var svg2 = d3.select("#allApple")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", 1800)
            .append("g")

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
                    
 var nestedAge = d3.nest()
                    .key(function(d){ return d.date;})
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
console.log(yearData);
console.log(nestedAge);
console.log(ageData);
// console.log(mediumData);
// console.log(nestedClassification);
// console.log(nestedCountry);     


//X-axis
var x = d3.scaleBand()
    .domain(countryData)
    .range([ 0, width ])
    .padding(0.15);
    

//tooltip
var tooltip = d3.select("#dataviz")
    .append("div")
    .attr("class", "tooltip")
    .style("background-color", "#194F39")
    .style("position", "absolute")
    .style("display","inline")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "6px")
    .style("opacity", 1)


  var mouseover = function(data) {
    tooltip
      .transition()
      .duration(100)
      .style("opacity", 1)

    d3.select(this)
      .style("stroke", "#194F39")
      .attr("width", 400)
      .style("stroke-width","2px")
      .style("opacity", 1)
      .style("fill-opacity", 1)
      .transition()
      .duration(750)

  }
  
  var mouseover2 = function(data) {
    tooltip
      .transition()
      .duration(100)
      .style("opacity", 1)

    d3.select(this)
      .style("stroke", "#194F39")
      .attr("width", 400)
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
      .style("top", (d3.mouse(this)[1]) + "px")//+150 reduce the distance between tooltip and mouse
       d3.select(this)
         .transition()
         .ease(d3.easeElastic)
         .attr("width", 200)
         .attr("height", 200)
      
  }
  

var mousemove2 = function(data) {
    tooltip
      .html("This apple was born in " + data.date + ".")
      .style("color", "white")
          // .attr("xlink:href", function(d) { return d.img;})
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+800) + "px")//+150 reduce the distance between tooltip and mouse
    d3.select(this)
    .transition()
    .ease(d3.easeElastic)

         .attr("width", 150)
         .attr("height", 150)
}

var mouseleave2 = function(data) {
    d3.select(this)
    .transition()
    .ease(d3.easeElastic)

         .attr("width", 80)
         .attr("height", 80)
         .style("fill-opacity", 1)
}  
  
  
  var mouseleave = function(data) {
//     tooltip
//       .style("opacity", 1)
// //     d3.select(this)
// //       .attr("r", 40 )
// //       .style("fill","#FBAAB8")
// //       .style("stroke", "none")
// //       .style("opacity", 0.8)

    apple2.transition()
         .attr("x", function(d) { return x(d.culture)+60 })
         .attr("y", function(d,i) { return i*10})
         .attr("width", 30)
         .attr("height", 30)
         .attr("transform", "translate(40, 100)")
         .style("fill-opacity", 0.8)
         .duration(1500)

    var xaxis1=svg.append("g")
        .style("font-size", 15)
        .style("color","#194F39")
        .style("opacity",1)
        .attr("transform", "translate(0, 40)")
            .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()
        .transition()
        .duration(1000)
        
    var xaxis2= svg.append("g")
        .style("font-size", 15)
        .style("color","#194F39")
        .style("opacity",1)
        .attr("transform", "translate(0, 1900)")
            .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()
          
        .transition()
        .duration(1000)
        
//     var line1 = svg.append("line")
//               .attr("x1", 145 )
//               .attr("y1", 100)
//               .attr("x2", 145)
//               .attr("y2", 1000)
//               .style("stroke", "black")
              
//   var line2 = svg.append("line")
//               .attr("x1", 400 )
//               .attr("y1", 100)
//               .attr("x2", 400)
//               .attr("y2", 1000)
//               .style("stroke", "black")
              
//     var line3 = svg.append("line")
//               .attr("x1", 700 )
//               .attr("y1", 100)
//               .attr("x2", 700)
//               .attr("y2", 1000)
//               .style("stroke", "black")
              
//   var line4 = svg.append("line")
//               .attr("x1", 1000 )
//               .attr("y1", 100)
//               .attr("x2", 400)
//               .attr("y2", 1000)
//               .style("stroke", "black")              
              

  }




// Draw Circle Images 


var apple = svg2.selectAll("img")
    .data(data)
    .enter()
    .append('image')
    .attr('class', 'image')
    .attr('href', data => {
        return '../png/' + data.filename;
    })
    .style("fill-opacity", 1)
    .attr("width", 80)
    .attr("height", 80)
    .style("opacity", 1)
        .on("mouseover", mouseover2)
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)
        .on('click', function(d, i) {
            window.open(d.metURL);
            const el = d3.select(this);
            el.transition()
            .duration(750)
        });
    
 function f1(){
    apple.transition()
         .duration(1000)
         .ease(d3.easeElastic)
         .attr("x", function(d,i){
            if (i<13){
            return i*100
            } else if (i<26){
            return (i-13)*100+50
            } else if (i<39){
            return (i-26)*100
            } else if (i<52){
            return (i-39)*100+50
            }else if (i<65){
            return (i-52)*100
            }else if (i<78){
            return (i-65)*100+50
            }else if (i<91){
            return (i-78)*100
            }else if (i<104){
            return (i-91)*100+50
            }else if (i<117){
            return (i-104)*100
            }else if (i<130){
            return (i-117)*100+50
            }else if (i<143){
            return (i-130)*100
            }else if (i<156){
            return (i-143)*100+50
            }else if (i<169){
            return (i-156)*100
            }else if (i<173){
            return (i-169)*100+50
            }
        })
        .attr("y", function(d,i){
            if (i<13){
            return 100
            } else if (i<26){
            return 200
            } else if (i<39){
            return 300
            } else if (i<52){
            return 400
            }else if (i<65){
            return 500
            }else if (i<78){
            return 600
            }else if (i<91){
            return 700
            }else if (i<104){
            return 800
            }else if (i<117){
            return 900
            }else if (i<130){
            return 1000
            }else if (i<143){
            return 1100
            }else if (i<156){
            return 1200
            }else if (i<169){
            return 1300
            }else if (i<173){
            return 1400
            }
        })

 }   








var apple2 = svg.selectAll("img")
    .data(data)
    .enter()
    
    .append('image')
    .attr('class', 'image')
        .attr('href', data => {
            return '../png/' + data.filename;
        })
        .attr("x", d => rando(width))
        .attr("y", d => rando(height*2))
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
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


f1();      

    
})



