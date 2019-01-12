'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: true}
      },
    author: {
      type: DataTypes.STRING,
      validate: {
        notNull: true}
      },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};