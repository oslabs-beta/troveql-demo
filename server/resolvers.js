const { getMovies, getMovie, getActorsFromMovieID } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Query: {
    movies: () => {
      return getMovies();
    },
    movie: async (obj, args, context, info) => {
      const result = await getMovie(args.id);
      return result;
    }
},
  Movie: {
    actors: async (parent) => {
      // console.log('parent', parent);
      const result = await getActorsFromMovieID(parent.id);
      console.log('result', result);
      return result;
    }
  }
};

module.exports = { resolvers };