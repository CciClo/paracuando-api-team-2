const express = require('express');
const passport = require('passport');
const { checkRole } = require('../middlewares/checkRole')
const { getPublicationsTypes, getPublicationTypeById, upPublicationTypeById } = require('../controllers/publicationsTypes.controller');

const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getPublicationsTypes
);

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  getPublicationTypeById
);

router.put('/:id', 
  passport.authenticate('jwt', {session: false}),
  checkRole,
  upPublicationTypeById
)

module.exports = router;