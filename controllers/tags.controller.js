const { uploadFile } = require('../libs/aws3');
const TagsService = require('../services/tags.service');
const { getPagination, getPagingData, CustomError } = require('../utils/helpers');
const tagsService = new TagsService();
const uuid = require('uuid');
const fs = require('fs');
const util = require('util');
const sharp = require('sharp');

const unlinkFile = util.promisify(fs.unlink);

const getAllTags = async (request, response, next) => {
  try {
    let query = request.query;
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;

    const tags = await tagsService.findAndCount(query);
    const result = getPagingData(tags, page, limit)
    return response.json({ results: result });
  } catch (error) {
    next(error)
  }
};

const createTags = async (request, response, next) => {
  try {
    const body = request.body;
    const tag = await tagsService.createTag(body)
    response.json({ message: 'Tag Added' })
  } catch (error) {
    next(error)
  }
}

const getTagById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const tag = await tagsService.getTagById(id);
    response.json(tag)
  } catch (error) {
    next(error)
  }
}

const updateTagById = async (request, response, next) => {
  try {
    const { id } = request.params
    const body = request.body;
    const result = await tagsService.updateTagById(id, body)
    response.json({ message: 'Succes Update' })
  } catch (error) {
    next(error)
  }
};

const deleteTagById = async (request, response, next) => {
  try {
    const { id } = request.params
    const result = await tagsService.removeTag(id);
    response.json({
      'message': 'Tag Removed',
    })
  } catch (error) {
    next(error)
  }
}


const uploadImageTag = async (request, response, next) => {
  try {
    const { id: idUser } = request.params
    const files = request.files;
    if (files.length && files.length < 2) {
      let imagesKeys = []
      await Promise.all(files.map(async (file) => {
        const idImage = uuid.v4()
        let imageName = `tag-image-${idUser}-${idImage}`
        const fileResize = await sharp(file.path)
          .resize({ height: 1920, width: 1080, fit: 'contain' })
          .toBuffer()
        await uploadFile(fileResize, imageName, file.mimetype)
        let newImageTag = await tagsService.addImage(imageName, idUser)
        imagesKeys.push(newImageTag.image_url)
      }))
      await Promise.all(files.map(async (file) => {
        await unlinkFile(file.path)
      }))
      return response.json({ results: { message: 'Image Added', images: imagesKeys } })
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getAllTags,
  createTags,
  getTagById,
  updateTagById,
  deleteTagById,
  uploadImageTag,
}