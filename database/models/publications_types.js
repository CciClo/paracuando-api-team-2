'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications_types.hasMany(models.Publications, {as:'publications', foreignKey: 'publication_type_id'})
    }
  }
  Publications_types.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      //allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Publications_types',
    tableName: 'publications_types',
    underscored: true,
    scopes: {
      view_public: {attributes: ['id', 'name']},
      view_detailed: {attributes: ['id', 'name', 'description']},
    }
  });
  return Publications_types;
};