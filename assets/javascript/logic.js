var defaultAnimals = ["cat", "dog", "monkey"];
var animalsArray = JSON.parse(localStorage.getItem("animalia"));

$("#clearIt").on("click", function (event){
  animalsArray = defaultAnimals;
  localStorage.setItem("animalia", JSON.stringify(animalsArray));
  displayButtons();
});

//add animal to array
$("#add-animal").on("click", function(event){
	event.preventDefault();
	var newAnimal = $("#animal-search").val().trim();
  $("#animal-search").empty();
	animalsArray.push(newAnimal);
  localStorage.setItem("animalia", JSON.stringify(animalsArray));
	
	displayButtons();
});

//display items
function displayButtons(){
  $(".buttons-dump").empty();

  var innerArray = JSON.parse(localStorage.getItem("animalia"));

  if(!Array.isArray(innerArray)){
    innerArray = [];
  }

	for (var i=0; i<innerArray.length; i++){
		var b = $("<button>").attr("data-animal", innerArray[i]).text(innerArray[i]);
		$(".buttons-dump").append(b);
	}
}

displayButtons();

//search for some animals, display the gifs
$(document).on("click", "button", function(){
	$("#gifs-appear-here").empty();
	var animal = $(this).attr("data-animal");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response){
    	var results = response.data;

    	console.log(response);

    	for(var i=0; i<results.length; i++){
  		var animalDiv = $("<div>");
  		var p = $("<p>");

  		p.text("Rating: "+results[i].rating);

  		var animalImage = $("<img>");
  		animalImage.addClass("gifs");
  		animalImage.attr("src", results[i].images.fixed_height.url);
  		animalImage.attr("data-animate", results[i].images.fixed_height.url);
  		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
  		animalImage.attr("data-state", "animate");

  		animalDiv.append(p);
  		animalDiv.append(animalImage);

    	$("#gifs-appear-here").prepend(animalDiv);
    	}


  	});

});

	//gifs onclick freezer
$(document).on("click", ".gifs", function(){
	var state = $(this).attr("data-state");

	var dataAnimate = $(this).attr('data-animate');
	var dataStill = $(this).attr('data-still');

	if (state === 'still'){
		$(this).attr('src', dataAnimate);
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', dataStill);
		$(this).attr('data-state', 'still');
	}


});
