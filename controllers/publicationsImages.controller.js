const ImagesPublicationsService = require('../services/publicationsImages.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/aws3')
const sharp = require('sharp')
const { CustomError } = require('../utils/helpers')


const unlinkFile = util.promisify(fs.unlink)

const imagesPublicationsService = new ImagesPublicationsService()


const uploadImagePublication = async (request, response, next) => {
  const { id: idPublication } = request.params
  const files = request.files;
  const { isAdmin, isSameUser } = request.user;

  try {

    if (isAdmin || isSameUser) {

      if (files.length) {
        let imagesKeys = []
        await imagesPublicationsService.publicationImagesExist(idPublication)
        await imagesPublicationsService.canUploadImages(idPublication);
        response.json({ message: 'esta' })

        let order = 1
        await Promise.all(files.map(async (file) => {

          const idImage = uuid.v4()
          let imageName = `publications-images-${idPublication}-${idImage}`
          const fileResize = await sharp(file.path)
            .resize({ height: 1920, width: 1080, fit: 'contain' })
            .toBuffer()

          await uploadFile(fileResize, imageName, file.mimetype)

          let newImagePublication = await imagesPublicationsService.createImage(imageName, idPublication, order)
          order++
          imagesKeys.push(newImagePublication.image_url)
        }))
        await Promise.all(files.map(async (file) => {
          await unlinkFile(file.path)
        }))
        return response
          .status(200)
          .json({ results: { message: 'success upload', images: imagesKeys } });

      } else {
        throw new CustomError('Images were not received', 404, 'Not Found')
      }
    }

    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized');
  } catch (error) {
    if (files) {
      await Promise.all(files.map(async (file) => {
        await unlinkFile(file.path)
      }))
    }
    next(error)
  }

}

const destroyImageByPublication = async (request, response, next) => {
  try {
    const { isAdmin, isSameUser } = request.user;
    const { order, id } = request.params;
    if (isAdmin || isSameUser) {
      let imagePublication = await imagesPublicationsService.getImageOr404(order, id)
      await deleteFile(imagePublication.image_url)
      await imagesPublicationsService.removeImage(imagePublication.id)
      return response.status(200).json({ message: 'Image Deleted', idPublication: imagePublication.publication_id, image_order: imagePublication.order })
    }
    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized');
  } catch (error) {
    next(error)
  }
}

const destroyAllImagesByPublication = async (request, response, next) => {
  try {
    let imagesPublications = []
    const { idPublication } = request.params
    let imagesPublication = await imagesPublicationsService.getImageByPublicationIdOr404(idPublication)
    await Promise.all(imagesPublication.map(async (imagePublication) => {
      await deleteFile(imagePublication.image_url)
      await imagesPublicationsService.removeImage(imagePublication.id)
      imagesPublications.push({ idPublication: imagePublication.publication_id, idImage: imagePublication.id })
    }))
    return response.status(200).json({ message: 'Images Deleted', imagesPublications })
  } catch (error) {
    next(error)
  }
}

const getUrlAllImagesByPublication = async (request, response, next) => {
  try {
    const { idPublication } = request.params;
    const imagesPublication = await imagesPublicationsService.getImagesByPublicationsOr404(idPublication)

    const imgPublications = await Promise.all(imagesPublication.map(async (imagePublication) => {
      let imageURL = await getObjectSignedUrl(imagePublication.image_url)
      imagePublication.image_url = imageURL
      return imagePublication
    }))

    return response.status(200).json({ images: imgPublications })
  } catch (error) {
    next(error)
  }
}

const getFileImageByPublication = async (request, response, next) => {
  try {
    const { idImage } = request.params
    let imagePublication = await imagesPublicationsService.getImageOr404(idImage)
    const readStream = await getFileStream(imagePublication.image_url)
    readStream
      .on('error', (e) => {
        next(e)
      })
      .pipe(response.status(200))
  } catch (error) {
    next(error)
  }
}

const updateImage = async (request, response, next) => {
  try {
    const body = request.body;
    const { id } = request.params;
    const { isSameUser } = request.user;
    if (isSameUser) {
      const result = await imagesPublicationsService.updateOrderImages(body, id);
      return response.json({
        message: 'has been successfully updated'
      })
    }
    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized');
  } catch (error) {
    next(error)
  }
};

module.exports = {
  uploadImagePublication,
  destroyImageByPublication,
  destroyAllImagesByPublication,
  getUrlAllImagesByPublication,
  getFileImageByPublication,
  updateImage,
}