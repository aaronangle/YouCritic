var db = require("../models");
const axios = require("axios");
const key = "api_key=5b7ec8c43b8a517b567bff8676f13124";
const URL = "https://api.themoviedb.org/3/";
const express = require("express")
const router = express.Router();

// Get all examples
router.get("/", async function (req, res) {
  const obj = {}
  try {
    await axios.get(`${URL}trending/movie/day?${key}`)
      .then(trending => {
        obj.trending = trending.data;
      });
    await axios.get(`${URL}movie/now_playing?${key}`)
      .then(latest => {
        obj.latest = latest.data;
      });
    await axios.get(`${URL}discover/movie?${key}&with_genres=28`)
      .then(action => {
        obj.action = action.data;
      });
    await axios.get(`${URL}discover/movie?${key}&with_genres=35`)
      .then(comedy => {
        obj.comedy = comedy.data;
      });
    await axios.get(`${URL}discover/movie?${key}&with_genres=10751`)
      .then(family => {
        obj.family = family.data;
      });
    console.log(obj)
    await res.render("index", { obj })
  }
  catch{
    res.status(500)
  }
});

router.get("/movie/search/:name", function (req, res) {
  console.log("htin")
  const name = req.params.name;
  axios.get(`${URL}search/movie/?${key}&query=${name}`)
    .then(results => {
      const numResults = results.data.total_results
      if (numResults > 1) {
        const movie = results.data.results
        console.log(results.data.results)
        res.render("search", { movie })
      } else if (numResults === 1) {
        // getMovieId(results.data.results[0].id)
        axios.get("/movie/getby/" + results.data.results[0].id)
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            throw err
          })
      } else {
        res.render("404")
      }
    })
    .catch(err => {
      throw err
    })
});

router.get("/movie/getby/:id", async function (req, res) {
  const movie = {};
  try {
    await axios.get(`${URL}movie/${req.params.id}?${key}`)
      .then(results => {
        db.Review.findAll({
          where: {
            movieID: parseInt(req.params.id)
          }
        })
          .then(movieReview => {
            console.log(movieReview)
            movie.rating = "Not Rated Yet"
            let rating = 0;
            let count = 0;
            movieReview.forEach(element => {
              count++;
              rating += element.Rating
              movie.review += element.Review
            })
            movie.rating = rating / count
              .toFixed(2);
            if (!movie.rating) {
              movie.rating = "Be The First One To Leave A YouCritic Rating"
            }
            // console.log(movie.review)
          })
        movie.results = results.data
        movie.review = movieReview
      })
    await axios.get(`${URL}movie/${req.params.id}/videos?${key}`)
      .then(video => {
        video.data.results.forEach(element => {
          if (element.type === "Trailer" && element.site === "YouTube") {
            movie.video = element;
          }
        })
      })
    await axios.get(`${URL}movie/${req.params.id}/recommendations?${key}`)
      .then(recommendations => {
        movie.recommend = recommendations.data;
      })
    await res.render("detail", { movie });
  }
  catch{
    res.status(500);
  }
})

// Delete an example by id
router.post("/movie/review/:id", function (req, res) {
  const rating = req.body.rating
  const review = req.body.review;
  console.log(rating)
  db.Review.create({
    movieID: req.params.id,
    Rating: rating,
    Review: review
  }).then(function (dbReview) {
    console.log(dbReview.dataValues)
    res.json(dbReview.dataValues);
  });
});

router.put("/movie/review/:id", function (req, res) {
  const review = req.body.review;
  console.log(rating)
  db.Review.update({
    Review: review
  }, {
    where: {
      movieID: req.params.id
    }
  }).then(function (dbReview) {
    console.log(dbReview.dataValues)
    res.json(dbReview.dataValues);
  });
});

module.exports = router;