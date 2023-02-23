const express = require('express');
const passport = require('passport');
const { getAllTags, createTags, getTagById, updateTagById, deleteTagById } = require('../controllers/tags.controller');
const { checkRole } = require('../middlewares/checkRole');

const router = express.Router();

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  getAllTags
)

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRole,
  createTags
)

router.get('/:id', 
  passport.authenticate('jwt', {session: false}),
  getTagById
)

router.put('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole,
  updateTagById
)

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRole,
  deleteTagById
)

module.exports = router