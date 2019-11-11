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
 
 
   var mouseleave = function(data) {
        for(p=1;p<8;p++) {
           for (i=0; i<12;i++){
            appleMedium.append("circle")
              .attr("cx", i*60)
              .attr("cy",20+ 40*p)
              .attr("r", 10 )
              .style("stroke","#FBAAB8")
              .style("stroke-width", 1)
              .style("fill","#FBAAB8")
              .attr("transform", "translate(55, 110)")
            }
         }
         for (i=0; i<3;i++){
            appleMedium.append("circle")
              .attr("cx", i*60)
              .attr("cy",20+ 40*8)
              .attr("r", 10 )
              .style("stroke","#FBAAB8")
              .style("stroke-width", 1)
              .style("fill","#FBAAB8")
              .attr("transform", "translate(55, 110)")
        }
              
        //green circles      
        for(p=9;p<18;p++) {
           for (i=0; i<12;i++){
            appleMedium.append("circle")
              .attr("cx", i*60)
              .attr("cy",20+ 40*p)
              .attr("r", 10 )
              .style("stroke","none")
              .style("fill","#194F39")
              .attr("transform", "translate(55, 110)")
            }
         }
           for (i=3; i<12;i++){              
            appleMedium.append("circle")
              .attr("cx", i*60)
              .attr("cy",20+ 40*8)
              .attr("r", 10 )
              .style("stroke","none")
              .style("fill","#194F39")
              .attr("transform", "translate(55, 110)")
           } 
              
              

    }
 
 
 var x = d3.scaleBand()
    .domain(countryData)
    .range([ 0, width ])
    .padding(0.15);
    
 for(p=1;p<18;p++) {
   for (i=0; i<12;i++){
    appleMedium.append("circle")
      .attr("cx", i*60)
      .attr("cy",20+ 40*p)
      .attr("r", 10 )
      .style("stroke","gray")
      .style("stroke-width", 1)
      .style("fill","none")
      .attr("transform", "translate(55, 110)")
      .on("mouseleave", mouseleave)
    }
 }




      
      
});