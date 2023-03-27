// import sequelize instance
const sequelize  = require('../db_connect');
// import Constructors for model creation
const { DataTypes } = require('sequelize');
// import movieModel to associate foreign key
const Movie = require('./movieModel');
const Actor = require('./actorModel');

// create ActorinMovies model as join table
const ActorinMovies = sequelize.define("movie_actor", {
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

  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// associate movie_id with movieModel's id
// associate actor_id with actorModel's id
ActorinMovies.belongsTo(Movie, {foreignKey: 'movie_id'});
ActorinMovies.belongsTo(Actor, {foreignKey: 'actor_id'});


// UNCOMMENT THE FOLLOWING CODE to call sync method on model to create/update table
// ActorinMovies
//   .sync()
//   .then(() => {
//     console.log("ActorinMovies Model synced");
//   })

module.exports = ActorinMovies;
