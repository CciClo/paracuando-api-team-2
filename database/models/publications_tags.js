'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_tags.belongsTo(models.Tags, {
        as: 'tag',
        foreignKey: 'tag_id',
      });
      Publications_tags.belongsTo(models.Publications, {
        as: 'publication',
        foreignKey: 'publication_id',
      });
    }
  }
  Publications_tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publication_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PublicationsTags',
      tableName: 'publications_tags',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ['id', 'tag_id', 'publication_id'] },
      },
    }
  );
  return Publications_tags;
};
