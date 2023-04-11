"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express = require('express');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var cors = require('cors');
var app = express();
var PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The TroveQLCache middleware function requires 2 arguments with an addition 2 optional arguments:
// (1) size for the cache
// (2) your server's graphQL URL endpoint
// (3) optional - boolean for if you want to use TM (defaults to false but if 'true' will need to add /trovemetrics route too)
// (4) optional - object where the key is the name of your graphQL mutation query and the value is a string of the object Type it mutates
var TroveQLCache = require('troveql').TroveQLCache;
var mutations = {
    createMovie: 'movie',
    deleteMovie: 'movie'
};
var cache = new TroveQLCache(5, 'http://localhost:4000/graphql', true, mutations);
app.use('/troveql', cache.queryCache, function (req, res) { return res.status(200).json(res.locals.value); });
//do we want to just add the troveMetrics middleware to the /troveql endpoint?
app.use('/trovemetrics', cache.troveMetrics, function (req, res) { return res.status(200).json(res.locals.message); });
var schema = require('./schema').schema;
var resolvers = require('./resolvers').resolvers;
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    // context: {},
    graphiql: true
}));
app.use('/', function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () { return console.log("Express Server ready at http://localhost:".concat(PORT)); });
