const models = require('../database/models');
const { CustomError } = require('../utils/helpers');
const uuid = require('uuid');
const sharp = require('sharp');
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/aws3')


class ImagesPublicationsService {
  constructor() { }

  async publicationImagesExist(id) {
    const result = await models.Publications.findByPk(id/*, { attributes: { include: ['id'] } } */);

    if (!result) throw new CustomError('Not found publications', 404, 'not found');
    return result;
  }

  async createImage(image, idPublication, order) {
    const transaction = await models.sequelize.transaction();
    const imageBody = { image_url: image, publication_id: idPublication, order: order }
    try {
      let imageCreated = await models.PublicationsImages.create(
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

  async canUploadImages(idPublication) {
    const result = await models.PublicationsImages.findAll({ where: { publication_id: idPublication }, raw: true });
    if (result.length > 3) throw new CustomError('Image limit', 400, 'Bad Request');
    return (3 - result.length);
  }

  async updateOrderImages(order, publicationId) {

    let images = await models.PublicationsImages.findAll({ where: { publication_id: publicationId } });

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

    images.sort((a, b) => a.order - b.order);
    const transaction = await models.sequelize.transaction();
    try {
      if (!images[actual_index]) throw new CustomError(`Not found image in actual order ${actual_order}`, 404, 'not found');
      if (!images[next_index]) throw new CustomError(`Not found image in next order ${next_order}`, 404, 'not found');

      [images[actual_index].order, images[next_index].order] = [images[next_index].order, images[actual_index].order];

      await Promise.all(images.map(image => image.save({ transaction })));
      await transaction.commit();
      return images
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(order, idPublication) {
    const images = models.PublicationsImages.findOne({ where: { publication_id: idPublication, order: order } });

    if (!images) throw new CustomError(`Not found image in order ${order}`, 404, 'not found');
    return images
  }

  async removeImage(idPublication, order) {
    const transaction = await models.sequelize.transaction()
    try {
      let image = await models.PublicationsImages.findOne({ where: { publication_id: idPublication, order } });
      if (!image) throw new CustomError('Not found image', 404, 'Not Found');
      await image.destroy({ transaction });
      await transaction.commit();
      return image;
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }

}

module.exports = ImagesPublicationsService;