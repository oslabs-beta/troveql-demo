"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express = require('express');
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var cors = require('cors');
var app = express();
var PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// The TroveQLCache middleware function requires 2 arguments:
// (1) persistence value for the cache
// (2) your server's graphQL URL endpoint
var TroveQLCache = require('troveql').TroveQLCache;
var cache = new TroveQLCache(3000, 'http://localhost:4000/graphql');
app.use('/troveql', cache.queryCache, function (req, res) { return res.status(200).json(res.locals.value); });
var schema_1 = require("./schema");
var resolvers_1 = require("./resolvers");
app.use('/graphql', graphqlHTTP({
    schema: schema_1.schema,
    rootValue: resolvers_1.resolvers,
    // context: {},
    graphiql: true
}));
app.use('/', function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () { return console.log("Express Server ready at http://localhost:".concat(PORT)); });
