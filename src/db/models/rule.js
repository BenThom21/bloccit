'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    //HELP: Same question as {timestamp}-create-rule.js - is topicId the same here?
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      referenes: {
        model: "Topic",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};