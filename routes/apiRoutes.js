var db = require("../models");
const axios = require("axios");
const key = "api_key=5b7ec8c43b8a517b567bff8676f13124";
const URL = "https://api.themoviedb.org/3/";
const express = require("express")
const router = express.Router();
const obj = {};
let visited;

setInterval(() => {
  visited = false;
}, 43200000);

router.get("/", async function (req, res) {
  if (visited) {
    res.render("index", { obj })
  } else {
    try {
      await axios.get(`${URL}trending/movie/day?${key}`)
        .then(trending => {
          obj.Trending = trending.data;
        });
      await axios.get(`${URL}movie/now_playing?${key}`)
        .then(latest => {
          obj.Latest = latest.data;
        });
      await axios.get(`${URL}discover/movie?${key}&with_genres=28`)
        .then(action => {
          obj.Action = action.data;
        });
      await axios.get(`${URL}discover/movie?${key}&with_genres=35`)
        .then(comedy => {
          obj.Comedy = comedy.data;
        });
      await axios.get(`${URL}discover/movie?${key}&with_genres=10751`)
        .then(family => {
          obj.Family = family.data;
        });
      await res.render("index", { obj })
      visited = true;
    }
    catch{
      res.status(500)
    }
  }
});

router.get("/movie/search/:name", function (req, res) {
  console.log("route hit")
  const name = req.params.name;
  console.log(name);
  axios.get(`${URL}search/movie/?${key}&query=${name}`)
    .then(results => {
      const numResults = results.data.total_results

      if (numResults > 1) {
        const movie = results.data.results;

        res.render("search", { movie })

      } else if (numResults === 1) {
        const id = results.data.results[0].id;
        const movie = {};
        axios.get(`${URL}movie/${id}?${key}`)
          .then(results => {
            db.Review.findAll({
              where: {
                movieID: parseInt(id)
              }
            })
              .then(movieReview => {
                const reviews = []
                movie.rating = "Not Rated Yet"
                let rating = 0;
                let count = 0;
                movieReview.forEach(element => {
                  count++;
                  rating += parseInt(element.Rating)
                  reviews.push({ desc: element.Review, rating: element.Rating, name: element.name })
                })
                movie.review = { reviews }
                movie.rating = rating / count
                if (!movie.rating) {
                  movie.rating = "Be The First One To Leave A YouCritic Rating"
                } else {
                  movie.rating = movie.rating.toFixed(2) + " / 5";
                }
              })
              .catch(err => {
                console.log(err)
              })
            movie.results = results.data
          })
          .catch(err => {
            console.log(err)
          })
        axios.get(`${URL}movie/${id}/videos?${key}`)
          .then(video => {
            video.data.results.forEach(element => {
              if (element.type === "Trailer" && element.site === "YouTube") {
                movie.video = element;
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
        axios.get(`${URL}movie/${id}/recommendations?${key}`)
          .then(recommendations => {
            movie.recommend = recommendations.data;
            res.render("detail", { movie });
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        res.render("404")
      }
    })
    .catch(err => {
      console.log(err)
    });
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
            const reviews = []
            movie.rating = "Not Rated Yet"
            let rating = 0;
            let count = 0;
            movieReview.forEach(element => {
              count++;
              rating += parseInt(element.Rating)
              reviews.push({ desc: element.Review, rating: element.Rating, name: element.name })
            })
            movie.review = { reviews }
            movie.rating = rating / count
            if (!movie.rating) {
              movie.rating = "Be The First One To Leave A YouCritic Rating"
            } else {
              movie.rating = movie.rating.toFixed(2) + " / 5";
            }
          })
        movie.results = results.data
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

router.post("/movie/review/:id", function (req, res) {
  const rating = req.body.rating
  const review = req.body.review;
  const name = req.body.name;
  console.log(rating)
  db.Review.create({
    name: name,
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