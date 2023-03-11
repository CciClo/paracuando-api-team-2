const { Op } = require('sequelize');
const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class VotesServices {
  constructor() { }

  async findAndCount(query) {
    const options = {
      where: {},
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { id } = query;
    if (id) {
      options.where.id = id;
    }

    const { user_id } = query;
    if (user_id) {
      options.where.user_id = user_id;
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true;

    const votes = await models.Votes.findAndCountAll(options);
    return votes;
  }

  async verifyVote(publication_id, user_id) {
    let vote = await models.Votes.findOne({ where: { publication_id, user_id }, });
    if (!vote) { await this.create({ publication_id, user_id }); return { message: 'Vote added' } }
    await this.removeVote(vote.id);
    return { message: 'Vote removed' };
  }

  async create(object) {
    const transaction = await models.sequelize.transaction();
    object.id = uuid4();

    try {
      let vote = await models.Votes.create(
        object,
        { transaction }
      )
      await transaction.commit()
      return vote;
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeVote(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let vote = await models.Votes.findByPk(id)

      if (!vote) throw new CustomError('Not found vote', 404, 'Not Found')

      await vote.destroy({ transaction })

      await transaction.commit()

      return vote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}


module.exports = VotesServices