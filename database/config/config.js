

const config = {
development: {
 use_env_variable: 'PG_URI',
 dialect: 'postgresql',
},
test: {
 use_env_variable: 'PG_URI', // One can use different URI for production environement
 dialect: 'postgresql',
 logging: false
},
production: {
  use_env_variable: 'PG_URI', // One can use different URI for production environement
  dialect: 'postgresql',
  logging: false
}
};

module.exports = config;