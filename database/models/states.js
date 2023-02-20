'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      States.belongsTo(models.Countries, {as:'countrie', foreignKey: 'country_id'})
      States.hasMany(models.Cities, {as:'cities', foreignKey: 'state_id'})
    }
  }
  States.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'states',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {attributes: ['id', 'name']}
    }
  });
  return States;
};