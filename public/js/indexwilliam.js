$navbarSearch = $("#navbar-search");
$movies = $(".carousel-image");



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
    window.location.href = "movie/search/" + value;
    
    
    
};
// create function to handle click on image/div to display movie info
var movieClick = function(){
    event.preventDefault();
  
    const id = $(this).attr("data-id");
    console.log(id);
    window.location.href = "movie/getby/" + id;
};

  $navbarSearch.on("submit", handleFormSubmit);
  $movies.on("click", movieClick);
  