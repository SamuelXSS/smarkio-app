'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color1:{
        type: Sequelize.STRING,
        allowNull: false
      },
      color2:{
        type: Sequelize.STRING,
        allowNull: false
      },
      font_color:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};