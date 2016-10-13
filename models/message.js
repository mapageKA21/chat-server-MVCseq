'use strict';

module.exports = function (sequelize, DataTypes) {

  const Message = sequelize.define('Message', {
    timestamp: DataTypes.BIGINT,
    content: DataTypes.TEXT
  }, {
  	timestamps: false,
  	classMethods: {
  	  associate: function (models) {
  	  	Message.belongsTo(models.User, {
  	  	  onDelete: "CASCADE",
  	  	  foreignKey: {
  	  	  	allowNull: true
  	  	  }
  	  	});
  	  }
  	}
  });
   
  return Message;
};