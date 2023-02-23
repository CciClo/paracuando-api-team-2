const express = require('express');
const passport = require('passport');
const { getAllCities } = require('../controllers/cities.controller');

const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getAllCities
)

module.exports = router