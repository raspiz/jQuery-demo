/* Filename: custom.js */
$(document).ready(function(){
	// do stuff when DOM is ready

	// this is required for tooltips. to use them, just add a title attribute to an element
	$(document).tooltip();

	//$("#textInput").text("");
	$("#textInput").val("");

	$("#subBtn").click(function(){
		if ($("#nameText").val() == "") {
			$("#nameText").addClass("reqField");
		}
		else {
			$("#nameText").removeClass("reqField");
		}
	});

	// click event added
	$("#mydiv").click(function() {
		alert("Hello, world!");
	});

	$("#highlightP > p").css("background-color", "yellow"); // make paragraph backgrounds yellow

	var title = $("em").attr("title");
	$("#divid").text(title);

	// jquery ui
	//$("ol").sortable();

	$("#myimg").attr("src", "./images/jquery.png").attr("width", "100"); // change an attribute for an element

	// using jquery ui to make an image draggable
	$("#dragImg").draggable();

	$("em").addClass("selected"); // add a class to s apecific element type
	//$("#myid").addClass("highlight"); // add a aclass to a specific id



	$("li").eq(2).addClass("selected"); // add a aclass to a specific li element

	$("li").filter(".middle").addClass("selected"); // use a filter to select a subset of the selection

	//$("li").parent().addClass("prettyList");

	$("li").parents("div").addClass("prettyList");	


	// using ajax to load some text and insert it into an li tag using .load()
	$("button").eq(1).click(function(){
		$("li").eq(5).load("./lib/test.txt");
	});

	// using ajax to load in data from a specific div on another page and injecting it in
	$("button").eq(2).click(function(){
		var stuff;
		$("#emptyList").load("stuff.html #aList");
	});

	// using $.ajax to do more dynamic things with ajax
	// here it is grabbing some text from a file and appending it into a new <p> element, then adding a css class
	$("button").eq(3).click(function(){
	 	$.ajax({url:"./lib/test2.txt",dataType: "text"}).done(function(data) {
	   		$("#emptyDiv").append("<p>" + data + "</p>").addClass("selected");
	   		//alert("hello" + data);
	   	});	 
	});

	var dfArr = [];

	// use ajax to get a json file, put the contents into an array, then add some buttons to display the data in various ways
	$("button").eq(5).click(function(){

   		$("#dfPagin").after('<br><button id="dfBtnNames">Show Names</button><button id="dfBtnPersonal">Show Personal</button><button id="dfBtnHair">Show Hair Color</button><button id="dfBtnStatus">Show Status</button>');


		$("#dfBtnNames").click(function() {
			$("#dfData").children().remove();

			for (i = 0; i < dfArr.length; i++)	
				$("#dfList").children("ol").append("<li> " + dfArr[i]["FirstName"] + " " + dfArr[i]["LastName"] + "</li>");
		
		});


		$("#dfBtnPersonal").click(function() {
			$("#dfData").children().remove();

			for (i = 0; i < dfArr.length; i++)
				$("#dfList").children("ol").append("<li> " + dfArr[i]["FirstName"] + ": " + dfArr[i]["Personal"] + "</li>");
		});

		$("#dfBtnHair").click(function() {
			$("#dfData").children().remove();

			for (i = 0; i < dfArr.length; i++)
				$("#dfList").children("ol").append("<li> " + dfArr[i]["FirstName"] + ": " + dfArr[i]["Hair"] + "</li>");
		});

		$("#dfBtnStatus").click(function() {
			$("#dfData").children().remove();

			for (i = 0; i < dfArr.length; i++)
				$("#dfList").children("ol").append("<li> " + dfArr[i]["FirstName"] + ": " + dfArr[i]["Position"]+ " - " + dfArr[i]["Employment"] + " - " + dfArr[i]["Status"] + "</li>");
		});
	});




	// similar to above but paginating what is shown
	$("#dfPagin").click(function(){

   		$("#dfList").after('<div id="dfBtnDiv"><div id="dfBtnPrev">[ < Prev ] |</div><div id="dfPages"></div><div id="dfBtnNext">&nbsp;[ Next > ]</div></div>');
		$("#dfList").html('<ol id="dfData"></ol>');
		$("#dfList").css("height", "100px");
		$("#dfList").addClass("dfGuys");
		$("#dfBtnPrev").addClass("fakeLink");
		$("#dfBtnNext").addClass("fakeLink");
		$("#dfPages").css("display", "inline-block");
		$("ol").sortable();	// use jquery ui to make the list able to be dragged around and arranged		


		var startInd = 0;
		var pageSize = 3;
		var count = 0;
		var totalPages = 0;

		// first jason call is for initial display
	 	$.getJSON("./json/df.json", function(data) {
	 		var totalCount = 0;	 		
	 		
	 		$.each(data, function (key, val) {	 			
	 			// can use key to show only certain results
	 			if (key >= startInd && key < startInd + pageSize) {
	 				dfArr.push(val);
	 				count += 1;
	 			}	 

	 			totalCount += 1;			
	 		});

	 		// count of pages that will be needed
	 		totalPages = Math.ceil(totalCount / pageSize);

	 		// make a div for each page
	 		for (var i = 1; i <= totalPages; i++){
	 			$("#dfPages").append("&nbsp;<div id='dfPage" + i + "'>[ " + i + " ] |</div>");

	 			if (i != 1){
	 				$("#dfPage" + i).addClass("fakeLink");
	 			}
	 			else{
	 				$("#dfPage" + i).removeClass("fakeLink");
	 				$("#dfPage" + i).css("display", "inline-block");	 				
	 			}
	 		}

	 		startInd += count; 			

			if (count != 0){
				$("#dfData").children().remove();

				for (i = 0; i < dfArr.length; i++)	
					$("#dfList").children("ol").append("<li>" + dfArr[i]["FirstName"] + " " + dfArr[i]["LastName"] + "</li>");
			}

			count = 0;

			$("#dfList > ol > li:even").css("background", "#F49C1F");			
	   	});	 


		// add click functionality for each page button
		// this isn't working
		for (var i = 1; i <= totalPages; i++){
			alert("helloo");
			$("#dfPage" + i).click(function() {
				
			 	$.getJSON("./json/df.json", function(data) {
			 		dfArr = [];

			 		var pageStart = pageSize * (i - 1); // determine where this page should start
			 		
			 		$.each(data, function (key, val) {	 			
			 			// can use key to show only certain results
			 			if (key >= pageStart && key < pageStart + pageSize) {
			 				dfArr.push(val);
			 				count += 1;			 				
			 			}	 			
			 		});

		 			startInd = pageStart + count;

		 			if (count != 0) {
						$("#dfData").children().remove();

						for (i = 0; i < dfArr.length; i++)	
							$("#dfList").children("ol").append("<li>" + dfArr[i]["FirstName"] + " " + dfArr[i]["LastName"] + "</li>");
			   		}

			   		count = 0;
			   	});	
			});
		}


	 	// behavior for NEXT button
		$("#dfBtnNext").click(function() {
		 	$.getJSON("./json/df.json", function(data) {
		 		dfArr = [];
		 		
		 		$.each(data, function (key, val) {	 			
		 			// can use key to show only certain results
		 			if (key >= startInd && key < startInd + pageSize) {
		 				dfArr.push(val);
		 				count += 1;
		 			}	 			
		 		});

	 			startInd += count;

	 			if (count != 0) {
					$("#dfData").children().remove();

					for (i = 0; i < dfArr.length; i++)	
						$("#dfList").children("ol").append("<li>" + dfArr[i]["FirstName"] + " " + dfArr[i]["LastName"] + "</li>");
		   		}

		   		count = 0;

		   		$("#dfList > ol > li:even").css("background", "#F49C1F");
		   	});	
		});

	 	// behavior for PREV button
		$("#dfBtnPrev").click(function() {
		 	$.getJSON("./json/df.json", function(data) {
		 		dfArr = [];
		 		
		 		var childs = $("#dfData li").length; // count of child list items
				startInd -= (pageSize + childs);

		 		if (startInd < 0)
		 			startInd = 0;
		 		
		 		$.each(data, function (key, val) {	 			
		 			// can use key to show only certain results
		 			if (key >= startInd && key < startInd + pageSize) {
		 				dfArr.push(val);
		 				count += 1;
		 			}	 			
		 		});

	 			startInd += count;

	 			if (count != 0) {
					$("#dfData").children().remove();

					for (i = 0; i < dfArr.length; i++)	
						$("#dfList").children("ol").append("<li>" + dfArr[i]["FirstName"] + " " + dfArr[i]["LastName"] + "</li>");
		   		}

		   		count = 0;

		   		$("#dfList > ol > li:even").css("background", "#F49C1F");
		   	});	
		});



	});







	// using jquery ui modal dialog to give the user a choice
	// to get this to work: the button text had to NOT be in quotes
	// i had to add autoOpen: false to the dialogs options so that the text wouldn't appear on the page
	// then i was able to use the dialog open function attached to a button
	$("#dialog-confirm").dialog({
		autoOpen: false,
		resizable: true,
		height: 280,
		modal: true,
		buttons: {
			Continue: function() {
				$(this).dialog("close");
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});

	$("button").eq(4).click(function(){
		$("#dialog-confirm").dialog("open");
	});


	$("#inputBtn").click(function(){
		
		var output = $("#textInput").val();
		//alert(output);
		eval(output);




	});



	 // displays an error is ajax fails. must be attached to document
	$( document ).ajaxError(function( event, request, settings ) {
	  $( "#errorSpot" ).append( "<li>Error requesting page " + settings.url + "</li>" );
	});
	 
});