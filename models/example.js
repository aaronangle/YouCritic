module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    movieID: DataTypes.STRING,
    Rating: DataTypes.TEXT,
    Review: DataTypes.STRING
  });
  return Review;
};
