const { getMovies, getMovie, getActorsFromMovieID } = require('./data');

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Query: {
    movies: (parent) => {
      console.log('inside movie(s) query');
      return getMovies();
    },
    movie: async ({ id }) => {
      console.log('inside movie query');
      console.log('args in movie resolver', { id });
      const result = await getMovie(3);
      return result;
    }
    // actors: async () => {
    //   // console.log('inside movies query');
    //   const result = await getActors();
    //   return result;
    // },
  },
  Movie: {
    actors: async (parent) => {
      const result = await getActorsFromMovieID(9);
      // const result = await getActorsFromMovieID(parent.id);
      return result;
    }
  }
};

module.exports = { resolvers };