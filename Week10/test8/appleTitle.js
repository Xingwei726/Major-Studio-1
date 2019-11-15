var svg3 = d3.select("#dataviz2")
            .append("svg")
            .attr("width", W)
            .attr("height", 1000)
            .append("g")


 d3.json("dataAll.json").then(function(data){
    
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
 
 
 
// var sequentialScale = d3.scaleSequential()
//   .domain([0, d3.max(data.date)])
//   .interpolator(d3.interpolateRainbow);

var myColor = d3.scaleOrdinal()
  .domain(["no","yes"])
  .range("#194F39","#FFFAF0");

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


var mousemove3 = function(data) {
    tooltip
      .html("This apple was born in " + data.date + ".")
      .style("color", "white")
          // .attr("xlink:href", function(d) { return d.img;})
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+800) + "px")//+150 reduce the distance between tooltip and mouse
    // d3.select(this)
    // .transition()
    // .ease(d3.easeElastic)
    //      .attr("width", 150)
    //      .attr("height", 150)
}

// var mouseleave3 = function(data) {
//     d3.select(this)
//     .transition()
//     .ease(d3.easeElastic)

//          .attr("width", 80)
//          .attr("height", 80)
//          .style("fill-opacity", 1)
// }  

              
 var appleTitle = svg3.selectAll("circle")
                     .data(data)
                     .enter()
                     .append("circle")
                     .attr("r",10)
                     .style("stroke","black")
                     .style("stroke-width", 1)
                     .style("fill","none")
                     .attr("transform", "translate(55, 110)")
                     .style("opacity",0)
                    .on("mousemove", mousemove3)
                    .on('click', function(d, i) {
                        window.open(d.metURL);
                        const el = d3.select(this);
                        el.transition()
                        .duration(750)
                    });

//     }
function f3() {
            appleTitle.transition()
                    .duration(1000)
                    .ease(d3.easeElastic)
                    .style("opacity",1)
                    .attr("cx", function(d,i){
                        if (i<13){
                        return i*50
                        } else if (i<26){
                        return (i-13)*50
                        } else if (i<39){
                        return (i-26)*50
                        } else if (i<52){
                        return (i-39)*50
                        }else if (i<65){
                        return (i-52)*50
                        }else if (i<78){
                        return (i-65)*50
                        }else if (i<91){
                        return (i-78)*50
                        }else if (i<104){
                        return (i-91)*50
                        }else if (i<117){
                        return (i-104)*50
                        }else if (i<130){
                        return (i-117)*50
                        }else if (i<143){
                        return (i-130)*50
                        }else if (i<156){
                        return (i-143)*50
                        }else if (i<169){
                        return (i-156)*50
                        }else if (i<173){
                        return (i-169)*50
                        }
                    })
                    .attr("cy", function(d,i){
                        if (i<13){
                        return 50
                        } else if (i<26){
                        return 100
                        } else if (i<39){
                        return 150
                        } else if (i<52){
                        return 200
                        }else if (i<65){
                        return 250
                        }else if (i<78){
                        return 300
                        }else if (i<91){
                        return 350
                        }else if (i<104){
                        return 400
                        }else if (i<117){
                        return 450
                        }else if (i<130){
                        return 500
                        }else if (i<143){
                        return 550
                        }else if (i<156){
                        return 600
                        }else if (i<169){
                        return 650
                        }else if (i<173){
                        return 700
                        }
                    })
                    
                    
} 

function f4(){
    appleTitle.transition()
              .duration(1000)
              .ease(d3.easeElastic)
              .style("stroke","none")
              .style("fill",function(d,i) {
               if(d.title=="Apple"){
                   return "#FBAAB8"
               } else {
                   return "#194F39"
               }
    })
}


function f5(){
    appleTitle.transition()
              .duration(1000)
              .ease(d3.easeElastic)
            //   .attr("r",5)
              .attr("cx", function(d,i){
                if (d.culture=="European"){
                return 50
                } else if (d.culture=="North American"){
                return 100
                } else if (d.culture=="Asian"){
                return 150
                } else if (d.culture=="Cypriot"){
                return 200
                } else if (d.culture=="roman"){
                return 250   
                }
              })
              
            // .attr("cy", function(d,i){
            //     if (d.title=="Apple"){
            //     return 10
            //     } else {
            //     return 50
            //     }
            // })
}


// f3();                
 
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


new scroll('step1', '75%', f3, f4);
new scroll('step2', '75%', f4, f5);
new scroll('step3', '75%', f5, f3);



      
      
});