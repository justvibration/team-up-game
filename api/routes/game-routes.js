'use strict';
module.exports = function (app) {
  let gameController = require('../controllers/game-controller');

  // todoList Routes
  app.route('/home')
    .get(gameController.get_home_page)
};
