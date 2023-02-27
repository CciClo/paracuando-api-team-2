'use strict';
const { Op } = require('sequelize')
const uuid = require('uuid');
const CitiesService = require('../../services/cities.service');
const PublicationsTypesService = require('../../services/publicationsTypes.service');
const UsersService = require('../../services/users.service');
const usersService = new UsersService();
const publicationsTypesService = new PublicationsTypesService();
const citiesService = new CitiesService();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const user1 = await usersService.findUserByEmailOr404('tato.tandioy@gmail.com');
    const publicationtype1 = await publicationsTypesService.getPublicationTypeByName('Videos Games');
    const city1 = await citiesService.getCityByName('Bogota');

    const user2 = await usersService.findUserByEmailOr404('engriendonos@gmail.com');
    const publicationtype2 = await publicationsTypesService.getPublicationTypeByName('Artistas y conciertos');
    const city2 = await citiesService.getCityByName('Cusco');

    const publications = [
      {
        id: uuid.v4(),
        user_id: user1.id,
        publication_type_id: publicationtype1.id,
        city_id: city1.id,
        title: 'Juguemos Mobile Legends',
        description: 'Sobrevivamos en un entorno de competencia etc...',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        user_id: user2.id,
        publication_type_id: publicationtype2.id,
        city_id: city2.id,
        title: 'Musica',
        description: 'Iremos a un concierto de...',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    try {

      await queryInterface.bulkInsert('publications', publications, {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.commit()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const publications = [
      'Juguemos Mobile Legends',
      'Musica'
    ]

    try {
      await queryInterface.bulkDelete(
        'publications',
        {
          name: {
            [Op.or]: publications,
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
