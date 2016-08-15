$(document).ready(function() {
  console.log("ready");
  
  
  createTable();
  $('#graphic_container').hide();
});

var createTable = function() {

  var depths = getData('#row_data #depth');
  var temps = getData('#row_data #temp_out');
  var data = temps;
  // var data = [2, 50, 60, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65, 43, 56, 34, 50, 65];
  // var data = [2, 50, 60, 43, 56, 200, 34, 50, 65, 43, 56, 100];
  // define dimensions of graph
  var m = [80, 80, 80, 80]; // margins
  var w = (data.length)/3 - m[1] - m[3]; // 2000 - m[1] - m[3]; // width
  var h = 400 - m[0]- m[2]; // height

  var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
  console.log("max depth = " + d3.max(depths));

  var y = d3.scale.linear().domain([0, 250]).range([250, 0]); //d3.max(data)

  // var y = d3.scale.linear().range([h, 0]);

    // create a line function that can convert data[] into x and y points
    var line = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        // verbose logging to show what's actually being done
        console.log('Plotting X value for data point d: ' + d + ' using index i: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
        // return the X coordinate where we want to plot this datapoint
        return x(i); 
      })
      .y(function(d) { 
        // verbose logging to show what's actually being done
        console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
        // return the Y coordinate where we want to plot this datapoint
        return y(d); 
      })

      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("#chart").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
          .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

      // create yAxis
      var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
      // Add the x-axis.
      graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis);


      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft);
      
        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
        graph.append("svg:path").attr("d", line(data));
      


  // //Is this function like .map?
  // var colors = d3.scale.linear()
  //   .domain([0, (d3.max(barData))/3])
  //   .range(['#550000', '#FF0000']);

  // var height = 300; //or total depth
  // var width = 800;



  // var yScale = d3.scale.linear()
  //   .domain([0, d3.max(barData)])
  //   .range([0, height]);

  // var xScale = d3.scale.ordinal()
  //   .domain(d3.range(0, barData.length))
  //   .rangeBands([0, width]);

  // var x = d3.time.scale()
  //   .range([0, width]);

  //   console.log("x")

  //   var y = d3.scale.linear()
  //   .range([height, 0]);

  // d3.select('#chart').append('svg')
  //   // Set canvas
  //   .attr('width', width)
  //   .attr('height', height)

  //   .style('background', '#C9D7D6')

  //   // create each bars that are rects
  //   .selectAll('rect').data(barData)
  //   .enter().append('rect')
  //   .style('fill', colors)

  //   // dimensions of the bars
  //   .attr('width', xScale.rangeBand())
  //   .attr('height', function(d) {
  //       return yScale(d);
  //   })
  //   .attr('x', function(d,i) {
  //       return xScale(i)
  //   })
  //   .attr('y', function(d) {
  //       return height - yScale(d);
  //   });

  //   var line = d3.svg.line()
  //     .x(function(d) {return})

};

//this function grabs data from erb page
var getData = function(id){
  var data = [];
  var data = $(id).text();
  data = data.split("\t");
  dataNums = [];
  for (var i = 0; i < data.length-1; i++){
    dataNums.push(parseFloat(data[i]));
  }
  return dataNums;
};


