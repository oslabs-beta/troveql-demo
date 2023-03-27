const { getMovies, getMovie } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: (obj, args, context, info) => {
        console.log('inside movie(s) query');
        return getMovies();
      },
      movie: async (obj, args, context, info) => {
        console.log('inside movie query');
        // console.log('args', args);
        const result = await getMovie(2);
        console.log('result', result);
        return result;
      },
  // }
};

module.exports = { resolvers };