var appleGesture = d3.select("#image")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", W)
            .attr("height", H)
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

d3.json("dataHand.json").then(function(data){ 
 appleGesture.selectAll("img")
    .data(data)
    .enter()
    .append('image')
    .attr('class', 'image')
    .attr('href', data => {
        return '../png/' + data.filename;
    })
    .attr("x", function(d,i){
    if (i<9){
      return 130*i
    }else{
      return 130*(i-9)

    }
    })
    .attr("y", function(d,i){
      if (i<9){
      return 0
    }else{
       return 150
    }
    
    })
    .style("fill-opacity", 1)
    .attr("width", 150)
    .attr("height", 150)
    .attr("transform", "translate(0, 200)")
    .style("opacity", 1)
        // .on("mouseover", mouseover2)
        // .on("mousemove", mousemove2)
        // .on("mouseleave", mouseleave2)
        // .on('click', function(d, i) {
        //     window.open(d.metURL);
        //     const el = d3.select(this);
        //     el.transition()
        //     .duration(750)
        // }); 
 
})
 
 
 
 
 
 
 
 
 })