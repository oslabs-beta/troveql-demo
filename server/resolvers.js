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
    actors: async (obj, args, context, info) => {
      const result = await getActorsFromMovieID(args.id);
      return result;
    }
  }
};

module.exports = { resolvers };