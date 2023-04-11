// import sequelize instance
const sequelize  = require('../db_connect');
// import Constructors for model creation
const { DataTypes } = require('sequelize');
// import movieModel to associate foreign key
const Movie = require('./movieModel');

// create Watchlist model
const Watchlist = sequelize.define('watchlist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  watched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

// associate movie_id with movieModel's movie_id
Watchlist.belongsTo(Movie, {foreignKey: 'movie_id'});

// UNCOMMENT THE FOLLOWING CODE to call sync method on model to create/update table
// Watchlist
//   .sync()
//   .then(() => {
//     console.log("Watchlist Model synced");
//   })

module.exports = Watchlist;
