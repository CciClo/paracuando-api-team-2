'use strict';
const uuid = require('uuid')
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const tags = [
      {
        name: 'adventure',
        description: 'A series of events involving exposure to one or more hazards.',
        image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ropa y accesorios',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Deportes',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Conciertos',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Meet & Greet',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'E-sport',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pop / Rock',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tecnoligia',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Hogar y Decoracion',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Abastecimiento',
        description: 'A series of events involving exposure to one or more hazards.',
        // image_url: 'http://image_url',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Video Games',
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

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const states = [
      'adventure', 'Ropa y accesorios',
      'Deportes', 'Conciertos',
      'Meet & Greet', 'E-sport',
      'Pop / Rock', 'Tecnoligia',
      'Hogar y Decoracion', 'Abastecimiento',
      'Video Games',
    ]

    try {
      await queryInterface.bulkDelete(
        'tags',
        {
          name: {
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
