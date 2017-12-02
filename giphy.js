$(document).ready(function () {
    var emotionsArray = ["UNIMPRESSED", "RELAXED", "HAPPY", "SUSPICIOUS", "DISAPPOINTED", "HUNGRY", "SASSY", "INSPIRED"];
    
    emotionsArray.forEach(makeButton);

    function makeButton(element, i, array) {
        var emotion = emotionsArray[i];
        var emotionBtn = $("<button></button><br>");
        emotionBtn.addClass("emotion");
        emotionBtn.attr("data-name", emotion);
        emotionBtn.text(emotion);
        $("#btnsHere").append(emotionBtn);
        console.log(emotion);
    }

    var queryURL = "https://api.giphy.com/v1/gifs/search";

    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: emotion,
            api_key: "EiUEVleCpKoSRlSJK8Z7BMD3sxjCIhKQ",
            limit: 10
        }
    }).done(function(response){
        var results = response.data;

        var pRating = $("<p>").text("Rating: " + results.rating);
        var emotionImage = $("<img>");
        emotionImage.attr("src", results.images.fixed_height.url);
        $("<p>").append(emotionImage);
        $("#emotionDiv").append(emotionImage);
    });

    // //add event listener to give button a function
    // $("#gif-button").on("click", function() {

    //           //saving API endpoint as a variable
    //           var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=EiUEVleCpKoSRlSJK8Z7BMD3sxjCIhKQ&tag=frustrated";

    //           //sending request to API endpoint to get info
    //           $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //           })

    //           //function to use request response
    //           .done(function(response) {

    //             //use the API documentation to get the image of the response
    //             var imageUrl = response.data.image_original_url;

    //             //create image element where image of response will be displayed
    //             var frustratedGif = $("<img>");

    //             //give image attributes to display image or alt text
    //             frustratedGif.attr("src", imageUrl);
    //             frustratedGif.attr("alt", "frustrated gif");

    //             //add the new element before the images div
    //             $("#images").prepend(frustratedGif);
    //           });
    //         });
});