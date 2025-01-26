const db = require('../db/queries');

function getIndex(req, res) {
  res.render('index');
}

module.exports = {
  getIndex
}