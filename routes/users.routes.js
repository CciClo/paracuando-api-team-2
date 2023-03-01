const express = require("express");
const passport = require("passport");
const {
  findUserById,
  updateUserById,
  getAllUserAdmin,
  getUserAllVotes,
} = require("../controllers/users.controller");
const { checkRole } = require("../middlewares/checkRole");
const {
  verifyTheSameUser,
} = require("../middlewares/verifyTheSameUser.middleware");
const router = express.Router();
const verifySchema = require("../schemas/joiSchema.checker");
const { updatedUserSchema } = require("../schemas/users.schemas");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRole,
  getAllUserAdmin
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyTheSameUser,
  checkRole,
  findUserById
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyTheSameUser,
  verifySchema(updatedUserSchema, "body"),
  updateUserById
);

router.get(
  "/:id/votes",
  passport.authenticate("jwt", { session: false }),
  getUserAllVotes
);

module.exports = router;
