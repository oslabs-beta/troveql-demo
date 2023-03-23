const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // add middleware function for use of TroveQL cache
// app.use('/', 
//   (req, res) => res.status(200).send('Welcome to the Express Server!')
// );

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

// add middleware function for use of TroveQL cache
app.use('/', 
  (req, res) => res.status(200).json('Welcome to the Express Server!')
);

app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`));
