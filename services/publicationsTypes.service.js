const { Op } = require('sequelize')
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class PublicationsTypesService {
  constructor () {
  }

  async getAllPublicationsTypes(query) {
    const options = {
      where: {},
    }

    const {limit, offset } = query;
    if(limit &&  offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const {id} = query;
    if(id) {
      options.where.id = id
    }

    const { name } = query
    if(name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    options.distinct = true
    const types = await models.Publications_types.findAndCountAll(options);
    return types;
  }

  async getPublicationTypeByName (name) {
    const result = await models.Publications_types.findOne({where: {name}});
    if(!result) throw new CustomError('Not found type ', 404, 'Not found');
    return result ;
  }

  async getPublicationTypeById(id) {
    const result  = await models.Publications_types.findByPk(id, {raw: true});
    if(!result) throw new CustomError('Not found type ', 404, 'Not found');
    return result
  }

  async updatePublicationsType(id, body) {
    const transaction = await models.sequelize.transaction();
    try {
      let result = await models.Publications_types.findByPk(id);
      if(!result) throw new CustomError('Not found type ', 404, 'Not found');
      let updateResult = await result.update(body, {transaction})
      await transaction.commit()
      return updateResult;
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = PublicationsTypesService;