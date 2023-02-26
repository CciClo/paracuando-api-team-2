const express = require('express');
const passport = require('passport');
const { getAllPublications } = require('../controllers/publications.controller');
const router = express.Router();
// passport.authenticate('jwt', { session: false }),

router.get('/', getAllPublications); /// falta hacer tablas y modelos


module.exports = router;