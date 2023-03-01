const models = require("../database/models");
const { Op } = require("sequelize");
const { CustomError } = require("../utils/helpers");

class UsersTagsService {
  constructor() {}

  async createTag(body) {
    const transaction = await models.sequelize.transaction();
    try {
      let newTag = await models.UsersTags.create(body, { transaction });

      await transaction.commit();
      return newTag;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeTag(tag_id) {
    const transaction = await models.sequelize.transaction();
    try {
      let userRemoveTag = await models.UsersTags.findOne({ where: { tag_id } });

      if (!userRemoveTag)
        throw new CustomError("Not found User Tag", 404, "Not Found");

      await userRemoveTag.destroy({ transaction });

      await transaction.commit();

      return userRemoveTag;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = UsersTagsService;
