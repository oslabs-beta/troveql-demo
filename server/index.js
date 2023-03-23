const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The TroveQLCache middleware function requires 2 arguments:
// (1) persistence value for the cache
// (2) your server's graphQL URL endpoint
const { TroveQLCache } = require('troveql');
const cache = new TroveQLCache(3000, 'http://localhost:4000/graphql');
app.use('/troveql', 
  cache.queryCache,
  (req, res) => res.status(200).json(res.locals.value)
);

const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

app.use('/graphql', 
  graphqlHTTP({
    schema: schema, 
    rootValue: resolvers,
    // context: {},
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`));
