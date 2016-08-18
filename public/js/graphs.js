$(document).ready(function() {
  console.log("ready from graphs.js");
  // createChart();
  getFields();
  // createVertChart();
  // createNvd3Chart();
  $('#graphic_container').hide();

});


    WIDTH = 400,
    HEIGHT = 2000,
    MARGINS = { top: 20, right: 20, bottom: 20, left: 50 };

//----------------------------------------------------
// Secondary method to get data from db. 
// This returns a json object of all data.
var getFields = function() {
  console.log("Inside getFields function")

  // $('#show_chart').on('click', function(event){
    event.preventDefault();
    console.log("'Show Chart' clicked")
  
    var urlVariable = '/measurements';
    var method = 'GET';
    var wellDataJson = [];


    var request = $.ajax({
      url: urlVariable,
      method: method
    });

    request.done(function(responseData, status, jqXHR ) {
      console.log("getFields: " + status);
      console.log("jqXHR:" + jqXHR);
      // console.log("responseData = ");
      // console.log(responseData);
      callCharts(responseData);
    });

    request.fail(function(responseData) {
      alert("getFields AJAX call failed");
    });
  // });
}; 

//----------------------------------------------------
// call chart functions
var callCharts = function(responseData) {
  console.log("Inside callCharts()")
  var data = JSON.parse(responseData);

  console.log("Call createVertChart")
  // createVertChart(data);
  createNvd3Chart(data);
};

//--------------------------------------------------------
// Create vertical graph using nvd3.js
var createNvd3Chart = function(data) {
  nv.addGraph(function() {

  var chartData = formatData(data);        // Format the data

  // Get the last depth, y-value in the data.
  var finalDepth = chartData[0].values.slice(-1)[0].y; 
  console.log(finalDepth);

  var chart = nv.models.lineChart()
                .margin({left: 100})    //Adjust chart margins to give the x-axis some breathing room..transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)      //Show the x-axis
                .yDomain([7622,0])
                .xDomain([0,400]);

  $('#vis2').height(HEIGHT).width(WIDTH);

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Temp')
      .tickFormat(d3.format(4));

  chart.yAxis     //Chart y-axis settings
      .axisLabel('depth')
      .tickFormat(d3.format('.0f'));

  /* Done setting the chart up? Time to render it!*/
 
  d3.select('#vis2')          //Select the <svg> element you want to render the chart in.   
      .datum(chartData)          //Populate the <svg> element with chart data...
      .call(chart);           //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });

  return chart;
  }); 
} // End of createNvd3Chart()

//-------------------NVD3 Test data generator-----------------------   
function formatData(wellData) {
    console.log("Inside of getData() function");

    var depths = [];
    var temp_out = [];

    for (var i = 0; i < wellData.length; i++ ) {
      temp_out.push({x: wellData[i].temp_out, y: wellData[i].depth});
    };

    // console.log("depths");
    // console.log(depths);

    // console.log("temp_out = ");
    // console.log(temp_out);


    //Line chart data should be sent as an array of series objects.
    return[
      {
        values: temp_out,
        key: 'Temperature out',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }

//----------------------------------------------------
// var formatData = function(data) {
//   var newData = JSON.parse(data);
//   console.log(newData[1].depth)
//   var innerArray = [];
//   var dataArray = [];

//   for (var i = 0; i < newData.length; i++) {
//     innerArray.push(newData[i].depth);
//     innerArray.push(newData[i].temp_out);
//     dataArray.push(innerArray);
//     innerArray = [];
//   }
//   console.log("dataArray= ")
//   console.log(dataArray)
//   dataObj = {
//     "key": "temps",
//     "values": dataArray
//   };
//   // console.log(dataObj);
//   return dataObj;
// }


//----------------------------------------------------
//this function grabs data from erb page
// var getData = function(id) {
//   var data = [];
//   var data = $(id).text();
//   data = data.split("\t");
//   dataNums = [];
//   for (var i = 0; i < data.length-1; i++){
//     dataNums.push(parseFloat(data[i]));
//   }
//   return dataNums;
// };


//-----------------------------------------------------------------











