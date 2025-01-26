const db = require('../db/queries');

async function getDevelopers(req, res) {
  const developers = await db.getDevelopersQ();
  res.render('developers', {developers: developers});
}

async function getDeveloperById(req, res) {
  const developer_id = req.params.developer_id;
  const developer = await db.getDeveloperByIdQ(developer_id);
  const games = await db.getGamesFromDeveloperQ(developer_id);
  res.render('developer', {developer : developer, games : games});
}

module.exports = {
  getDevelopers,
  getDeveloperById
}