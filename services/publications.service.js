const { Op, cast, literal } = require('sequelize');
const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');
const PublicationsTgsServices = require('./publicationsTags.service');
const VotesServices = require('./votes.service');
const publicationsTgsService = new PublicationsTgsServices();
const votesService = new VotesServices()


class PublicationsServices {
  constructor() { }

  async findAndCount(query) {

    const options = {
      where: {},
      attributes: {
        include: [
          [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
        ]
      },
      include: [
        { model: models.Users, as: 'user', attributes: ['id', 'first_name'] },
        {
          model: models.PublicationsTags,
          as: 'tags',
          attributes: ['id'],
          include: {
            model: models.Tags,
            as: 'tag',
            attributes: ['id', 'name']
          }
        },
      ]
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

    const { user_id } = query
    if (user_id) {
      options.where.user_id = user_id
    }

    const { title } = query
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` }
    }

    const { created_at } = query;
    if (created_at) {
      options.where.created_at = { [Op.iLike]: `%${created_at}%` };
    }

    options.distinct = true

    const publications = await models.Publications.scope('view_public').findAndCountAll(options);
    if (!publications) throw new CustomError('Not found publications', 404, 'not found')
    return publications
  }

  async create(user, body) {
    const transaction = await models.sequelize.transaction();
    body.user_id = user.id;
    body.id = uuid4();
    let { tags: tags2 } = body;

    try {
      let publication = await models.Publications.create(
        body,
        { transaction }
      )

      await transaction.commit()

      let tags = [];
      for (let i of tags2) {
        tags.push(
          {
            tag_id: i,
            publication_id: publication.id
          }
        )
      }

      const responseTag = await publicationsTgsService.createWithBulk(tags)
      const responseVote = await votesService.create({publication_id: publication.id, user_id: user.id})
      return publication;

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getPublicationById(id) {
    const result = await models.Publications.scope('view_detail').findByPk(id,
      {
        attributes: {
          include: [
            [cast(literal(`(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")`), 'integer'), 'votes_count']
          ]
        },
        include: [
          { model: models.Users, as: 'user', attributes: ['id', 'first_name'] },
          {
            model: models.Cities,
            as: 'cities',
            attributes: { exclude: ['created_at', 'updated_at'] }
          },
          {
            model: models.Publications_types,
            as: 'publication_type',
            attributes: ['id', 'name']
          },
          {
            model: models.PublicationsTags,
            as: 'tags',
            attributes: ['id'],
            include: {
              model: models.Tags,
              as: 'tag',
              attributes: ['id', 'name']
            }
          },
          {
            model: models.Votes,
            as: 'votes',
            // include: {
            //   model: models.Users, as: 'user', attributes: ['id', 'first_name']
            // }
            // attributes: [
            //   [literal(`(
            //     SELECT COUNT(*)
            //     FROM "votes" v 
            //     WHERE v."publication_id" = "Publications"."id"
            //   )`), 'count'],
            //   'id','publication_id','user_id'
            // ]
          },
        ]
      }
    )
    if (!result) throw new CustomError('Not found publication', 404, 'Not found');
    return result
  }

  async removePublicationById (id) {
    const transaction = await models.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id,
        {
          include: [
            { model: models.Votes, as: 'votes' },
            {
              model: models.PublicationsTags,
              as: 'tags',
            },
          ],
        }
      )
      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

      // Eliminar todos los votos y tags asociados a la publicación
      await Promise.all(publication.votes.map(async vote => await vote.destroy({ transaction })))
      await Promise.all(publication.tags.map(async tag => await tag.destroy({ transaction })))
      // Eliminar la publicación
      await publication.destroy({ transaction })

      await transaction.commit()

      return publication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = PublicationsServices;