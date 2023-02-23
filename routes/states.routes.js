const express = require('express');
const passport = require('passport');
const { getAllStates } = require('../controllers/states.controller');
const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getAllStates
)

module.exports = router