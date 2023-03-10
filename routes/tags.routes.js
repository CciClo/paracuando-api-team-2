const express = require('express');
const passport = require('passport');
const { getAllTags, createTags, getTagById, updateTagById, deleteTagById, uploadImageTag } = require('../controllers/tags.controller');
const { checkRole } = require('../middlewares/checkRole');
const { multerTagsPhotos } = require('../middlewares/multer.middleware');

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  getAllTags
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  createTags
)

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  getTagById
)

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  updateTagById
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  deleteTagById
)

router.post('/:id/add-image',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  multerTagsPhotos.array('image', 1),
  uploadImageTag
)

module.exports = router