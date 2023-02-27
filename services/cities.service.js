
const { Op } = require('sequelize');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class CitiesService {
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

    const states = await models.Cities.findAndCountAll(options)
    return states
  }

  async getCityByName (name) {
    const result = await models.Cities.findOne({where: {name}});
    if(!result) throw new  CustomError('Not found city ', 404, 'Not found');
    return result;
  }


}

module.exports = CitiesService;