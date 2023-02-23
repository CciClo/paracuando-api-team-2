
const RolesService = require('../services/roles.service');
const { getPagination, getPagingData } = require('../utils/helpers');
const rolesService = new RolesService;

const getAllRoles = async (request, response, next) => {
  try {
    let query = request.query;
    const {page, size} =query;
    const {limit, offset} = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;
    
    const roles = await rolesService.findAndCount(query);
    const result = getPagingData(roles, page, limit)
    return response.json({results: result});
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllRoles,
}