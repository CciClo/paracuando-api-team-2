const PublicationsServices = require('../services/publications.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const publicationsService = new PublicationsServices();

const getAllPublications = async (request, response, next) => {
  let query = request.query;
  try {
    const {page, size} = query;
    const {limit, offset} = getPagination(page, size, '10');
  
    query.limit = limit;
    query.offset = offset;
    const publications = await publicationsService.getAllPublications(query);
    const results = getPagingData(publications,page,limit)
    response.json({results})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllPublications,
}