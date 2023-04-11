// const express = require('express');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Declare/import typescript tyeps 
import { Request, Response, NextFunction} from 'express';

type ServerError = {
  log: string,
  status: number,
  message: { err: string },
};


// The TroveQLCache middleware function requires 2 arguments with an addition 2 optional arguments:
// (1) size for the cache
// (2) your server's graphQL URL endpoint
// (3) optional - boolean for if you want to use TM (defaults to false but if 'true' will need to add /trovemetrics route too)
// (4) optional - object where the key is the name of your graphQL mutation query and the value is a string of the object Type it mutates
const { TroveQLCache } = require('troveql');
const mutations = { 
  createMovie: 'movie',
  deleteMovie: 'movie'
};
const cache = new TroveQLCache(5, 'http://localhost:4000/graphql', true, mutations);
app.use('/troveql', 
  cache.queryCache,
  (req: Request, res: Response) => res.status(200).json(res.locals.value)
);
//do we want to just add the troveMetrics middleware to the /troveql endpoint?
app.use('/trovemetrics', 
  cache.troveMetrics,
  (req: Request, res: Response) => res.status(200).json(res.locals.message)
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

app.use('/', (err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})


app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`));
