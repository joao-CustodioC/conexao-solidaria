'use strict';
require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('users', [
            {
                name: 'Pedro Augusto',
                email: 'pedro@a.ucb.br',
                password: cryptr.encrypt('Dev@123#'),
                createdAt: new Date(),
                updatedAt: new Date(),
                isAdmin: false,
            },
            {
                name: 'Joao Custódio ',
                email: 'joao@gmail.com',
                password: cryptr.encrypt('Dev@123#'),
                createdAt: new Date(),
                updatedAt: new Date(),
                isAdmin: true,
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
