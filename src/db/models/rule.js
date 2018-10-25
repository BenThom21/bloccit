'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    //HELP: Same question as {timestamp}-create-rule.js - is topicId the same here?
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      referenes: {
        model: "Rule",
        key: "id",
        as: "ruleId",
      }
    }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "ruleId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};