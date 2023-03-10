const express = require('express');
const passport = require('passport');
const verifySchema = require('../schemas/joiSchema.checker')

const { getAllPublications, createPublication, getPublicationById, deletePublicationById } = require('../controllers/publications.controller');
const { createPublicationSchema } = require('../schemas/publications.schemas');
const { verifyTheSameUser } = require('../middlewares/verifyTheSameUser.middleware');
const { checkRole } = require('../middlewares/checkRole');
const { createVote } = require('../controllers/votes.controller');
const { multerPublicationsPhotos } = require('../middlewares/multer.middleware');
const { uploadImagePublication, updateImage } = require('../controllers/publicationsImages.controller');
const router = express.Router();
// passport.authenticate('jwt', { session: false }),

router.get('/', getAllPublications);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  verifySchema(createPublicationSchema, 'body'),
  createPublication,
);

router.get('/:id', getPublicationById);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  verifyTheSameUser,
  checkRole,
  deletePublicationById
);

router.post('/:id/vote',
  passport.authenticate('jwt', { session: false }),
  createVote
)

router.post('/:id/add-image',
  // passport.authenticate('jwt', { session: false }),
  // verifyTheSameUser,
  // checkRole,
  multerPublicationsPhotos.array('images', 3), // cambiar a images
  uploadImagePublication,
)

router.put('/:id/image-order',
  // passport.authenticate('jwt', { session: false }),
  // verifyTheSameUser,
  updateImage
)

router.delete('/:id/remove-image/:order',
  // passport.authenticate('jwt', { session: false }),
  // verifyTheSameUser,
  // checkRole,

)

module.exports = router;