'use strict';
const sharp = require('sharp');
const { uploadFile, deleteFile } = require('../libs/aws3');
const PublicationsServices = require('../services/publications.service');
const UsersService = require('../services/users.service');
const VotesServices = require('../services/votes.service');
const uuid = require('uuid');
const fs = require('fs');
const util = require('util');
const {
  getPagination,
  getPagingData,
  CustomError,
} = require('../utils/helpers');

const unlinkFile = util.promisify(fs.unlink);

const votesService = new VotesServices();
const publicationsService = new PublicationsServices();
const usersService = new UsersService();

const getAllUserAdmin = async (request, response, next) => {
  try {
    let query = request.query;
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size, '10');

    query.limit = limit;
    query.offset = offset;

    let users = await usersService.findAndCount(query);
    const results = getPagingData(users, page, limit);

    return response.json({ results: results });
    // response.json(request.user)
  } catch (error) {
    next(error);
  }
};

const findUserById = async (request, response, next) => {
  try {
    let { id } = request.params;
    const user = request.user;
    if (user.isSameUser || user.isAdmin) {
      let foundUser = await usersService.getSameUser(id);
      return response.json(foundUser);
    }
    let foundUser = await usersService.getPublicUser(id);
    return response.json(foundUser);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (request, response, next) => {
  try {
    const { isSameUser } = request.user;
    const { id } = request.params;
    const { body } = request;
    if (isSameUser) {
      let user = await usersService.updateUser(id, body);
      return response.json({ results: { message: 'Succes Update' } });
      // return console.log(request.user);
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

const getUserAllVotes = async (request, response, next) => {
  try {
    let query = request.query;
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size, '10');

    query.limit = limit;
    query.offset = offset;
    const { id } = request.params;
    query.user_id = id;
    const result = await votesService.findAndCount(query);
    const results = getPagingData(result, page, limit);
    response.json({ results });
  } catch (error) {
    next(error);
  }
};

const getUserAllPublications = async (request, response, next) => {
  try {
    let query = request.query;
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size, '10');

    query.limit = limit;
    query.offset = offset;
    const { id } = request.params;
    query.user_id = id;
    const result = await publicationsService.findAndCount(query);
    const results = getPagingData(result, page, limit);
    response.json({ results });
  } catch (error) {
    next(error);
  }
};

const uploadImageUser = async (request, response, next) => {
  try {
    const { id: idUser } = request.params
    const files = request.files;
    const { isSameUser } = request.user;
    if (isSameUser) {
      if (files.length && files.length < 2) {
        let imagesKeys = []
        await Promise.all(files.map(async (file) => {
          const idImage = uuid.v4()
          let imageName = `user-image-${idUser}-${idImage}`
          const fileResize = await sharp(file.path)
            .resize({ height: 1920, width: 1080, fit: 'contain' })
            .toBuffer()
          await uploadFile(fileResize, imageName, file.mimetype)
          let newImageUser = await usersService.addImage(imageName, idUser)
          imagesKeys.push(newImageUser.image_url)
        }))
        await Promise.all(files.map(async (file) => {
          await unlinkFile(file.path)
        }))
        return response.json({ results: { message: 'Image Added', images: imagesKeys } })
      }
    }

    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized'
    );
  } catch (error) {
    next(error)
  }
}

const removeImageUser = async (request, response, next) => {
  try {
    const { isAdmin, isSameUser } = request.user;
    const { id } = request.params;
    if (isAdmin || isSameUser) {
      let imageUser = await usersService.getImageOr404(id);
      await deleteFile(imageUser.image_url);
      await usersService.removeImage(imageUser.id);
      return response.status(200).json({ message: 'Image Removed' });
    }
    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized');
  } catch (error) {
    next(error)
  }

}

module.exports = {
  getAllUserAdmin,
  findUserById,
  updateUserById,
  getUserAllVotes,
  getUserAllPublications,
  uploadImageUser,
  removeImageUser,
};
