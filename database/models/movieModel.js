// import sequelize instance
const sequelize  = require('../db_connect');
// import Constructors for model creation
const { DataTypes } = require('sequelize');

// create Movie model
const Movie = sequelize.define("movie", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  vote_average: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
    defaultValue: 0,
  },

  vote_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

// call sync method on model to create/update table
Movie
  .sync()
  .then(() => {
    console.log("Movie Model synced");
  })

module.exports = Movie;
