$(document).ready(function() {

	$("li:even").addClass("ehighlight");
	$("li:odd").addClass("ohighlight");



	$(".block").mouseenter(function(){

		var num = Math.random() * 100;

	 	$(this).animate({
	 		borderRadius: "+=20",
	 		height: "+=" + num + "px",
	 		opacity: .5
	 	});
	 });

	$("#clickable").click(function(){
		alert("Don't touch me!");
	});

	 $(".block").mouseleave(function(){

	 	var num = Math.random() * (20 - 0);

	  	$(this).animate({
	  		borderRadius: "-=20",
	  		height: "-=" + num + "px",
	  		opacity: 1
	  	});	 
	 });

	// $(".block").mousedown(function() {
	// 	$(this).mousemove(function() {
	// 		$(this).animate({
	// 			borderRadius: "+=20",
	// 			height: "+=1px"
	// 		}, 20);
	// 	});
	// });

		//alert("hello");





});
