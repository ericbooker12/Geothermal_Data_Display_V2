$(document).ready(function() {
  console.log("ready from graphs.js");

  getFields();

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
  console.log("Call createNvd3Chart()")
  var data = JSON.parse(responseData);
  createNvd3Chart(data, '#col1');
  // createNvd3Chart(responseData, '#col2');
  // createNvd3Chart(responseData, '#col3');
  // createNvd3Chart(responseData, '#col4');

};

//--------------------------------------------------------
// Create vertical graph using nvd3.js
var createNvd3Chart = function(data, selector) {
  nv.addGraph(function() {
    
  var chartData = formatData(data, "rop"); 
    

  // Get the last depth, y-value in the data.
  var finalDepth = chartData[0].values.slice(-1)[0].y; 
  console.log(finalDepth);


  var chart = nv.models.lineChart()
    .margin({left: 100})      //Adjust chart margins to give the x-axis some breathing room..transitionDuration(350)  //how fast do you want the lines to transition?
    .showLegend(true)         //Show the legend, allowing users to turn on/off line series.
    .showYAxis(true)          //Show the y-axis
    .showXAxis(true)          //Show the x-axis
    .yDomain([finalDepth, 0])
    .xDomain([0, 400]);

  $(selector).height(HEIGHT).width(WIDTH);

  chart.xAxis     //Chart x-axis settings
    .axisLabel('Temp')
    .tickFormat(d3.format(4));

  chart.yAxis     //Chart y-axis settings
    .axisLabel('depth')
    .tickFormat(d3.format('.0f'));

  /* Done setting the chart up? Time to render it!*/
 
  d3.select(selector)          //Select the <svg> element you want to render the chart in.   
    .datum(chartData)          //Populate the <svg> element with chart data...
    .call(chart);           //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });

  return chart;
  }); 
} // End of createNvd3Chart()

//-------------------NVD3 Test data generator-----------------------   
function formatData(wellData, param) {
  console.log("Inside of getData() function");
  
  var arr = makeDataArray(wellData, param)

  //Line chart data should be sent as an array of series objects.
  return[
    {
      values: arr,
      key: 'Temperature out',
      color: 'blue',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}

//-----------------------------------------------------------------
// Create array of data
function makeDataArray(wellData, paramToChart) {

  data = []

  if (paramToChart == "tempOut") {

    data.push({x: 0, y: 0});
    for (var i = 0; i < wellData.length; i++ ) {
      data.push({x: wellData[i].temp_out, y: wellData[i].depth});
    }


  } else if (paramToChart == "tempIn") {

    for (var i = 0; i < wellData.length; i++ ) {
      data.push({x: wellData[i].temp_in, y: wellData[i].depth});
    }

  } else if (paramToChart == "pressure") {

    for (var i = 0; i < wellData.length; i++ ) {
      data.push({x: wellData[i].pressure, y: wellData[i].depth});
    }
    
  } else if (paramToChart == "wob") {

    for (var i = 0; i < wellData.length; i++ ) {
      data.push({x: wellData[i].wob, y: wellData[i].depth});
    }
    
  } else if (paramToChart == "rop") {

    for (var i = 0; i < wellData.length; i++ ) {
      data.push({x: wellData[i].rop, y: wellData[i].depth});
    }
    
  };

  return data;

};










