const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers } = require('./resolvers');

// Clients can execute a query named movies and the server will return an array of zero or more Movies
//will need to add Mutations whenever we're ready...
const typeDefs = `#graphql
  # "Movie" is a type that lets clients query the API by movie title (required)
  type Movie {
    id: ID!
    title: String!
    genre: String
    year: Int
    actors: [Actor]
  }

  type Actor {
    id: ID!
    name: String!
    gender: String
    place_of_birth: String
    movies: [Movie]
  }

  # The "Query" type lists all the ways clients can query the GraphQL API and the return type for each
  # The "movie" query returns an array of zero or more Movie objects
  type Query {
    movies: [Movie!]!
    movie(id: ID): Movie!
    actors: [Actor!]!
  }

  type Mutation {
    createMovie(title: String!): Movie!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };

// type MovieInput {
//   title: String!
// }

