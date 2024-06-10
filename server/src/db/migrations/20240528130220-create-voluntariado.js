'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'instituicoes',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      servico_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'servicos',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voluntariados');
  }
};
