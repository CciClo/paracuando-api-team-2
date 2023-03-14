const express = require('express');
const passport = require('passport');
const {
  findUserById,
  updateUserById,
  getAllUserAdmin,
  getUserAllVotes,
  getUserAllPublications,
  uploadImageUser,
  removeImageUser,
} = require('../controllers/users.controller');
const {
  createUserTag,
  removeUserTag,
} = require('../controllers/usersTags.controller');
const { checkRole } = require('../middlewares/checkRole');
const { multerUsersPhotos } = require('../middlewares/multer.middleware');
const {
  verifyTheSameUser,
} = require('../middlewares/verifyTheSameUser.middleware');
const router = express.Router();
const verifySchema = require('../schemas/joiSchema.checker');
const { updatedUserSchema } = require('../schemas/users.schemas');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  getAllUserAdmin
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  checkRole,
  findUserById
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  verifySchema(updatedUserSchema, 'body'),
  updateUserById
);

router.get(
  '/:id/votes',
  passport.authenticate('jwt', { session: false }),
  getUserAllVotes
);

router.get(
  '/:id/publications',
  passport.authenticate('jwt', { session: false }),
  getUserAllPublications
);

router.post(
  '/:id/add-interest',
  passport.authenticate('jwt', { session: false }),
  createUserTag
);

router.delete(
  '/:id/remove-interest',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  removeUserTag
);

router.post('/:id/add-image',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  multerUsersPhotos.array('image', 1),
  uploadImageUser
);

router.delete('/:id/remove-image',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  checkRole,
  removeImageUser,
)

module.exports = router;
