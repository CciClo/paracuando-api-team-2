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
      {
        model: models.Cities, 
        as:'cities',
        attributes: { exclude: ['created_at', 'updated_at']}
      },
      {
        model: models.Votes, 
        as:'votes',
        include: {
          model: models.Users, as: 'user', attributes: ['id', 'first_name']
        }
      },
      {
        model: models.Publications_types, 
        as:'publication_type',
        attributes: ['id', 'name']
      },
      {
        model: models.PublicationsTags,
        as: 'tags',
        include: {
          model: models.Tags,
          as: 'tag'
        }
      },
    ]
    
    const publications = await models.Publications.scope('view_public').findAndCountAll(options);
    if(!publications) throw new CustomError('Not found publications', 404, 'not found')
    return publications
  }
}

module.exports = PublicationsServices;