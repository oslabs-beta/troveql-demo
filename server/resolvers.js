const { getMovies, getMovie } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: (obj, args, context, info) => {
        console.log('inside movie(s) query');
        return getMovies()
      },
      movie: (args) => {
        console.log('inside movie query');
        return getMovie(args.movie_id)
      },
  // }
};

module.exports = { resolvers };