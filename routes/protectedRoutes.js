var db = require("../models");

module.exports = function (app, passport) {

  app.post("/login",
    passport.authenticate("local", { failureRedirect: "/404" }),
    function (req, res) {
      res.redirect("back");
    });

  app.post("/register",
    passport.authenticate("local-signIn", { failureRedirect: "/404" }),
    function (req, res) {
      res.redirect("back")
    }
  )

  app.post("/movie/review", isLoggedIn, (req, res) => {
    const { Rating, Review, name, id } = req.body;
    db.Review.create({
      name: req.user.name,
      movieID: id,
      Rating: Rating,
      Review: Review
    }).then(function (dbReview) {
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
