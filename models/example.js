module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    movieID: DataTypes.INTEGER,
    Rating: DataTypes.INTEGER,
    Review: DataTypes.STRING
  });
  return Review;
};
