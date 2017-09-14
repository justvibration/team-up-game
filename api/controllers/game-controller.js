'use strict';

exports.get_game = function (req, res) {
  res.sendFile(__dirname + '../../index.html');
  // res.json("Hello World");
};
