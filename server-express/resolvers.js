// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  // Query: {
      movies: () => {
          // use Prisma to GET all movies from db? - hardcoded for now...
          return [
              { title: 'Titanic', director: 'James Cameron' },
              { title: 'Jurassic Park', director: 'Steven Spielberg' },
              { title: 'Harry Potter', director: 'Chris Columbus' }
          ];
      }
  // }
};

module.exports = { resolvers };