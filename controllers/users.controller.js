'use strict';
const UsersService = require('../services/users.service');


const usersService = new UsersService()

const findUserById = async (request, response, next) => {
  try {
    let { id } = request.params;
    let user = await usersService.getUser(id);
    return response.status(200).json({results: user});
  } catch (error) {
    next(error);
  }
};

const updateUserById = async ( request, response, next) => {
  try {
    const { id } = request.params
    response.json({message: 'esta es update'})
  } catch (error) {
    next(error)
  }
};

module.exports = {
  findUserById,
  updateUserById
};