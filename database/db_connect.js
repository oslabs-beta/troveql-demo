const { Sequelize } = require('sequelize');

// connect to postgres DB
const sequelize = new Sequelize('postgres://akzvayps:qTVWKmn-i8cBzmDagJB6tvGGWs02ApGn@mahmud.db.elephantsql.com/akzvayps');

// test connection

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();


module.exports = sequelize;

