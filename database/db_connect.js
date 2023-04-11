// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// connect to postgres DB
// eslint-disable-next-line no-undef
console.log('URI');

// eslint-disable-next-line no-undef
// const sequelize = new Sequelize(process.env.DB_URI, {
//   dialect: 'postgres'
// });

const sequelize = new Sequelize('postgres://akzvayps:qTVWKmn-i8cBzmDagJB6tvGGWs02ApGn@mahmud.db.elephantsql.com/akzvayps');

// test connection

// const test = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// test();



module.exports = sequelize;

