'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class publications_images extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            publications_images.belongsTo(models.Publications, {
                as: 'publication',
                foreingKey: 'publication_id',
            });
        }
    }
    publications_images.init(
        {
            publication_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'PublicationsImages',
            tableName: 'publications_images',
            underscored: true,
            timestamps: true,
            scopes: {
                view_public: { attributes: ['image:url', 'crea'] },
            },
        }
    );
    return publications_images;
};
