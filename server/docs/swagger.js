// backend/config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Conexão Solidária API',
            version: '1.0.0',
            description: 'Documentação da API do projeto Conexão Solidária',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
    },
    apis: ['./src/router/*.js', './src/Controller/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;