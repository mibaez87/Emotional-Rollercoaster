$(document).ready(function () {
    var emotionsArray = ["UNIMPRESSED", "RELAXED", "HAPPY", "SUSPICIOUS", "DISAPPOINTED", "HUNGRY", "SASSY", "INSPIRED"];

    emotionsArray.forEach(makeButton);
    getGiphy();

    function makeButton(element, i, array) {
        var emotion = element;
        var emotionBtn = $("<button>");
        emotionBtn.addClass("emotion");
        emotionBtn.attr("data-name", emotion);
        emotionBtn.text(emotion);
        $("#btnsHere").append(emotionBtn).append("<br>");
    }

    function getGiphy() {
    $(document).on("click", ".emotion", function () {
        $("#emotionDiv").empty();
        var searchTerm = $(this).attr("data-name");
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

            for (var i = 0, len = results.length; i < len; i++) {
                var gifDiv = $("<div>").addClass("gif");

                var rating = results[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);

                var emotionGif = $("<img>");
                emotionGif.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(pRating);
                gifDiv.append(emotionGif);

                $("#emotionDiv").append(gifDiv);
            }
        });
    });
    }

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        var userChoice = $("#searchField").val().trim();

        makeButton(userChoice);
        getGiphy(userChoice);
    });
});