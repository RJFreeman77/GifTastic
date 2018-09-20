var API_KEY = "QQx3yAB40lUloE1r1Oa2xgCTYCbXpOwb";
var topics = ["movies", "music", "dnd", "bmo", "dogs", "no", "cats", "books", "adventuretime", "yes"];
var buttonWrapperDiv = $("#button-wrapper");
var gifWrapperMain = $("#wrapper");
var isToggleDelete = false;

$(document).ready(function () {
    var list = JSON.parse(localStorage.getItem("topicsAry"));
    if (list) {
        topics = list;
    } else {
        console.log("list is not");
    }
    console.log(list);
    runAPI("wow", 10);
    makeButton();

    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        gifWrapperMain.empty();
        var input = $("#search-val").val().trim();
        runAPI(input, 10);
        console.log(input);
        $("#search-val").val("");
    });

    $(document).on("click", ".search-btn", function () {
        if (isToggleDelete) {
            var tempIndex = $(this).attr("data-index");
            console.log([topics, tempIndex]);
            topics.splice(tempIndex, 1);
            makeButton();
        } else {
            gifWrapperMain.empty();
            var dataTerm = $(this).attr("data-term");
            runAPI(dataTerm, 10);
        }
    });

    $(document).on("click", ".gif", function () {
        var self = $(this);
        var state = self.attr("data-state");
        if (state === "still") {
            self.attr("src", self.attr("data-animated"));
            self.attr("data-state", "animated");
        } else if (state === "animated") {
            self.attr("src", self.attr("data-still"));
            self.attr("data-state", "still");
        }
    });

    $("#search-return").on("click", function () {
        var dataTerm = $(this).attr("data-term");
        if (topics.indexOf(dataTerm) < 0) {
            topics.push(dataTerm);
            makeButton();
            $(".click-to-save").hide();
        }
    });

    $("#delete-button").on("click", function () {
        if (isToggleDelete) {
            $("#delete-button").text("Delete");
            isToggleDelete = false;
        } else {
            $("#delete-button").text("Done");
            isToggleDelete = true;
        }
    });
});

function runAPI(q, l) {
    $("#search-return").text('"' + q + '"').attr("data-term", q);
    checkAry(q)
    var search = q;
    var limit = l;
    var queryURL = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${limit}`
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var res = response.data;
        console.log(queryURL);
        var gifWrapperDiv = $("<div>");
        for (var i = 0; i < l; i++) {
            var tempGifDiv = $("<div>");
            var img = $("<img>");
            img.addClass("gif").attr("src", res[i].images.fixed_width_still.url).attr("id", "gif-" + i).attr("data-still", res[i].images.fixed_width_still.url).attr("data-animated", res[i].images.fixed_width.url).attr("data-state", "still");;
            tempGifDiv.append(img);
            gifWrapperDiv.append(tempGifDiv);
        }
        gifWrapperMain.append(gifWrapperDiv);
    });
}

function makeButton() {
    buttonWrapperDiv.empty();
    var btnDiv = $("<div>");
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.addClass("btn search-btn").attr("id", "btn-" + i).attr("data-term", topics[i]).attr("data-index", i).text(topics[i]);
        btnDiv.append(newBtn);
    }
    buttonWrapperDiv.append(btnDiv);
    localStorage.setItem("topicsAry", JSON.stringify(topics));
}

function checkAry(val) {
    if (topics.indexOf(val) >= 0) {
        $(".click-to-save").hide();
    } else {
        $(".click-to-save").show();
    }
}



// still need to figure out way to delete stuff from array