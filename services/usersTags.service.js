const models = require("../database/models");
const { Op } = require("sequelize");
const { CustomError } = require("../utils/helpers");

class UsersTagsService {
  constructor() {}

  async createTag({ body }) {
    const transaction = await models.sequelize.transaction();
    try {
      let newTag = await models.Tags.create(
        {
          name,
        },
        { transaction }
      );

      await transaction.commit();
      return newTag;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UsersTagsService;
