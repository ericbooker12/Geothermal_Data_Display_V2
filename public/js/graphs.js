$(document).ready(function() {
  console.log("ready from graphs.js");
  $('#col1').hide(); 
  $('#col2').hide(); 
  $('#col3').hide(); 
  $('#col4').hide(); 

  getFields();
  
});


WIDTH = 400,
HEIGHT = 2000,
MARGINS = { top: 20, right: 20, bottom: 20, left: 0 };

//----------------------------------------------------
// Secondary method to get data from db. 
// This returns a json object of all data.
var getFields = function() {
  console.log("Inside getFields function")

  // $('#show_chart').on('click', function(event){
  //   event.preventDefault();
  //   console.log("'Show Chart' clicked")
  
    var urlVariable = '/measurements';
    var method = 'GET';

    var request = $.ajax({
      url: urlVariable,
      method: method
    });

    // Get the data from '/measurements' url
    request.done(function(responseData, status, jqXHR ) {
      console.log("getFields: " + status);
      console.log("jqXHR: " + jqXHR);

      // send responseData to callCharts function
      callCharts(responseData);
    });

    request.fail(function(responseData) {
      console.log("getFields AJAX call failed");
    });
  // });
}; 

//--------------------------------------------------------

// this function is responsible for calling the createChart 
// function for each parameter to be plotted
var callCharts = function(responseData) {
  console.log("Inside callCharts()")
  var data = JSON.parse(responseData);

  console.log("Call createNvd3Chart()")
  createNvd3Chart(data, '#col1', "rop", "Rate of Penetration", 200);  // ROP
  createNvd3Chart(data, '#col2', "tempOut", "Temperature Out degF", 300); //Temp out
  createNvd3Chart(data, '#col3', "pressure", "Pressure psi", 1200); // Pressure
  createNvd3Chart(data, '#col4', "wob", "Weight on Bit k-lb", 100); // WOB
};

//--------------------------------------------------------

// Create vertical graph using nvd3.js
// later: combine param and label into array or object.
var createNvd3Chart = function(data, selector, param, label, chartRange) {
  nv.addGraph(function() {
    
  var chartData = formatData(data, param, label); 
    
  // Get the last depth, y-value in the data.
  var finalDepth = chartData[0].values.slice(-1)[0].y; 

  var chart = nv.models.lineChart()
    .margin({left: 100})      // Adjust chart margins to give the x-axis some breathing room..transitionDuration(350)  //how fast do you want the lines to transition?
    .showLegend(true)         // Show the legend, allowing users to turn on/off line series.
    .showYAxis(true)          // Show the y-axis
    .showXAxis(true)          // Show the x-axis
    .yDomain([finalDepth, 0]) // Set 0 at top of chart and final depth at bottom
    .xDomain([0, chartRange]);

  $(selector).height(HEIGHT).width(WIDTH);

  chart.xAxis     //Chart x-axis settings
    .axisLabel(label)
    .tickFormat(d3.format(4));

  chart.yAxis     //Chart y-axis settings
    .axisLabel('Depth (ft)')
    .tickFormat(d3.format('.0f'));


  // console.log(chartData);
 
  d3.select(selector)          //Select the <svg> element you want to render the chart in.   
    .datum(chartData)          //Populate the <svg> element with chart data...
    .call(chart);           //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });

  // $(selector).show(); 
  // $(selector).slideDown("2000"); 
  $(selector).slideToggle("2000");
  return chart;

  }); 
} // End of createNvd3Chart()

//-------------------NVD3 data formatter-----------------------   
function formatData(wellData, param, label) {
  console.log("Inside of getData() function");
  
  var arr = makeDataArray(wellData, param)

  //Line chart data is an array of objects.
  return[
    {
      values: arr,
      key: label,
      color: '#990000'     
    }
  ];
} // End of formatData()

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








