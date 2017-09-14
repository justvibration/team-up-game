'use strict';

let
  express = require('express'),
  app = express(),
  port = process.env.PORT = 3000,
  bodyParser = require('body-parser');

// hook up json parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// hook up middleware
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

// add routing
var routes = require('./api/routes/game-routes'); //importing route
routes(app); //register the route

// start server
app.listen(port);
console.info('Server listening on port', port, '...');
