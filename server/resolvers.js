const { getMovies, getMovie, getActors } = require('./data');

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
      console.log('inside movie and actors query');
      const result = await getActors(args.id);
      return result;
    },
  }
};

module.exports = { resolvers };