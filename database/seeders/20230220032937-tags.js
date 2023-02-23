'use strict';
const uuid = require('uuid')
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const tags = [
      {
        id: uuid.v4(),
        name: 'adventure',
        description: 'A series of events involving exposure to one or more hazards.',
        image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Ropa y accesorios',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Deportes',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Conciertos',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Meet & Greet',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'E-sport',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Pop / Rock',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Tecnoligia',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Hogar y Decoracion',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Abastecimiento',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    try {
      await queryInterface.bulkInsert('tags', tags, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const states = [
      'adventure',
    ]

    try {
      await queryInterface.bulkDelete(
        'users',
        {
          username: {
            [Op.or]: states,
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
