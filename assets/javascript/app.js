var API_KEY = "QQx3yAB40lUloE1r1Oa2xgCTYCbXpOwb";

var topics = ["movies", "music", "dnd", "vinyl records", "dogs", "discgolf", "javascript", "books", "kcchiefs", "sportingKC"];
var buttonWrapperDiv = $("#button-wrapper");



$(document).ready(function () {
    var height = $(document).height();
    $("#body-wrapper").height(height + "px");
    makeButton();

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var input = $("#search-val").val().trim();
        topics.push(input);
        $("#search-val").val("");
        makeButton();
    });

    $(document).on("click", ".search-btn", runAPI)


});

function runAPI() {
    var search = $(this).data("term");
    var limit = 10;
    var queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${limit}`

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
}




function makeButton() {
    buttonWrapperDiv.empty();
    var btnDiv = $("<div>");
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.addClass("btn search-btn").attr("id", "btn-" + i).attr("data-term", topics[i]).text(topics[i]);
        btnDiv.append(newBtn);
    }
    buttonWrapperDiv.append(btnDiv);
}