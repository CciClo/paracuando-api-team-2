const express = require('express');
const passport = require('passport');
const { getAllCountries } = require('../controllers/countries.controller');

const router = express.Router();


router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getAllCountries
)

module.exports = router