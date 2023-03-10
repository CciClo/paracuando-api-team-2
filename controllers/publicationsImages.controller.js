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
  const { id } = request.params
  const files = request.files
  try {

    if (files.length) {
      let imagesKeys = []
      await imagesPublicationsService.publicationImagesExist(id)
      let order = 0
      await Promise.all(files.map(async (file) => {

        const imageName = uuid.v4()
        const fileResize = await sharp(file.path)
          .resize({ height: 1920, width: 1080, fit: 'contain' })
          .toBuffer()

        await uploadFile(fileResize, imageName, file.mimetype)

        let newImagePublication = await imagesPublicationsService.createImage(imageName, id, order)
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
    const { idImage } = request.params;
    let imagePublication = await imagesPublicationsService.getImageOr404(idImage)
    await deleteFile(imagePublication.image_url)
    await imagesPublicationsService.removeImage(idImage)
    return response.status(200).json({ message: 'Image Deleted', idPublication: imagePublication.publication_id, idImage: idImage })
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
    const result = await imagesPublicationsService.updateOrderImages(body, id);
    response.json({
      message: 'has been successfully updated'
    })
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