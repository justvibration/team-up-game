'use strict';
module.exports = function (app) {
  let gameController = require('../controllers/game-controller');

  // todoList Routes
  app.route('/game')
    .get(gameController.get_game)
};
