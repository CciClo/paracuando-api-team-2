'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.belongsTo(models.Publications_types, {as:'publication_type', foreignKey: 'publication_type_id'})
      Publications.hasMany(models.Votes, {as: 'votes_', foreignKey: 'publication_id'})
      Publications.belongsTo(models.Cities, {as: 'cities', foreignKey: 'city_id'})
      Publications.belongsTo(models.Users, {as: 'author', foreignKey: 'user_id'})
      // Publications.hasMany(models.Votes, {as: 'votes', foreignKey: 'publication_id'})
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      // allowNull: false
    },
    publication_type_id: {
      type: DataTypes.UUID,
      // allowNull: false
    },
    city_id: {
      type: DataTypes.UUID,
      // allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    picture: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {attributes: ['id','title', 'description']},
    }
  });
  return Publications;
};