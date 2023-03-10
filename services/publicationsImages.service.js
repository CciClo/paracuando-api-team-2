const models = require('../database/models');
const { CustomError } = require('../utils/helpers');
const uuid = require('uuid');
const sharp = require('sharp');
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/aws3')


class ImagesPublicationsService {
  constructor() { }

  async publicationImagesExist(idPublication) {
    const result = await models.Publications.findByPk(idPublication);

    if (!result) throw new CustomError('Not found publications', 404, 'not found');
    return result
  }

  async createImage(image, idPublication, order) {
    const transaction = await models.sequelize.transaction();
    const imageBody = { image_url: image, publication_id: idPublication, order }
    try {
      let imageCreated = await models.Publications.create(
        imageBody,
        { transaction }
      )
      await transaction.commit()

      return imageCreated;

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateOrderImages(order, publicationId) {

    const publication = await models.Publications.findByPk(publicationId,
      {
        include: [
          { model: models.PublicationsImages, as: 'images' },
        ],
      }
    )

    let images = publication.images;

    // console.log(images);
    let actual_order = order.actual_order;
    let next_order = order.next_order;

    let actual_index, next_index;
    for (let i = 0; i < images.length; i++) {
      if (images[i].order == actual_order) {
        actual_index = i;
      } else if (images[i].order == next_order) {
        next_index = i;
      }
    }
    /*

    // Eliminar los objetos con los valores de 'order' correspondientes
    let actual_image = images.splice(actual_index, 1)[0];
    let next_image = next_index > actual_index ? images.splice(next_index - 1, 1)[0] : images.splice(next_index, 1)[0];

    // Insertar los objetos en el nuevo orden en los índices correctos en el array
    images.splice(0, 0, actual_image);
    images.splice(next_index > actual_index ? actual_index + 1 : next_index, 0, next_image);
    */

    if (!images[actual_index]) throw new CustomError(`Not found image in actual order ${actual_order}`, 404, 'not found');
    if (!images[next_index]) throw new CustomError(`Not found image in next order ${next_order}`, 404, 'not found');
    images[actual_index].order = next_order;
    images[next_index].order = actual_order;

    images.sort((a, b) => a.order - b.order);
    const transaction = await models.sequelize.transaction();
    try {
      await Promise.all(images.map(async (image) => {

        await models.PublicationsImages.updated(image, { transaction })
      }));

      await transaction.commit()
      return images
    } catch (error) {
      await transaction.rollback()
      throw error
    }

  }

}

module.exports = ImagesPublicationsService;