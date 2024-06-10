require('dotenv').config()
const express = require('express')
const homeRouter = express.Router()
const db = require('../db/models')

homeRouter.get("/", async (req, res) => {
  try {

    let instituicoes =  await db.Instituicao.findAll();
    let users =  await db.User.findAll();

    res.status(200).json({
      status: true,
      msg: 'Dashboard',
      resultados:{
        instituicoes,
        users
      }
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = homeRouter;
