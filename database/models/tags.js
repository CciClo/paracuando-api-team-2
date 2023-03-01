"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tags.hasMany(models.PublicationsTags, {
        as: "publications",
        foreignKey: "tag_id",
      });
      Tags.hasMany(models.UsersTags, {
        as: "users",
        foreignKey: "tag_id",
      });
    }
  }
  Tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        // allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Tags",
      tableName: "tags",
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ["id", "name", "image_url"] },
      },
    }
  );
  return Tags;
};
