var $navbarSearch = $("#navbar-search");
var $movies = $(".carousel-image");
var $submit = $("#submitReview");
var registerTrigger = $(".registerTrigger")
var loginTrigger = $(".loginTrigger")
var registerUser = $("#register-user")

var testing = function (event) {
    event.preventDefault();
    console.log("working");
    var value = ($navbarSearch.find("input[name=search]").val());
    console.log(value);
};
// create function to handle search info and display options related to search terms
var handleFormSubmit = function () {
    event.preventDefault();
    var value = ($navbarSearch.find("input[name=search]").val());
    console.log(value);
    window.location.assign("/movie/search/" + value)
};
// create function to handle click on image/div to display movie info
var movieClick = function () {
    event.preventDefault();

    const id = $(this).attr("data-id");
    console.log(id);
    window.location.assign("/movie/getby/" + id)
};

var submitReview = function () {
    console.log("click")
    event.preventDefault();
    if ($("#reviewer-name").val() === "" || $("#rating").val() === "" || $("#review-text").val() === "") {
        alert("Please fill in all the information fields")
        return;
    }
    var data = {
        id: $(this).attr("data-id"),
        name: $("#reviewer-name").val(),
        Rating: $("#rating").val(),
        Review: $("#review-text").val()
    }
    $.post("/movie/review", data)
        .then(function (data) {
            if (data === false) {
                console.log("helo")
                $("#loginModal").modal("show")
            } else {
                location.reload();
            }
        })
}

registerTrigger.on("click", function (event) {
    event.preventDefault()
    $("#registerModal").modal("show")
    $("#loginModal").modal("hide")
})

loginTrigger.on("click", function (event) {
    event.preventDefault()
    $("#loginModal").modal("show")
    $("#registerModal").modal("hide")
})

$navbarSearch.on("submit", handleFormSubmit);
$movies.on("click", movieClick);
$submit.on("click", submitReview)
