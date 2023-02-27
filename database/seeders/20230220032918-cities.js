'use strict';
const { Op } = require('sequelize')
const uuid = require('uuid');
const StatesService = require('../../services/states.services');

const statesService = new StatesService();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      const state1 = await statesService.getStateByName('Cundinamarca')
      const state2 = await statesService.getStateByName('Cusco')

      const cities = [
        {
          id: uuid.v4(),
          state_id: state1.id,
          name :'Bogota',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          state_id: state2.id,
          name :'Cusco',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
      await queryInterface.bulkInsert('cities', cities, {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.commit()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const cities = [
      'Bogota',
      'Cusco'
    ]

    try {
      await queryInterface.bulkDelete(
        'cities',
        {
          name: {
            [Op.or]: cities,
          },
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
