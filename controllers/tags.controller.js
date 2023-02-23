const TagsService = require('../services/tags.service');
const { getPagination, getPagingData } = require('../utils/helpers');
const tagsService = new TagsService();


const getAllTags = async (request, response, next) => {
  try {
    let query = request.query;
    const {page, size} =query;
    const {limit, offset} = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;
    
    const tags = await tagsService.findAndCount(query);
    const result = getPagingData(tags, page, limit)
    return response.json({results: result});
  } catch (error) {
    next(error)
  }
};

const createTags = async (request, response, next) => {
  try {
    const body = request.body;
    const tag = await tagsService.createTag(body)
    response.json({message: 'Tag Added'})
  } catch (error) {
    next(error)
  }
}

const getTagById = async (request, response, next) => {
  try {
    const {id} = request.params;
    const tag = await tagsService.getTagById(id);
    response.json(tag)
  } catch (error) {
    next(error)
  }
}

const updateTagById = async (request, response, next) => {
  try {
    const {id} = request.params
    const body = request.body;
    const result = await tagsService.updateTagById(id, body)
    response.json({ message: 'Succes Update'})
  } catch (error) {
    next(error)
  }
};

const deleteTagById = async (request, response, next) => {
  try {
    const {id} = request.params
    const result = await tagsService.removeTag(id);
    response.json({
      'message': 'Tag Removed',
    })
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
}