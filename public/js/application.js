$(document).ready(function() {

	// $('#graphic_container').rotate(90);

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



	$('div .rotate').on('click', function(){

	$(this).rotate({bind:{
  		click: function(){
	    	$(this).rotate({
	      		duration:2000,
	      		angle: 0,
	     		animateTo:360
      		})
    	}
	}})


});




});












