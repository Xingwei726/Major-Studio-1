
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
}
d3.csv("../data/lifespandata.csv", ready)
var bardata,
    geodistance,
    artwork;
var tempColor,
    colors,
    bandcolors,
    dotcolors,
    tooltip,
    yScale,
    yAxisTicks,
    yAxisValues,
    yScale2,
    yAxisTicks2,
    yAxisValues2,
    yGuide;


// y axises for lifespan
  yScale = d3.scaleLinear()
    .domain([0,d3.max(bardata)])
    .range([0,height]);
    
  yAxisValues = d3.scaleLinear()
    .domain([0,d3.max(bardata)])
    .range([height,0]);
    
  yAxisTicks = d3.axisLeft(yAxisValues)
    .ticks(10);

// y axises for Geodistance
  yScale2 = d3.scaleLinear()
    .domain([0,d3.max(geodistance)])
    .range([0,250]);
    
  yAxisValues2 = d3.scaleLinear()
    .domain([0,d3.max(geodistance)])
    .range([0,height]);
    
  yAxisTicks2 = d3.axisLeft(yAxisValues2)
    .ticks(5);

  colors = d3.scaleLinear()
    .domain ([0,d3.max(bardata)])
    .range(['#ffcd36','#1AAFB5']);
    
  bandcolors = d3.scaleLinear()
    .domain ([0,d3.max(artwork)])
    .range(['#DEAE4B','#120a8f']);
    
  dotcolors = d3.scaleLinear()
    .domain ([0,d3.max(geodistance)])
    .range(['#4D4D4D','#F15A24']);


  tooltip = d3.select('body')
    .append('div') 
    .attr("class", "title1")
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0);


// bars for lifespan
d3.select('#viz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', '#e1ebe6')
    // .style('background', '#c9D7D6')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll('rect')
      .data(bardata)
      .enter()
      .append('rect')
        .attr('fill',function(d) {
          return colors(d);
        })
        // .style('opacity',0.7)
        .attr('width',barwidth)
        .attr('height', function(d){
          return yScale(d);
        })
        .attr('x', function(d,i){
          return i*(barwidth + barOffset);
          // return xScale(d);
        })
        .attr('y',function (d,i) {
          return height-yScale(d);
        })
        .attr ('rx',3)
        
      .on('mouseover', function(d){
          tooltip.transition().duration(100)
                 .style('opacity', 0.7);
          tooltip.html(d)
                 .style('left', (d3.event.pageX-30)+'px')
                 .style('top', (d3.event.pageY-30)+'px')
          tempColor = this.style.fill;
          d3.select(this)
            .style('opacity',1)
            .style('fill','#DEAE4B');
      }) 
    
      .on('mouseout', function(d){
          d3.select(this)
            .style('opacity',1)
            .style('fill',tempColor);
      });



// 
d3.select('#viz svg')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll('rect')
      .data(bardata)
      .enter()
      .append('rect')
        .attr('fill',function(d) {
          return colors(d);
        })
        .style('opacity',0.7)
        .attr('width',barwidth)
        .attr('height', 7)
        .attr('x', function(d,i){
          return i*(barwidth + barOffset);
          // return xScale(d);
        })
        .attr('y',function (d,i) {
          return height-yScale(d)-6;
        })
        .attr ('rx',2);
        

//y axis
  yGuide = d3.select('#viz svg')
  .append ('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(yAxisTicks);
  
//y axis2
  yGuide = d3.select('#viz svg')
  .append ('g')
  .attr("transform", "translate(50,450)")
  .call(yAxisTicks2);

          
// artWorkYears
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')

  .selectAll('rect')
  .data(artwork)
  .enter()
  .append('rect')
    .attr('fill',function(d) {
      return bandcolors(d);
    })
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', function(d,i){
      return i*(barwidth+barOffset)-2;
    })
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('opacity',0.5);


// Artist Names Lines Vertical
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  
  .selectAll('line')
  .data(geodistance)
  .enter()
  .append('line')
    .style("stroke", "#666666")
    .style("stroke-width", 1)
    .style("stroke-dasharray", ("3, 3"))
    .attr("x1", function(d,i){
      return i*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y1", height)
    .attr("x2", function(d,i){
      return i*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y2",500);
    

// Geodistances Line
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  
  .selectAll('line')
  .data(geodistance)
  .enter()
  .append('line')
    .style("stroke", "#4D4D4D")
        // .style("stroke", "#6076AD")
    .style("stroke-width", 1.5)
    .attr("x1", function(d,i){
      return i*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y1", height)
    .attr("x2", function(d,i){
      return i*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y2", function(d,i){
      return yScale2(d)+height;
    })
    .on('mouseover', function(d){
          tooltip.transition().duration(500)
                .style('opacity', 0.7);
          tooltip.html(d)
                .style('left', (d3.event.pageX)+'px')
                .style('top', (d3.event.pageY)+'px')
          tempColor = this.style.fill;
          d3.select(this)
            .style('opacity',1)
            .style('stroke','#DEAE4B');
      }) 
    
      .on('mouseout', function(d){
          d3.select(this)
            .style('opacity',1)
            .style('stroke',"#4D4D4D");
      });

      
// Geodistances Circle
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .selectAll('circle')
    .data(geodistance)
    .enter()
    .append('circle')
      .style("fill", function(d) {
          return dotcolors(d);
        })
      .attr("cx", function(d,i){
        return i*(barwidth+barOffset)+barwidth/2;
      })
      .attr("cy", function(d,i){
        return yScale2(d)+height;
      })
      .attr('r',4);
    
    
    

      
      
      


//Text Section
d3.select('#viz svg')
    .append("text")
    .attr("class", "title1")
    .attr("transform", "translate(30,190)")
    .text("Lifespan(yrs)");
d3.select('#viz svg')
    .append("text")
    .attr("class", "title1")
    .attr("transform", "translate(30,720)")
    .text("Geodistance(km)");  
d3.select('#viz svg')
    .append("text")
    .attr("class", "title2")
    .attr("transform", "translate(30,70)")
    .text("Lives' Dimensions of 51 Artists")
    .attr("fill", "#0F166B");
d3.select('#viz svg')
    .append("text")
    .attr("class", "title2")
    .attr("transform", "translate(30,104)")
    .text("in European Paintings Department")
    .attr("fill", "#0F166B");
d3.select('#viz svg')
    .append("text")
    .attr("class", "title3")
    .attr("transform", "translate(30,134)")
    .text("at Met Museum")
    .attr("fill", "#999999");


// Artist Names Lines Horizontal
var line = [0,4,5,9,10,14,15,19,20,24,25,29,30,34,35,39,40,44,45,47]
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  
  .selectAll('line')
  .data(line)
  .enter()
  .append('line')
    .style("stroke", "#666666")
    .style("stroke-width", 1)
    // .style("stroke-dasharray", ("3, 3"))
    .attr("x1", function(d,i){
      return d*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y1", 500)
    .attr("x2", function(d,i){
      return (d+3)*(barwidth+barOffset)+barwidth/2;
    })
    .attr("y2",500);

    
//Artists' Names
var data = [
    [ ],
    ["Pacino di Bonaguida", "Lippo Memmi","Taddeo Gaddi","Guariento di Arpo", "Lippo Vanni "],
    ["Spinello Aretino", "Luca di Tommè di Nuto","Taddeo di Bartolo", "Giovanni di Bartolomeo Cristiani", "Cenni di Francesco di Ser Cenni"],
    ["Paolo di Giovanni Fei","Lorenzo Monaco", "Bicci di Lorenzo ", "Michelino da Besozzo", "Andrea di Bartolo"],
    ["Martino di Bartolommeo di Biagio", "Niccolò di Pietro", "Fra Angelico","Giovanni di Paolo","Rogier van der Weyden"],
    ["Sassetta", "Sano di Pietro", "Giovanni di ser Giovanni Guidi","Fra Filippo Lippi", "Miguel Alcañiz"],
    ["Zanobi Strozzi","Fra Carnevale","Benozzo Gozzoli", "Pesellino", "Jacopo Bellini"],
    ["Bartolomeo di Tommaso","Antonello da Messina", "Andrea Mantegna", "Matteo di Giovanni di Bartolo", "Cosmè Tura"],
    ["Antoniazzo Romano", "Ludwig Schongauer", "Francesco di Giorgio Martini","Cosimo Rosselli","Antonio Vivarini"],
    ["Piero del Pollaiuolo", "Jacopo del Sellaio", "Botticelli","Petrus Christus", "Liberale da Verona"],
    ["Francesco Botticini", "Francesco Francia"],
];

var svg = d3.select("#viz svg")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append('svg')
    .attr("width", width)
    .attr("height", 1920);

var groups = svg.selectAll("groups")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(" + ((i*125)-16) + ",0)");

var texts = groups.selectAll("texts")
    .data(d => d)
    .enter()
    .append("text")
    .attr("class", "title4")
    .attr("y", (d, i) => 530 + i * 12)
    .text(d => d);


//Artists' Names
var data = [
    ["Giotto di Bondone", "Bernardo Daddi", "Lippo di Benivieni","Segna di Buonaventura"],
];

var svg2 = d3.select("#viz svg")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append('svg')
    .attr("width", width)
    .attr("height", 1920);

var groups2 = svg2.selectAll("groups")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(" + ((i*125)+10) + ",0)");

var texts2 = groups2.selectAll("texts")
    .data(d => d)
    .enter()
    .append("text")
    .attr("class", "title4")
    .attr("y", (d, i) => 535 + i * 12)
    .text(d => d);








// //Legend Section
// d3.select('#viz svg')
//     .append("rect")
//     .attr("width",250 )
//     .attr("height", 60)
//     .attr("x",1070)
//     .attr("y",46)
//     .attr ('rx',2)
//     .style("fill", '#f7faf9')
//     .style('opacity',0.5);
//     // .attr("transform", "translate(1600,190)");

// //Legend Text
// d3.select('#viz svg')
//     .append("text")
//     .attr("class", "legend")
//     .attr("x",1075)
//     .attr("y",60)
//     .text("Legend:"); 
// d3.select('#viz svg')
//     .append("text")
//     .attr("class", "legend")
//     .attr("x",1075)
//     .attr("y",78)
//     .text("Artworks");
// d3.select('#viz svg')
//     .append("text")
//     .attr("class", "legend")
//     .attr("x",1075)
//     .attr("y",96)
//     .text("Lifespan");
    
// //Legend Graphics
// d3.select('#viz svg')
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .selectAll('rect')
//       .append('rect')
//         .attr('fill','#13AFBF')
//         .attr('width',barwidth)
//         .attr('height', 15 )
//         .attr('x', 1095)
//         .attr('y',96)
//         .attr ('rx',3);
    

 
 
 
 
 
    
    
    
// Extra Artwork Bands  
// 2
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([43,37,36])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', (barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4); 
  
//4
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([17,16])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 3*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4); 
    
//5
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([34,33])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 4*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//16
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([38,37,36])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 15*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//17
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([59])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 16*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//20
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([20,21,22,23])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 19*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//22
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([40,26])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 21*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//23
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([57,42,19,47,32,67,32])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 22*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//25
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([45])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 24*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//26
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([49,59,59])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 25*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//28
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([28,34,20])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 27*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//32
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([20,19,20,19])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 31*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//35
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([20])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 34*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//36
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([35])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 35*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//37
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([65,19])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 36*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//39
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([51,37])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 38*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);
    
//40
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([45])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 39*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);

//52
d3.select('#viz svg')
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .append('svg')
  .selectAll('rect')
  .data([19,54])
  .enter()
  .append('rect')
    .attr('width',barwidth+4)
    .attr('height', bandwidth)
    .attr('x', 50*(barwidth+barOffset)-2)
    .attr('y',function(d,i){
      return height-yScale(d);
    })
    .attr ('rx',2)
    .style('fill','#0F166B')
    .style('opacity',0.4);

