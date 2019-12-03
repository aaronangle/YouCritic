module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    name: DataTypes.STRING,
    movieID: DataTypes.INTEGER,
    Rating: DataTypes.DECIMAL(10, 1),
    Review: DataTypes.STRING
  });
  return Review;
};
