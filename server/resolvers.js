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
    addmovie: async (args) => {
      const result = await addMovie(args.title);
      return;
    }
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