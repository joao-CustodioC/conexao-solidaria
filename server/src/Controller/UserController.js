require('dotenv').config()
const express = require('express')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const userRouter = express.Router()
const db = require('../models')
const {userCreate, userUpdate, userDelete} = require("../Validations/UserValidation");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários e inscrições em instituições
 */

/**
 * @swagger
 * /users/instituicao:
 *   delete:
 *     summary: Remove inscrição de voluntariado
 *     tags: [Doações e Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, instituicao_id, servico_id]
 *             properties:
 *               user_id:
 *                 type: integer
 *               instituicao_id:
 *                 type: integer
 *               servico_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Voluntariado excluído com sucesso
 *       500:
 *         description: Erro ao excluir
 */
userRouter.delete('/instituicao', async (req, res) => {
  try {
    const {user_id, instituicao_id, servico_id} = req.body
    const voluntariado = await db.Voluntariado.findOne({ where: { user_id, instituicao_id, servico_id } })
    await voluntariado?.destroy()
    if (!voluntariado) throw new Error('Não encontrado')
    res.status(200).json({ status: true, msg: 'Voluntariado excluído!' })
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

/**
 * @swagger
 * /users/instituicao/servico:
 *   post:
 *     summary: Inscreve um usuário em um serviço de uma instituição
 *     tags: [Doações e Inscrições]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, instituicao_id, servico_id]
 *             properties:
 *               user_id:
 *                 type: integer
 *               instituicao_id:
 *                 type: integer
 *               servico_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Voluntariado criado com sucesso
 *       500:
 *         description: Erro ao criar
 */
userRouter.post('/instituicao/servico', async (req, res) =>{
  try {
    const {user_id, instituicao_id, servico_id} = req.body
    const voluntariado = await db.Voluntariado.create({ user_id, instituicao_id, servico_id })

    res.status(201).json({
      status: true,
      msg: 'Voluntariado criado com sucesso!',
      voluntariado
    });
  } catch (e) {
    res.status(500).json({error: e.message});
  }
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna todos os usuários ou um usuário específico
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de usuários ou usuário retornado
 *       500:
 *         description: Erro ao buscar
 */
userRouter.get("/:id?", async (req, res) => {
  try {
    let users;
    if(req.params.id){
      users = await db.User.findOne({ where: { id: req.params.id } });
    } else {
      users = await db.User.findAll({ include: ['servicos', 'instituicoes'] });
    }

    res.status(200).json({
      status: true,
      msg: 'Lista de usuários',
      users
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastra um novo usuário ADMIN
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       500:
 *         description: Erro ao criar
 */
userRouter.post("/", userCreate(), async (req, res) => {
  try {
    let data = req.body
    data.password = cryptr.encrypt(data.password);
    const checkUser = await db.User.findAll({ where: { email: data.email } })

    if (checkUser.length > 0) throw new Error('Email já está sendo usado')

    const user = await db.User.create(data)

    res.status(201).json({
      status: true,
      msg: 'Usuário criado com sucesso!',
      user
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       500:
 *         description: Erro ao atualizar
 */
userRouter.put('/:id', userUpdate(), async (req, res) => {
  try {
    let data = req.body
    data.password = cryptr.encrypt(data.password);
    const user = await db.User.findOne({ where: { id: req.params.id } })

    if (!user) throw new Error('Usuário não encontrado!')

    const { name, email } = req.body
    user.name = name
    user.email = email
    await user.save()

    res.status(200).json({
      status: true,
      msg: 'Usuário atualizado com sucesso!',
      user :  req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário do sistema
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído
 *       500:
 *         description: Erro ao excluir
 */
userRouter.delete('/:id', userDelete(), async (req, res) =>{
  try {
    const user = await db.User.findOne({ where: { id: req.params.id } })
    if (!user) throw new Error('Usuário não encontrado!');

    await user.destroy()
    res.status(200).json({
      status: true,
      msg: 'Usuário excluído com sucesso!',
      user :  req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = userRouter;
