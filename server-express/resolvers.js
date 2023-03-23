const { getMovies, getUserMovies } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: (obj, args, context, info) => {
        console.log(obj);
        // console.log(args);
        return getMovies();
      },
      favlist: (obj, args, context, info) => getUserMovies(),
  // }
};

module.exports = { resolvers };