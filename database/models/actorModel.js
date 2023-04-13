const sequelize = require('./index');
const { DataTypes } = require('sequelize');

// create Actor model
const Actor = sequelize.define("actor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  place_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// UNCOMMENT THE FOLLOWING CODE to call sync method on model to create/update table
Actor
  .sync({ force: false })

module.exports = Actor;