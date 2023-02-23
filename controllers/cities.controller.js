const CitiesService = require('../services/cities.service');
const { getPagination, getPagingData } = require('../utils/helpers');
const citiesService = new CitiesService();


const getAllCities = async (request, response, next) => {
  try {
    let query = request.query;
    const {page, size} =query;
    const {limit, offset} = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;
    
    const countries = await citiesService.findAndCount(query);
    const result = getPagingData(countries, page, limit)
    return response.json({results: result});
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllCities,
}