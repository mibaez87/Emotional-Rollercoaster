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
    }

    $(".emotion").on("click", function () {
        var searchTerm = $(this).attr("data-name");
        console.log(searchTerm);
        var queryURL = "https://api.giphy.com/v1/gifs/search";

        $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: searchTerm,
            api_key: "EiUEVleCpKoSRlSJK8Z7BMD3sxjCIhKQ",
            limit: 10
                }
    }).done(function (response) {
        var results = response.data;
        console.log(results);

        // var pRating = $("<p>").text("Rating: " + results.rating);
        // var emotionImage = $("<img>");
        // emotionImage.attr("src", results.images.fixed_height.url);
        // $("<p>").append(emotionImage);
        // $("#emotionDiv").append(emotionImage);
    });

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
    });
});