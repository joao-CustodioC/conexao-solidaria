require('dotenv').config()
const express = require('express')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const instituicaoRouter = express.Router()
const db = require('../db/models')
const {instituicaoCreate, instituicaoUpdate, deleteUpdate} = require("../Validations/InstituicaoValidation");

/**
 * @swagger
 * tags:
 *   name: Instituições
 *   description: Gestão de instituições e doações
 */

/**
 * @swagger
 * /instituicoes/doacao/{instituicao_id}:
 *   post:
 *     summary: Realiza uma doação para uma instituição
 *     tags: [Instituições]
 *     parameters:
 *       - name: instituicao_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               valor:
 *                 type: string
 *                 example: "50,00"
 *     responses:
 *       201:
 *         description: Doação registrada com sucesso
 *       500:
 *         description: Erro ao registrar doação
 */
instituicaoRouter.post("/doacao/:instituicao_id", async (req, res) => {
  try {
    let {user_id, valor} = req.body
    valor = valor.replace(",", ".")
    let {instituicao_id} = req.params
    const doacao = await db.Doacao.create({
      user_id,
      valor,
      instituicao_id
    })

    res.status(201).json({
      status: true,
      msg: 'Doacao efetuada com sucesso!',
      doacao
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /instituicoes/{id}:
 *   get:
 *     summary: Retorna os dados de uma instituição pelo ID
 *     tags: [Instituições]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da(s) instituição(ões) retornados
 *       500:
 *         description: Erro ao buscar instituição
 */
instituicaoRouter.get("/:id?", async (req, res) => {
  try {
    let instituicoes;
    if (req.params.id) {
      instituicoes = await db.Instituicao.findOne({
        where: { id: req.params.id },
        include: [
          {
            association: 'doacoes',
            include: [{ association: 'user' }]
          },
          {
            association: 'voluntarios',
            include: [
              { association: 'user' },
              { association: 'servico' }
            ]
          }
        ]
      });
    } else {
      instituicoes = await db.Instituicao.findAll({
        include: ['doacoes', 'voluntarios']
      });
    }

    res.status(200).json({
      status: true,
      msg: 'Lista de Instituição',
      instituicoes
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /instituicoes:
 *   post:
 *     summary: Cadastra uma nova instituição
 *     tags: [Instituições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Instituição criada
 *       500:
 *         description: Erro ao cadastrar
 */
instituicaoRouter.post("/", instituicaoCreate(), async (req, res) => {
  try {
    let data = req.body
    const instituicao = await db.Instituicao.create(data)

    res.status(201).json({
      status: true,
      msg: 'Instituição criado com sucesso!',
      instituicao
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /instituicoes/{id}:
 *   put:
 *     summary: Atualiza uma instituição existente
 *     tags: [Instituições]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Instituição atualizada
 *       500:
 *         description: Erro na atualização
 */
instituicaoRouter.put('/:id', instituicaoUpdate(), async (req, res) => {
  try {
    let instituicao = await db.Instituicao.findOne({
      where: { id: req.params.id }
    })

    if (!instituicao) throw new Error('Instituição não encontrada');

    instituicao.name = req.body.name
    instituicao.description = req.body.description
    await instituicao.save()

    res.status(200).json({
      status: true,
      msg: 'Instituição atualizada com sucesso!',
      user: req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

/**
 * @swagger
 * /instituicoes/{id}:
 *   delete:
 *     summary: Exclui uma instituição
 *     tags: [Instituições]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instituição excluída
 *       500:
 *         description: Erro na exclusão
 */
instituicaoRouter.delete('/:id', deleteUpdate(), async (req, res) => {
  try {
    let user = await db.Instituicao.findOne({
      where: { id: req.params.id }
    })
    if (!user) throw new Error('Instituição não encontrado!');

    await user.destroy()
    res.status(200).json({
      status: true,
      msg: 'Instituição excluído com sucesso!',
      user: req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = instituicaoRouter;
