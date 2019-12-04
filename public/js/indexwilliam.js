var $navbarSearch = $("#navbar-search");
var $movies = $(".carousel-image");
var $submit = $("#submitReview");
var register = $("#register")
var registerUser = $("#register-user")
var registerDetail = $("#registerUser")





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

register.on("click", function () {
    $("#registerModal").modal("show")
})

registerDetail.on("click", function (event) {
    event.preventDefault()
    $("#registerModal").modal("show")
})

registerUser.on("click", function (event) {
    event.preventDefault()
    $("#loginModal").modal("show")
})

$navbarSearch.on("submit", handleFormSubmit);
$movies.on("click", movieClick);
$submit.on("click", submitReview)
