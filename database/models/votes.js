'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Users, { as:'users_', foreignKey: 'user_id'})
      Votes.belongsTo(models.Publications, { as: 'publication', foreignKey: 'publication_id'})
    }
  }
  Votes.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    publication_id: {
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
  });
  return Votes;
};
