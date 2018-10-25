'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    }),
    //HELP: comma or semicolon above?
    Topic.hasMany(models.Rules, {
      foreignKey: "topicId",
      as: "rules",
    });
  };
  return Topic;
};