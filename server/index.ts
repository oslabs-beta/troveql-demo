import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
const PORT = 4000;

// Clients can execute a query named movies and the server will return an array of zero or more Movies
const typeDefs = `#graphql
  # "Movie" is a type that lets clients query the API by movie title (required)
  type Movie {
    title: String!
    director: String
  }

  # The "Query" type lists all the ways clients can query the GraphQL API and the return type for each
  # The "movie" query returns an array of zero or more Movie objects
  type Query {
    movies: [Movie]
  }
`;

// Resolvers describe what the server returns to the client for a specific query
const resolvers = {
  Query: {
    movies: () => {
      // use Prisma to GET all movies from db? - hardcoded for now...
      return [
        {title: 'Titanic', director: 'James Cameron'}, 
        {title: 'Jurassic Park', director: 'Steven Spielberg'}, 
        {title: 'Harry Potter', director: 'Chris Columbus'}
      ];
    }
  }
};

// Start an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// The following: 
//(1) creates an Express app
//(2) installs your ApolloServer instance as middleware
//and (3) prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});
console.log(`ApolloServer ready at: ${url}`);