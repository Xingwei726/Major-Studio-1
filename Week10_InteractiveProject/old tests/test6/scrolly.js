// Setup Scrolly
var main = d3.select('main')
var scrolly = main.select('#scrolly');//all contents
var figure = scrolly.select('figure'); // all figures
var article = scrolly.select('#content');//all steps
var step = article.selectAll('.step'); // step inside article




// initialize the scrollama
var scroller = scrollama();
d3.selectAll("figure")


function handleResize() {
  var stepH = Math.floor(window.innerHeight * 1);
  step.style('height', stepH + 'px');
  var figureHeight = window.innerHeight
  var figureMarginTop = ((window.innerHeight - figureHeight) / 2)+30

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px');

  scroller.resize();
}


// scrollama event handlers
function handleStepEnter(response) {
  console.log(response)
//   response = { element, direction, progress }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })

  // update graphic based on step
  figure.select('p').text(response.index + 1);
}


function function2(response) {
    
  console.log(response)
  var graph = d3.select("#graph")
            .append('div')
            .attr('class', 'step2graph')
            .append("svg")
            .attr("width", W/2)
            .attr("height", H/2)
            .append("g")
    graph.append("circle")
      .attr("cx", 30)
      .attr("cy", 20)
      .attr("r", 20 )
      .style("fill","red")
      .style("fill-opacity", 0.5)
    
    figure.select('p').style("opacity", 0)
    figure.style("background-color","#FFFAF0" )
      
}






function setupStickyfill() {
  d3.selectAll('.sticky').each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();
  handleResize();
  
  
  scroller.setup({
    step: '#scrolly #content .step1',
    offset: 0.2,
    debug: false,
    order:true,
    once:true,
  })
    .onStepEnter(handleStepEnter);

  
  scroller.setup({
    step: '#scrolly #content .step2',
    offset: 0.2,
    debug: false,
    order:true,
    once:true,
  })
    .onStepEnter(function2);

    
    
  


  // setup resize event
  window.addEventListener('resize', handleResize);
}




init();

















// // Scrollable Graphics
//     var WIDTH = window.innerWidth / 2
//     var HEIGHT = window.innerHeight
    
//     var translate = 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')'

//     var currentScrollTop = d3.select('#currentScrollTop')


//     var graph = d3.select("#graph")//create svg canvas
//       // .append ('div')
//       // .attr('class', 'step1graph')
//       .append("svg")
//     	.attr('width', WIDTH)
//     	.attr('height', HEIGHT)
    
//     var circleLayer = graph.append('g') 
//         .attr('transform', translate)
        
//     var cirlceGraph = circleLayer.append("circle")
//       .attr("cx", 30)
//       .attr("cy", 20)
//       .attr("r", 20 )
//       .style("fill","blue")
//       .style("fill-opacity", 0.5)
        


    
//     // var body = d3.select('body').node()
//     var container = d3.select('#scrolly')
//     var content = d3.select('#content')
    
//     var SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT
    
//     var circleTransformation = d3.scaleLinear() // hour value translate
//     	.domain([0, SCROLL_LENGTH])
//     	.range([0, HEIGHT])
//     	.clamp(true)
  
    

//     var scrollTop = 0
//     var newScrollTop = 0
    
// 		container
//   		.on("scroll.scroller", function() {
//       	newScrollTop = container.node().scrollTop
// 	    });

//     var setDimensions = function() {
//       WIDTH = window.innerWidth / 2
// 			HEIGHT = window.innerHeight
//       SCROLL_LENGTH = content.node().getBoundingClientRect().height - HEIGHT
      
//       circleTransformation.domain([0, SCROLL_LENGTH])
//       // minuteHandRotation.domain([0, SCROLL_LENTH])
//     }
    
//     var render = function() {
//       if (scrollTop !== newScrollTop) {
//         scrollTop = newScrollTop
//       // Graphics Code Goes Here
      
//       var circleTransform = circleTransformation(scrollTop)        
//       	circleLayer.attr('transform', translate + '0, (' + circleTransform + ')')
 
//       currentScrollTop.text(scrollTop)

//       }
      
//       window.requestAnimationFrame(render)
//     }
//     window.requestAnimationFrame(render)
    
//     window.onresize = setDimensions








// // append the svg object to the body of the page
// var graph = d3.select("#graph")
//             .append('div')
//             .attr('class', 'step1graph')
//             .append("svg")
//             // .attr("width", width + margin.left + margin.right)
//             // .attr("height", height + margin.top*3 + margin.bottom*3)
//             .attr("width", W/2)
//             .attr("height", H/2)
//             .append("g")
//             // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//     graph.append("circle")
//       .attr("cx", 30)
//       .attr("cy", 20)
//       .attr("r", 20 )
//       .style("fill","blue")
//       .style("fill-opacity", 0.5)