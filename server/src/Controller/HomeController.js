require('dotenv').config()
const express = require('express')
const homeRouter = express.Router()
const db = require('../models')

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dados iniciais do painel para administradores

 * /home:
 *   get:
 *     summary: Retorna um resumo com instituições e usuários cadastrados
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dados retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Dashboard
 *                 resultados:
 *                   type: object
 *                   properties:
 *                     instituicoes:
 *                       type: array
 *                       items:
 *                         type: object
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *       500:
 *         description: Erro ao buscar dados
 */
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
