// const express = require('express');
const express = require('express');
const { graphqlHTTP } = require("express-graphql");
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


// The TroveQLCache middleware function requires 2 arguments:
// (1) persistence value for the cache
// (2) your server's graphQL URL endpoint
const { TroveQLCache } = require('troveql');
const cache = new TroveQLCache(3000, 'http://localhost:4000/graphql');
app.use('/troveql', 
  cache.queryCache,
  (req: Request, res: Response) => res.status(200).json(res.locals.value)
);

import { schema } from './schema';
import { resolvers } from './resolvers';

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
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})


app.listen(PORT, () => console.log(`Express Server ready at http://localhost:${PORT}`));
