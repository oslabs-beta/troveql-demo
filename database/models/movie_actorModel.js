// import sequelize instance
const sequelize = require('./index');
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
    allowNull: true,
  },

  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

// associate movie_id with movieModel's id
// associate actor_id with actorModel's id
ActorinMovies.belongsTo(Movie, {foreignKey: 'movie_id'});
ActorinMovies.belongsTo(Actor, {foreignKey: 'actor_id'});

// create many to many connections to associate join table with movie table and actor table
Actor.belongsToMany(Movie, { through: ActorinMovies, foreignKey: 'actor_id' });
Movie.belongsToMany(Actor, { through: ActorinMovies, foreignKey: 'movie_id' });

// UNCOMMENT THE FOLLOWING CODE to call sync method on model to create/update table
// ActorinMovies
//   .sync()
//   .then(() => {
//     console.log("ActorinMovies Model synced");
//   })

module.exports = ActorinMovies;
