const StatesService = require('../services/states.services');
const { getPagination, getPagingData } = require('../utils/helpers');
const statesService = new StatesService();


const getAllStates = async (request, response, next) => {
  try {
    let query = request.query;
    const {page, size} =query;
    const {limit, offset} = getPagination(page, size, '10');
    query.limit = limit;
    query.offset = offset;
    
    const states = await statesService.findAndCount(query);
    const result = getPagingData(states, page, limit)
    return response.json({results: result});
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllStates,
}