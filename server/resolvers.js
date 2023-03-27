const { getMovies, getMovie, getActors } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Query: {
      movies: () => getMovies(),
      movie: async (obj, { id }, context, info) => {
        console.log('inside movie query');
        // console.log('args', args);
        const result = await getMovie(3);
        console.log('result', result);
        return result;
      },
      actors: () => getActors(),
  },
  // Movie: {
  //   actors: async (obj) => {
  //     console.log('inside movie and actors query');
  //     const result = await getActors(obj.id);
  //     // console.log('result', result);
  //     return result;
  //   },
  // }
};

module.exports = { resolvers };