const express = require('express')
const routes = express()
require('dotenv').config()
const verificarToken = require("../Middleware/VerificaToken");
const userRouter = require('../../src/Controller/UserController')
const instituicaoRouter = require('../../src/Controller/InstituicaoController')
const authRouter = require('../../src/Controller/AuthController')
const homeRouter = require('../../src/Controller/HomeController')
const servicoRouter = require('../../src/Controller/ServicoController')
const db = require("../models");

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Rotas públicas para login
 *   - name: Usuários
 *     description: Gerenciamento de usuários
 *   - name: Instituições
 *     description: Operações das instituições
 *   - name: Serviços
 *     description: Gerenciamento de serviços
 *   - name: Doações e Inscrições
 *     description: Gerenciamento de doações e inscrições
 */

// Módulos protegidos
routes.use('/auth', authRouter)
routes.use('/users', verificarToken, userRouter)
routes.use('/instituicoes', verificarToken, instituicaoRouter)
routes.use('/home', verificarToken, homeRouter)
routes.use('/servico', verificarToken, servicoRouter)

module.exports = routes
