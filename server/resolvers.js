const {
  getMovies,
  getMovie,
  getActorsFromMovieID,
  addMovie,
  deleteMovie,
  editMovie,
} = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Mutation: {
    createMovie: async (obj, args) => {
      const result = await addMovie(args.title);
      return result;
    },

    deleteMovie: async (obj, args) => {
      const result = await deleteMovie(args.id);
      return result;
    },

    editMovie: async (obj, args) => {
      const result = await editMovie(args.id, args.title);
      return result;
    }
  },
  Query: {
    movies: async () => {
      const movies = await getMovies();
      return movies;
    },
    movie: async (obj, args, context, info) => {
      const result = await getMovie(args.id);
      return result;
    }
  },
  Movie: {
    actors: async (parent) => {
      const result = await getActorsFromMovieID(parent.id);
      return result;
    },
  },
};

module.exports = { resolvers };
