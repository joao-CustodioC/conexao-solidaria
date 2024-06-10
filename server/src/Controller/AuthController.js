require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const express = require('express')
const authRouter = express.Router()
const db = require('../db/models')
const {userCreate} = require("../Validations/LoginValidation");
const jwt = require('jsonwebtoken');


authRouter.post("/login", userCreate(), async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) throw new Error('Usuário não encontrado!');

    if(cryptr.decrypt(user.password) !== req.body.password) throw new Error('Usuário ou senha incorretos!');

    const token = jwt.sign(
      {userId: user.id},
      process.env.JWT_KEY,
      {expiresIn: '1h'}
    );

    res.status(200).json({
      status: true,
      msg: 'Usuário logado com sucesso!',
      token: token,
      user,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})


module.exports = authRouter;
