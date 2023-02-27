const models = require('../database/models');

class PublicationsTgsServices {
  constructor () {}

  async createWithBulk (body) {
    const transaction = await models.sequelize.transaction();
    console.log(body);

    try {
      let publicationTag = await models.PublicationsTags.bulkCreate(
        body,
        { transaction }
      )

      await transaction.commit()
      return publicationTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = PublicationsTgsServices;