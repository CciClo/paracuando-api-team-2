const PublicationsTypesService = require('../services/publicationsTypes.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const publicationsTypesService = new PublicationsTypesService();

const getPublicationsTypes = async (request, response, next) => {
  try {
    let query = request.query;
    const {page, size} =query;
    const {limit, offset} = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;
    
    const types = await publicationsTypesService.getAllPublicationsTypes(query);
    const result = getPagingData(types, page, limit)
    return response.json({results: result});
  } catch (error) {
    next(error)
  }
};


const getPublicationTypeById = async (request,response, next ) => {
  try {
    const {id} = request.params
    const result = await publicationsTypesService.getPublicationTypeById(id);
    return response.json(result)
  } catch (error) {
    next(error)
  }
};

const upPublicationTypeById = async (request, response, next) => {
  try {
    const {id} = request.params;
    const body =request.body;
    const resutl = await publicationsTypesService.updatePublicationsType(id, body);
    return response.json({message: 'Succes Update'})
    
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getPublicationsTypes,
  getPublicationTypeById,
  upPublicationTypeById
}