require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const express = require('express')
const authRouter = express.Router()
const db = require('../db/models')
const { login } = require("../Validations/LoginValidation")
const jwt = require('jsonwebtoken')
const {userCreate} = require("../Validations/UserValidation");

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login de usuários

 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: custodiojoaopedro@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       500:
 *         description: Usuário não encontrado ou senha incorreta
 */
authRouter.post("/login", login(), async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email }
    })

    if (!user) throw new Error('Usuário não encontrado!');
    if (cryptr.decrypt(user.password) !== req.body.password)
      throw new Error('Usuário ou senha incorretos!');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      status: true,
      msg: 'Usuário logado com sucesso!',
      token: token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

/**
 * @swagger
 * /auth/criar-conta:
 *   post:
 *     summary: Cria uma conta de um DOADOR/VOLUNTÁRIO
 *     tags: [Autenticação]
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
 *                 example: exemplo@dominio.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 pattern: 'Teste123*'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos (senha não atende aos requisitos)
 *       500:
 *         description: Erro interno ao criar usuário
 */
authRouter.post('/criar-conta',userCreate(), async (req, res) => {
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

module.exports = authRouter
