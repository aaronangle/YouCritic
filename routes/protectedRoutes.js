var db = require("../models");

module.exports = function (app, passport) {

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    });

  app.post("/movie/review", isLoggedIn, (req, res) => {
    const { Rating, Review, name, id } = req.body
    db.Review.create({
      name: name,
      movieID: id,
      Rating: Rating,
      Review: Review
    }).then(function (dbReview) {
      console.log(dbReview.dataValues)
      res.json(dbReview.dataValues);
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.json(false)
  }
};
