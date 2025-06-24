const express = require('express')
const routes = express()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
require('dotenv').config()
const verificarToken = require("../Middleware/VerificaToken");

const userRouter = require('../../src/Controller/UserController')
const instituicaoRouter = require('../../src/Controller/InstituicaoController')
const authRouter = require('../../src/Controller/AuthController')
const homeRouter = require('../../src/Controller/HomeController')
const servicoRouter = require('../../src/Controller/ServicoController')
const db = require("../db/models");

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
 *     description: Gerenciamento de ações e campanhas
 *   - name: Conta
 *     description: Criação de nova conta
 */

/**
 * @swagger
 * /criar-conta:
 *   post:
 *     summary: Cria uma nova conta de usuário
 *     tags: [Conta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - password
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno ao criar usuário
 */
routes.post('/criar-conta', async (req, res) => {
  try {
    let data = req.body
    data.password = cryptr.encrypt(data.password);
    const checkUser = await db.User.findAll({
      where: { email: data.email }
    })

    if (checkUser.length > 0) {
      throw new Error('Email já está sendo usado');
    }
    const user = await db.User.create(data)

    res.status(201).json({
      status: true,
      msg: 'Usuário criado com sucesso!',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de teste (Hello World)
 *     tags: [Conta]
 *     responses:
 *       200:
 *         description: Hello World retornado
 */
routes.get('/', async (req, res) => {
  res.send('Hello World')
})

// Módulos protegidos
routes.use('/auth', authRouter)
routes.use('/users', verificarToken, userRouter)
routes.use('/instituicoes', verificarToken, instituicaoRouter)
routes.use('/home', verificarToken, homeRouter)
routes.use('/servico', verificarToken, servicoRouter)

module.exports = routes
