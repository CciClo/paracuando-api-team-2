const express = require('express');
const passport = require('passport');
const { getAllRoles } = require('../controllers/roles.controller');
const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getAllRoles
)

module.exports = router;