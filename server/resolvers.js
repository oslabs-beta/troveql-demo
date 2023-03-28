const { getMovies, getMovie, getActors } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Query: {
      movies: () => {
        console.log('inside movie(s) query');
        return getMovies();
      },
      movie: async (obj, args, context, info) => {
        console.log('inside movie query');
        console.log('args', args);
        const result = await getMovie(args.id);
        console.log('result', result);
        return result;
      }
  },
  Movie: {
    actors: async ({ id }) => {
      console.log('inside movie and actors query');
      const result = await getActors(Number(id));
      // console.log('result', result);
      return result;
    },
  }
};

module.exports = { resolvers };