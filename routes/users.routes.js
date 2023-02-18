const express = require('express');
const { findUserById, updateUserById } = require('../controllers/users.controller');
const router = express.Router();


router.get('/:id', findUserById);
router.put('/:id', updateUserById);

module.exports = router;