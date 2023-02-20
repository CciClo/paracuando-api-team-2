
const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class StatesService {
  constructor() {
  }

  async getStateByName(name) {
    let state = await models.States.findOne({where: {name}});
    if (!state) throw new CustomError('not found state', 404, 'not found')
    return state
  }

}

module.exports = StatesService;