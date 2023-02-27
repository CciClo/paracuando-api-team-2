'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.hasMany(models.Publications, {as: 'publications', foreignKey:'city_id'})
      Cities.belongsTo(models.States, {as:'state', foreignKey: 'state_id'})
    }
  }
  Cities.init({
    id:{
      type: DataTypes.UUID,
      primaryKey: true
    },
    state_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {attributes: ['id', 'name']}
    }
  });
  return Cities;
};