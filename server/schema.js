const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers } = require('./resolvers');

// Clients can execute a query named movies and the server will return an array of zero or more Movies
//will need to add Mutations whenever we're ready...
const typeDefs = `#graphql
  # "Movie" is a type that lets clients query the API by movie title (required)
  type Movie {
    id: Int
    title: String!
    genre: String
    year: Int
    actors: [Actor]
  }

  type Actor {
    id: Int
    name: String!
    gender: String
    place_of_birth: String
    movies: [Movie]
    movie_id: Int
  }

  # The "Query" type lists all the ways clients can query the GraphQL API and the return type for each
  # The "movie" query returns an array of zero or more Movie objects
  type Query {
    movies: [Movie!]!
    movie(id: Int): Movie!
    actors: [Actor!]!
    actor(id: Int): Actor!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };