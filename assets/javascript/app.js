var API_KEY = "QQx3yAB40lUloE1r1Oa2xgCTYCbXpOwb";

var topics = ["movies", "music", "dnd", "vinyl records", "dogs", "no", "cats", "books", "kc chiefs", "yes"];
var buttonWrapperDiv = $("#button-wrapper");
var gifWrapperMain = $("#wrapper");


$(document).ready(function () {
    var height = $(document).height();
    // $("#body-wrapper").height(height + "px");
    makeButton();

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var input = $("#search-val").val().trim();
        topics.push(input);
        $("#search-val").val("");
        makeButton();
    });

    $(document).on("click", ".search-btn", function(){
        gifWrapperMain.empty();
        var dataTerm = $(this).data("term");
        console.log($(this).data("term"));
        runAPI(dataTerm, 10);
    });


});

function runAPI(q, l) {
    var search = q;
    var limit = l;
    var queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${limit}`
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (res) {
        console.log(queryURL);
        console.log(res);
        var gifWrapperDiv = $("<div>");
        for (var i = 0; i < l; i++) {
            console.log(res.data[i]);
            console.log(res.data[i].images.fixed_width_still.url);
            var tempGifDiv = $("<div>");
            var img = $("<img>");
            img.attr("src", res.data[i].images.fixed_width_still.url).attr("id", "gif-img-" + i); 
            tempGifDiv.append(img);
            gifWrapperDiv.append(tempGifDiv);
        }
        gifWrapperMain.append(gifWrapperDiv);
    });
}


// function makeGifDiv(gifUrl) {
//     var gifWrapperDiv = $("<div>");
// }



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