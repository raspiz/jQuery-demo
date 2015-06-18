$(document).ready(function(){
	//alert("hello");


	// first jason call is for initial display
 	$.getJSON("./json/skeleton.json", function(data) {
 		$.each(data.Actions, function (key, val) {
 			//list of actions
 			$("#dfActions").after("<div id='" + key + "'>" + key + "</div><div id='" + key + "Shell'><div id='action" + key + "'></div></div><br>");
	 		$("#dfActions").accordion();
	 		$("#" + key).addClass("actions");
	 		$("#" + key + "Shell").addClass("actionDets");

	 		$.each(data.Actions[key], function (ikey, ival) {
	 			$("#action" + key).append("<div style='color:red;' class='padme' id='" + key + ikey + "'>" + ikey +"</div>");

		 		$.each(data.Actions[key][ikey], function (jkey, jval) {
		 			//alert(jkey);
		 			$("#" + key + ikey).append("<div style='color:green;' class='padme'>" + jval + "</div>");
		 				 		
		 		});
	 		}); 			

 		
		 	$("#" + key).click(function() {
		 		if ($("#" + key + "Shell").children("div").is(":visible")){
		 			$("#" + key + "Shell").children("div").hide();
		 		} else {
		 			$("#" + key + "Shell").children("div").show();
		 		}

		 	});

 		});
	});





});