$(document).ready(function() {

	// $('#graphic_container').rotate(90);
	rotateElement();
	enbigify();
	showWells();


  	$("#show_table").hide();


	$('#show_graph').on ('click', function(event){
	  	event.preventDefault();
	    $("#table_container").hide();
	    $("#graphic_container").show();
	    $('#show_graph').hide();
	    $("#show_table").show();
  	});

	$('#show_table').on ('click', function(){
	    $("#table_container").show();
	    $("#graphic_container").hide();
	    $("#show_table").hide();
	    $("#show_graph").show();
	  });
});

//--------------------Functions---------------------

var enbigify = function(){
	$('div .pic').on('mousedown', function() {
		$(this).height($(this).height()* 2);
		$(this).width($(this).width()* 2);
		console.log('pic clicked');
	});

	$('div .pic').on('mouseup', function() {
		$(this).height($(this).height()/ 2);
		$(this).width($(this).width()/ 2);
		console.log('pic clicked');
	});
};

var rotateElement = function() {
	$('div .rotate').on('click', function(){
		$(this).rotate({bind:{click: function(){
	    	$(this).rotate({
	      		duration:2000,
	      		angle: 0,
	     		animateTo:360
      		})
	    }}})
	});	
};

var showWells = function(){
	$('#header_title #wells').on('click', function(event) {
		event.preventDefault();
		console.log('Wells link clicked');

		var urlVariable = $(this).attr('href');
		var method = 'GET';

		var request = $.ajax({
			url: urlVariable,
			type: method
		});

		request.done(function(responseData){
			console.log('Request successful');
			$('#main_index').html(responseData);
		});

		request.fail(function(responseData){
			alert('ajax request failed');
		});
	});
};












