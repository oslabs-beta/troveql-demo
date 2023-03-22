const { buildSchema } = require("graphql");

// Clients can execute a query named movies and the server will return an array of zero or more Movies
//will need to add Mutations whenever we're ready...
const typeDefs = `#graphql
  # "Movie" is a type that lets clients query the API by movie title (required)
  type Movie {
    id: ID
    movie_id: Int!
    title: String!
    vote_average: Float
    vote_count: Int
  }

  # The "Query" type lists all the ways clients can query the GraphQL API and the return type for each
  # The "movie" query returns an array of zero or more Movie objects
  type Query {
    movies: [Movie!]!
  }
`;

const schema = buildSchema(typeDefs);

module.exports = { schema };