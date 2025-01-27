const db = require('../db/queries');
const { query, body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const textLength = "must be between 5 to 1000 characters long";

const developerValidator = [
  body('developer_name').trim().isLength({min : 3, max : 30}).withMessage('Developer name must be between 3 to 30 characters long'),
  body('about').trim().isLength({min : 5, max : 1000}).withMessage( `About ${textLength}`)
]

const developerValidatorForUpdate = [
  body('developer_name').optional({values : 'falsy'}).trim().isLength({min : 3, max : 30}).withMessage('Developer name must be between 3 to 30 characters long'),
  body('about').trim().optional({values : 'falsy'}).isLength({min : 5, max : 1000}).withMessage( `About ${textLength}`),
  body().custom((_, {req}) => {
    if (!req.body.developer_name && !req.body.about)
    {
      throw new Error("At least one of the fields must be filled")
    }
    return true;
  })
]

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

createDeveloper = [
  developerValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      const developers = await db.getDevelopersQ();
      res.render('developers', {developers: developers, errors: errors.array()});    
      return;
    }
    await db.createDeveloperQ(req.body.developer_name, req.body.about);
    res.redirect('/developers');
  })
]

updateDeveloper = [
  developerValidatorForUpdate,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const developer_id = req.params.developer_id;
    const developer = await db.getDeveloperByIdQ(developer_id);
    if (!errors.isEmpty())
    {
      const games = await db.getGamesFromDeveloperQ(developer_id);
      res.render('developer', {developer : developer, games : games, errors : errors.array()});  
      return;  
    }
    const developer_name = (req.body.developer_name) ? req.body.developer_name : developer.name;
    const about = (req.body.about) ? req.body.about: developer.about;
    await db.updateDeveloperQ(developer_name, about, developer_id);
    res.redirect(`/developers/${req.params.developer_id}`)
  })
]

deleteDeveloper = [
  asyncHandler(async (req, res) => {
    await db.deleteDeveloperQ(req.params.developer_id)
    res.redirect('/developers')
  })
]

getDevelopers = asyncHandler(getDevelopers);
getDeveloperById = asyncHandler(getDeveloperById);

module.exports = {
  getDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
}