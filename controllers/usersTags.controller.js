const UsersTagsServices = require("../services/usersTags.service");
const UserTagsService = new UsersTagsServices();

const createUserTag = async (request, response, next) => {
  try {
    const body = request.body;
    const { id } = request.user;
    body.user_id = id;

    const tags = await UserTagsService.createTag(body);
    // response.json(vote)
    response.json({ message: "Interest Added" });
  } catch (error) {
    next(error);
  }
};

const removeUserTag = async (request, response, next) => {
  try {
    const { tag_id } = request.body;
    const results = await UserTagsService.removeUserTag(tag_id);
    response.json({ message: "" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserTag,
};
