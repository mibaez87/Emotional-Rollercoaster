$(document).ready(function () {
    //create array of emotions as strings to search the API which will appear later as buttons
    var emotionsArray = ["UNIMPRESSED", "RELAXED", "HAPPY", "SUSPICIOUS", "DISAPPOINTED", "HUNGRY", "SASSY", "INSPIRED"];
    //create forEach and pass function of makeButton so a button is made for each emotion in array
    emotionsArray.forEach(makeButton);
    //call function to generate gif image results
    getGiphy();

    //function to create buttons dynamically
    function makeButton(element, i, array) {
        var emotion = element;
        var emotionBtn = $("<button>");
        emotionBtn.addClass("emotion");
        emotionBtn.attr("data-name", emotion);
        emotionBtn.text(emotion);
        $("#btnsHere").append(emotionBtn).append("<br>");
    }

    //function to get and display gif images from API
    function getGiphy() {
    //create event listener for each button
    $(document).on("click", ".emotion", function () {
        //make sure div where gifs will appear is empty
        $("#emotionDiv").empty();
        //create variable and assign attribute to capture user input
        var searchTerm = $(this).attr("data-name");
        //create variable with API url for search
        var queryURL = "https://api.giphy.com/v1/gifs/search";
        //use ajax to make a call and get the data from API
        $.ajax({
            url: queryURL,
            method: "GET",
            //pass specific data parameters including what we are searching and how many results to return
            data: {
                q: searchTerm,
                api_key: "EiUEVleCpKoSRlSJK8Z7BMD3sxjCIhKQ",
                limit: 10
            }
        }).done(function (response) {
            //create variable to capture results
            var results = response.data;
            //craete for loop to capture each of the images
            for (var i = 0, len = results.length; i < len; i++) {
                //create div to hold gifs
                var gifDiv = $("<div>").addClass("gif");
                //create variable to capture the rating of each image
                var rating = results[i].rating;
                //create p div to display rating
                var pRating = $("<p>").text("Rating: " + rating);
                //create img div to hold the image
                var emotionGif = $("<img>");
                //add attirubte of image source so it knows which image to display
                emotionGif.attr("src", results[i].images.fixed_height.url);
                //add the displayed rating then the gif to the assigned div for capturing images
                gifDiv.append(pRating);
                gifDiv.append(emotionGif);
                //add to HTML div to display
                $("#emotionDiv").append(gifDiv);
            }
        });
    });
    }
    //create event listener specific to the user search button
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        //create variable to capture user choice
        var userChoice = $("#searchField").val().trim();
        //call make button and get giphy function passing through the user choice unique to this button and event
        makeButton(userChoice);
        getGiphy(userChoice);
    });
});