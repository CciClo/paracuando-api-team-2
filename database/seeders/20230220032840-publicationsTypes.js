'use strict';
const { Op } = require('sequelize')
const uuid = require('uuid')
// const PublicationsTypesService = require('../../services/publicationsTipes.service');

// const publicationsTipesService = new PublicationsTypesService();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const publicationTypes = [
        {
          id: uuid.v4(),
          name :'Marcas y tiendas',
          // description: 'All kinds of video games in general',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name :'Artistas y conciertos',
          // description: 'All kinds of video games in general',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name :'Torneos',
          // description: 'All kinds of video games in general',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          name :'Videos Games',
          // description: 'All kinds of video games in general',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
      await queryInterface.bulkInsert('publications_types', publicationTypes, {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.commit()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    try {
      const publicationsTypes = [
        'Marcas y tiendas',
        'Artistas y conciertos',
        'Torneos',
      ]
      
      await queryInterface.bulkDelete(
        'publications_types',
        {
          name: {
            [Op.or]: publicationsTypes
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
