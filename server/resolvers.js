const {
  getMovies,
  getMovie,
  getActorsFromMovieID,
  addMovie,
  deleteMovie,
} = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Mutation: {
    createMovie: async (obj, args, context, info) => {
      const result = await addMovie(args.title);
      return result;
    },

    deleteMovie: async (obj, args, context, info) => {
      console.log('in delete movie resolver');
      const result = await deleteMovie(args.id);
      return result;
    },
  },
  Query: {
    movies: () => {
      return getMovies();
    },
    movie: async (obj, args, context, info) => {
      const result = await getMovie(args.id);
      return result;
    },
  },
  Movie: {
    actors: async (parent) => {
      const result = await getActorsFromMovieID(parent.id);
      return result;
    },
  },
};

module.exports = { resolvers };
