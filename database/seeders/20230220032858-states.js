'use strict';
const { Op } = require('sequelize')
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const states = [
        {
          id: uuid.v4(),
          country_id : 2,
          name: 'Cundinamarca',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          country_id : 1,
          name: 'Cusco',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
      await queryInterface.bulkInsert('states', states, {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.commit()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      const states = [
        'Estado de prueba'
      ]
      
      await queryInterface.bulkDelete(
        'states',
        {
          name: {
            [Op.or]: states
          }
        },
        {transaction}
      )

      await transaction.commit();

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
