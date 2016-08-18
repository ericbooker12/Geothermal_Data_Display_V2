$(document).ready(function() {

	// $('#graphic_container').rotate(90);
	rotatify();
	embigify();
	showWells();
	showLoginForm();
	loginUser();

	// var loginInfo = $('#header_partial');
	// console.log(loginInfo)
	// // debugger;
	// $('#header').html(loginInfo);


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

var embigify = function(){
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

var rotatify = function() {
	$('div .rotate').on('click', function(){
		$(this).rotate({bind:{click: function(){
	    	$(this).rotate({
	      		duration:5000,
	      		angle: 0,
	     		animateTo:360
      		})
	    }}})
	});	
};

var showWells = function(){
	$('#main_page #wells').on('click', function(event) {
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
		console.log(urlVariable);
		// Get method
		var method = 'GET';

		// Make ajax request to get log in form
		var request = $.ajax({
			url: urlVariable,
			method: method
		});

		//Handle response data when request is done
		request.done(function(responseData){
			console.log(responseData);
			console.log($('#login').html());
			var data = $(responseData).html();
			$('#login').html(data);
		})

		// Handle response on fail
		request.fail(function(responseData){
			alert('\'showWells AJAX\' request failed')
		});
	});
};

var loginUser = function() {
	// Bind event listener to login link which will always be there '#login'.
	// Find button dynamically using delegated event handling to find 
	// link that may or may not be there - '#user_login'
	$('#login').on('submit', '#user_login', function(event){
		event.preventDefault();
		console.log("Login button clicked")
		
		// Get url, method and ?
		var urlVariable = $(this).attr('action');
		var method = $(this).attr('method')
		var formData = $(this).serialize();
		console.log(urlVariable + " " + method + " " + formData);

		// Create AJAX request
		var request = $.ajax({
			url: urlVariable,
			method: method,
			data: formData
		});

		var that = this;
		console.log("That = ");
		console.log(that);
		

		// Handle response when request is done
		request.done(function(responseData){
			console.log("ajax request successful")
	
			var header = $(responseData).get(0);
			var body = $(responseData).get(1);
			
			$('#main_page').html(body);
			$('#header_partial').html(header);

			// come back to this later - use json instead of html
			// var header = responseData.header;
			// var body = responseData.main;

			// console.log(header);
			// console.log(main);
			// $('#main_page').html(body);
			// $('#header_partial').html(header);
			
		});

		// Handle response on fail
		request.fail(function(responseData){
			alert("\'loginUser\' AJAX request failed")
		});	
	});
};













