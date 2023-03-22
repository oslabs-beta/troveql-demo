const { db } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: (obj, args, context, info) => db.movies
  // }
};

module.exports = { resolvers };