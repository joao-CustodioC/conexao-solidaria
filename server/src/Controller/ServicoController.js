require('dotenv').config()
const express = require('express')
const servicoRouter = express.Router()
const db = require('../models')

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Gerenciamento de ações, campanhas e projetos das instituições
 */

/**
 * @swagger
 * /servico/{id}:
 *   get:
 *     summary: Retorna um serviço específico ou todos
 *     tags: [Serviços]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de serviços ou serviço específico retornado
 *       500:
 *         description: Erro ao buscar serviço
 */
servicoRouter.get("/:id?", async (req, res) => {
  try {
    let servico;
    if(req.params.id){
      servico = await db.Servico.findOne({ where: { id: req.params.id } });
    } else {
      servico = await db.Servico.findAll();
    }

    res.status(200).json({
      status: true,
      msg: 'Lista de Serviços',
      servico
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /servico:
 *   post:
 *     summary: Cadastra um novo serviço
 *     tags: [Serviços]
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
 *               instituicao_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       500:
 *         description: Erro ao cadastrar serviço
 */
servicoRouter.post("/",  async (req, res) => {
  try {
    const data = req.body
    const servico = await db.Servico.create(data)

    res.status(201).json({
      status: true,
      msg: 'Serviços criado com sucesso!',
      servico
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /servico/{id}:
 *   put:
 *     summary: Atualiza um serviço existente
 *     tags: [Serviços]
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
 *               instituicao_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       500:
 *         description: Erro na atualização
 */
servicoRouter.put('/:id',  async (req, res) => {
  try {
    let servico = await db.Servico.findOne({ where: { id: req.params.id } })
    if (!servico) throw new Error('Serviços não encontrado!');

    const { name, description, instituicao_id } = req.body

    servico.name = name
    servico.description = description
    servico.instituicao_id = instituicao_id
    await servico.save()

    res.status(200).json({
      status: true,
      msg: 'Serviços atualizada com sucesso!',
      user :  req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /servico/{id}:
 *   delete:
 *     summary: Remove um serviço
 *     tags: [Serviços]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço excluído com sucesso
 *       500:
 *         description: Erro na exclusão
 */
servicoRouter.delete('/:id',  async(req, res) =>{
  try {
    let user = await db.Servico.findOne({ where: { id: req.params.id } })
    if (!user) throw new Error('Serviços não encontrado!');

    await user.destroy()
    res.status(200).json({
      status: true,
      msg: 'Serviços excluído com sucesso!',
      user :  req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = servicoRouter;
