const { getMovies, getMovie } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: (obj, args, context, info) => getMovies(),
      movie: (movie_id) => getMovie(movie_id),
  // }
};

module.exports = { resolvers };