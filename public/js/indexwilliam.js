$navbarSearch = $("#navbar-search");
$movies = $(".carousel-tile");



var testing = function (event){
    event.preventDefault();
    console.log("working");
    var value = ($navbarSearch.find("input[name=search]").val());
    console.log(value);
};
// create function to handle search info and display options related to search terms
var handleFormSubmit = function(){
    event.preventDefault();
    var value = ($navbarSearch.find("input[name=search]").val());
    console.log(value);
    return $.ajax({
        url: "api/movie/search/" + value,
        method: "GET"
    });
    
    
};
// create function to handle click on image/div to display movie info
var movieClick = function(){
    event.preventDefault();
    return $.ajax({
        url: "api/movie/search/" + value,
        method: "GET"
      });

};

  $navbarSearch.on("submit", handleFormSubmit);
  $movies.on("click", movieClick);
  