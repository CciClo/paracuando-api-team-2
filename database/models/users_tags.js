'use strict';
const { Model, INTEGER } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_tags.belongsTo(models.Users, {
        as: 'author',
        foreignKey: 'user_id',
      });
      users_tags.belongsTo(models.Tags, { as: 'tag', foreignKey: 'tag_id' });
      // define association here
    }
  }
  users_tags.init(
    {
      tag_id: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'UsersTags',
      tableName: 'users_tags',
    }
  );
  return users_tags;
};
