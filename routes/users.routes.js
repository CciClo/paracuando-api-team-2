const express = require('express');
const passport = require('passport');
const { findUserById, updateUserById, getAllUserAdmin } = require('../controllers/users.controller');
const { checkRole } = require('../middlewares/checkRole');
const { verifyTheSameUser } = require('../middlewares/verifyTheSameUser.middleware');
const router = express.Router();


router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  getAllUserAdmin
)

router.get('/:id', 
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  checkRole,
  findUserById,
);


router.put('/:id', 
  passport.authenticate('jwt', {session: false}),
  verifyTheSameUser,
  updateUserById
);

module.exports = router;