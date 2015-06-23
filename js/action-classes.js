$(document).ready(function(){
	//alert("hello");

 	$(".methodDiv").children("div").click(function() {
 		if ($(this).siblings("ul").is(":visible")){
 			$(this).siblings("ul").fadeOut(600);
 		} else {
 			$(this).siblings("ul").fadeIn(600);
 		}

 	});

 	$(".methodLi").siblings("ul:even").css({"background-color" : "#D4FCD4", "border" : "black solid 1px"});

 	$(".methodLi").siblings("ul:odd").css({"background-color" : "#9EF99D", "border" : "black solid 1px"});

});