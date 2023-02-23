const { Op } = require('sequelize');
const {v4: uuid4} = require('uuid');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class TagsService {
  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { id } = query
    if (id) {
      options.where.id = id
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    options.distinct = true

    const states = await models.Tags.findAndCountAll(options)
    return states
  }

  async createTag(body ) {
    const transaction = await models.sequelize.transaction()
    try {
      body.id = uuid4()
      //   body.created_at = new Date()
      //   body.updated_at = new Date()
      console.log(body);

      let newTag = await models.Tags.create(
        body, { transaction /*, fields: ['id','name', 'description', 'image_url'] */ })

      await transaction.commit()
      return newTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getTagById(id) {
    const result = models.Tags.findByPk(id);
    if(!result) throw new CustomError('Not found tag ', 404, 'Not found');
    return result;
  }

  async updateTagById(id, body) {
    const transaction = await models.sequelize.transaction();
    try {
      let result = await models.Tags.findByPk(id);
      if(!result) throw new CustomError('Not found tag ', 404, 'Not found');
      let updateResult = await result.update(body, {transaction})
      await transaction.commit()
      return updateResult;
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTag(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let tag = await models.Tags.findByPk(id)
      if (!tag) throw new CustomError('Not found user', 404, 'Not Found')
      await tag.destroy({ transaction })
      await transaction.commit()
      return tag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


}

module.exports = TagsService;