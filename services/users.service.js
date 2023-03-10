const { v4: uuid4 } = require('uuid');
const models = require('../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const { getObjectSignedUrl } = require('../libs/aws3');

class UsersService {
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

    const { first_name } = query;
    if (first_name) {
      options.where.first_name = { [Op.iLike]: `%${first_name}%` };
    }

    const { created_at } = query;
    if (created_at) {
      options.where.created_at = { [Op.iLike]: `%${created_at}%` };
    }

    const { las_name } = query;
    if (las_name) {
      options.where.created_at = { [Op.iLike]: `%${las_name}%` };
    }

    const { email } = query;
    if (email) {
      options.where.created_at = { [Op.iLike]: `%${email}%` };
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true;

    const users = await models.Users.findAndCountAll(options);
    return users;
  }

  async createAuthUser(obj) {
    const transaction = await models.sequelize.transaction();
    try {
      obj.id = uuid4();
      obj.password = hashPassword(obj.password);
      let newUser = await models.Users.create(obj, {
        transaction,
        fields: [
          'id',
          'first_name',
          'last_name',
          'password',
          'email',
          'username',
        ],
      });

      let publicRole = await models.Roles.findOne(
        { where: { name: 'public' } },
        { raw: true }
      );

      let newUserProfile = await models.Profiles.create(
        { user_id: newUser.id, role_id: publicRole.id },
        { transaction }
      );

      await transaction.commit();
      return newUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAuthUserOr404(id) {
    let user = await models.Users.scope('auth_flow').findByPk(id, {
      raw: true,
    });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }

  async getPublicUser(id) {
    let user = await models.Users.scope('view_public').findByPk(id, {
      raw: true,
    });
    if (!user) throw new CustomError('Not found user', 404, 'Not found');
    if (user['image_url']) {
      let imageURL = await getObjectSignedUrl(user['image_url']);
      user['image_url'] = imageURL
    }
    return user;
  }

  async getSameUser(id) {
    let user = await models.Users.scope('view_same_user').findByPk(id, {
      raw: true,
    });
    if (!user) throw new CustomError('Not found user', 404, 'Not found');
    if (user['image_url']) {
      let imageURL = await getObjectSignedUrl(user['image_url']);
      user['image_url'] = imageURL
    }
    return user;
  }

  async getUser(id) {
    let user = await models.Users.findByPk(id);
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }

  async findUserByEmailOr404(email) {
    if (!email) throw new CustomError('Email not given', 400, 'Bad Request');
    let user = await models.Users.findOne({ where: { email } }, { raw: true });
    if (!user) throw new CustomError('Not found User', 404, 'Not Found');
    return user;
  }

  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let updatedUser = await user.update(obj, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      await user.destroy({ transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async setTokenUser(id, token) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let updatedUser = await user.update({ token }, { transaction });
      await transaction.commit();
      return updatedUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeTokenUser(id) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      await user.update({ token: null }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async verifiedTokenUser(id, token, exp) {
    const transaction = await models.sequelize.transaction();
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request');
      if (!token)
        throw new CustomError('Not token provided', 400, 'Bad Request');
      if (!exp) throw new CustomError('Not exp exist', 400, 'Bad Request');

      let user = await models.Users.findOne({
        where: {
          id,
          token,
        },
      });
      if (!user)
        throw new CustomError(
          'The user associated with the token was not found',
          400,
          'Invalid Token'
        );
      if (Date.now() > exp * 1000)
        throw new CustomError(
          'The token has expired, the 15min limit has been exceeded',
          401,
          'Unauthorized'
        );
      await user.update({ token: null }, { transaction });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updatePassword(id, newPassword) {
    const transaction = await models.sequelize.transaction();
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request');
      let user = await models.Users.findByPk(id);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      let restoreUser = await user.update(
        { password: hashPassword(newPassword) },
        { transaction }
      );
      await transaction.commit();
      return restoreUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async addImage(image_url, idUser) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(idUser);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      const result = await user.update({ image_url: image_url }, { transaction });
      await transaction.commit();
      return result
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getImageOr404(idUser) {
    const user = await models.Users.findOne({ where: { id: idUser }, attributes: { include: ['id', 'image_url'] } });
    if (!user) throw new CustomError('Not found user', 404, 'Not Found');
    if (!user.image_url) throw new CustomError('Not found image', 404, 'Not Found');
    console.log(user);
    return user
  }

  async removeImage(idUser) {
    const transaction = await models.sequelize.transaction();
    try {
      let user = await models.Users.findByPk(idUser);
      if (!user) throw new CustomError('Not found user', 404, 'Not Found');
      const result = await user.update({ image_url: null }, { transaction });
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
module.exports = UsersService;
