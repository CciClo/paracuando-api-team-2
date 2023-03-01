/** @format */

const UsersTagsServices = require('../services/usersTags.service');
const { CustomError } = require('../utils/helpers');
const UserTagsService = new UsersTagsServices();

const createUserTag = async (request, response, next) => {
  try {
    const body = request.body;
    const { id } = request.user;
    body.user_id = id;

    const tags = await UserTagsService.createTag(body);
    // response.json(vote)
    response.json({ message: 'Interest Added' });
  } catch (error) {
    next(error);
  }
};

const removeUserTag = async (request, response, next) => {
  try {
    const { isSameUser } = request.user;
    if (isSameUser) {
      const { tag_id } = request.body;
      const results = await UserTagsService.removeUserTag(tag_id);
      return response.json({ message: 'Interest removed' });
    }

    throw new CustomError(
      'You are not authorized to make changes to this user',
      403,
      'Unauthorized'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserTag,
  removeUserTag,
};
