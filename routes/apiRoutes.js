var db = require("../models");
const axios = require("axios");
const key = "api_key=5b7ec8c43b8a517b567bff8676f13124";
const URL = "https://api.themoviedb.org/3/"
module.exports = function (app) {
  // Get all examples
  app.get("/", async function (req, res) {
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
      await res.render("index", { obj })
    }
    catch{
      if (err) {
        res.status(500)
      }
    }
  });

  // Create a new example
  app.get("/movie/search/:name", function (req, res) {
    const name = req.params.name;
    axios.get(`${URL}search/movie/?${key}&query=${name}`)
      .then(results => {
        const numResults = results.data.total_results
        if (numResults > 1) {
          res.render("search", results.data)
        } else if (numResults === 1) {
          getMovieId(results.data.results[0].id)
        } else {
          res.render("NotFound")
        }
      })
      .catch(err => {
        throw err
      })
  });

  function getMovieId(MovieID) {
    axios.get(`${URL}movie/${MovieID}?${key}`)
      .then(results => {
        db.Review.findAll({

        }, {
          where: {
            id: MovieID
          }
        })
          .then(movieReview => {
            console.log(movieReview)
          })
        // console.log(results.data)
        res.render("IndividualMoviePage", results.data)
      })
      .catch(err => {
        throw err
      })
  }

  app.get("/movie/getby/:id", function (req, res) {
    getMovieId(req.params.id);
  })

  // Delete an example by id
  app.post("/movie/review/:id", function (req, res) {
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

  app.put("/movie/review/:id", function (req, res) {
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
};
