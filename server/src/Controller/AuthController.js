require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const express = require('express')
const authRouter = express.Router() // ✅ precisa vir antes de usar
const db = require('../db/models')
const { userCreate } = require("../Validations/LoginValidation")
const jwt = require('jsonwebtoken')

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
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senhaSegura123
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       500:
 *         description: Usuário não encontrado ou senha incorreta
 */
authRouter.post("/login", userCreate(), async (req, res) => {
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

module.exports = authRouter
