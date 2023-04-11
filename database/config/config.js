require('dotenv').config();

dotenv.config();
const config = {
development: {
 use_env_variable: DB_URI,
 dialect: 'postgresql',
},
test: {
 use_env_variable: DB_URI,
 dialect: 'postgresql',
 logging: false
},
production: {
  use_env_variable: DB_URI,
  dialect: 'postgresql',
  logging: false
}
};

module.exports = config;