$( document ).ready(function() {
    console.log( "check..1.2.3" );
});

var topics = ["Superman", "Batman", "Robin", "Ironman", "Wonderwoman",
              "Hulk", "Wolverine", "Deadpool", "Jean Gray", "Doctor Strange",
              "Black Widow", "Antman"];

function makeButtons() {
  $("#buttonPanel").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("heroButton");
    button.attr("data-hero", topics[i]);
    button.text(topics[i]);
    $("#buttonPanel").append(button);
  }
}


$("#add-hero").on("click", function(event) {
  event.preventDefault();

  
  var hero = $("#hero-input").val().trim();

  topics.push(hero);
  $("#hero-input").val("");

  makeButtons();
});


function fetchHeroGifs() {
  var heroName = $(this).attr("data-hero");
  var heroStr = heroName.split(" ").join("+");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + heroStr + 
                 "&rating=pg-13&limit=20&api_key=tEDaqTpV90SW0xJHzDl07T5xOzzVIAx0";

  
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( response ) {
    var dataArray = response.data;
    console.log(response);
  
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("heroGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#gifPanel").append(newDiv);
    }
  });
}


function animateHeroGif() {

 var state = $(this).find("img").attr("data-state");
  
  
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}


$(document).ready(function() {
  makeButtons();
});


$(document).on("click", ".heroButton", fetchHeroGifs);


$(document).on("click", ".heroGif", animateHeroGif);