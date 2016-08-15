$(document).ready(function() {

	// $('#graphic_container').rotate(90);
	rotateElement();
	enbigify();
	showWells();
	showLoginForm();
	loginUser();


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
			alert('AJAX request failed');
		});
	});
};

var showLoginForm = function() {
	$('#login_link').on('click', function(event){
		event.preventDefault();
		console.log('Login link clicked');

		// Get url variable
		var urlVariable = $(this).attr('href');

		// Get method
		var method = 'GET';

		// Make ajax request to get log in form
		var request = $.ajax({
			url: urlVariable,
			method: 'GET'
		});

		//Handle response data when request is done
		request.done(function(responseData){
			console.log(responseData);
			console.log($('div #login').html());
			var data = $(responseData).html();
			$('div #login').html(data);
		})

		// Handle response on fail
		request.fail(function(responseData){
			alert('AJAX request failed')
		});
	});
};

var loginUser = function() {
	// Bind event listener to login button
	// Find button dynamically using delegated event handling
	// $('#user_login')on('submit', function(event){
	// 	event.preventDefault();
	// 	console.log("Login button clicked")
	// 	// debugger;
	// })


	// Get url, method and ?
	// Create AJAX request
	// Handle response when request is done
	// Handle response on fail
};












