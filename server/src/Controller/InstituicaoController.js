require('dotenv').config()
const express = require('express')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const instituicaoRouter = express.Router()
const db = require('../db/models')
const {instituicaoCreate, instituicaoUpdate, deleteUpdate} = require("../Validations/InstituicaoValidation");


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
instituicaoRouter.get("/:id?", async (req, res) => {
  try {

    let instituicoes;
    if (req.params.id) {
      // Se o ID foi fornecido, filtre as instituições pelo ID
      instituicoes = await db.Instituicao.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            association: 'doacoes',
            include: [
              {
                association: 'user',
              }
            ]
          },
          {
            association: 'voluntarios',
            include: [
              {
                association: 'user'
              },
              {
                association: 'servico'
              }

            ]
          }
        ]
      });
    } else {
      // Se nenhum ID foi fornecido, obtenha todas as instituições
      instituicoes = await db.Instituicao.findAll({
        include: [
          {
            association: 'doacoes'
          },
          {
            association: 'voluntarios'
          }
        ]
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
})

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


instituicaoRouter.put('/:id', instituicaoUpdate(), async (req, res) => {
  try {
    let data = req.body
    let instituicao = await db.Instituicao.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!instituicao) {
      throw new Error('Instituição não encontrado!');
    }

    let {name, description} = req.body

    instituicao.name = name
    instituicao.description = description
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

instituicaoRouter.delete('/:id', deleteUpdate(), async (req, res) => {
  try {
    let user = await db.Instituicao.findOne({
      where: {
        id: req.params.id
      }
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
