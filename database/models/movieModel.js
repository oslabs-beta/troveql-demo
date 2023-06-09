// import sequelize instance
const sequelize = require('./index');
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

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// UNCOMMENT THE FOLLOWING CODE to call sync method on model to create/update table
Movie
  .sync({ force: false })

module.exports = Movie;
