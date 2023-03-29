const { getMovies, getMovie, getActorsFromMovieID, addMovie, DeleteMovie } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Mutation: {
    createMovie: async (args) => {
      console.log('in mutation addmovie', args);
      const result = await addMovie(args.title);
      return result;
    }
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
      // console.log('parent', parent);
      const result = await getActorsFromMovieID(parent.id);
      return result;
    }
  }
};

module.exports = { resolvers };