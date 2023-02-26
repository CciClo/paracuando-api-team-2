const { Op } = require('sequelize');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');


class PublicationsServices {
  constructor  () {}

  async getAllPublications (query) {

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
    options.include =[
      {model: models.Users, as:'author', attributes: ['id', 'first_name']},
      {model: models.Cities, as:'cities'},
      {model: models.Votes, as:'votes_'},
      {model: models.Publications_types, as:'publication_type'},
    ]
    
    const publications = await models.Publications.scope('view_public').findAndCountAll(options);
    if(!publications) throw new CustomError('Not found publications', 404, 'not found')
    return publications
  }
}

module.exports = PublicationsServices;