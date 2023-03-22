// import sequelize instance
const sequelize  = require('../db_connect');
// import Constructors for model creation
const { DataTypes } = require('sequelize');
// import movieModel to associate foreign key
const Movie = require('./movieModel');

// create Movie model
const User = sequelize.define("user", {
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

  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// associate movie_id with movieModel's movie_id
User.belongsTo(Movie, {foreignKey: 'movie_id'});

// call sync method on model to create/update table
User
  .sync()
  .then(() => {
    console.log("User Model synced");
  })

module.exports = User;
