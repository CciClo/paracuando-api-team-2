const PublicationsServices = require('../services/publications.service');
const { getPagination, getPagingData, CustomError } = require('../utils/helpers');

const publicationsService = new PublicationsServices();

const getAllPublications = async (request, response, next) => {
  let query = request.query;
  try {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size, '10');

    query.limit = limit;
    query.offset = offset;
    const publications = await publicationsService.findAndCount(query);
    const results = getPagingData(publications, page, limit)
    response.json({ results })
  } catch (error) {
    next(error)
  }
};

const createPublication = async (request, response, next) => {
  try {
    const user = request.user;
    const body = request.body;

    const results = await publicationsService.create(user, body)
    response.status(201).json({ message: 'Has been successfully created' })

  } catch (error) {
    next(error)
  }
};

const getPublicationById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const publication = await publicationsService.getPublicationById(id);
    response.json({ result: publication })
  } catch (error) {
    next(error)
  }
};

const deletePublicationById = async (request, response, next) => {
  try {
    const { isAdmin, isSameUser } = request.user;
    const { id } = request.params;

    if (isSameUser || isAdmin) {
      const result = await publicationsService.removePublicationById(id)
      return response.json({ message: 'Post deleted' })
    }
    throw new CustomError('You are not authorized to make changes to this user', 403, 'Unauthorized');
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllPublications,
  createPublication,
  getPublicationById,
  deletePublicationById,
}