require('dotenv').config()
const express = require('express')
const servicoRouter = express.Router()
const db = require('../db/models')

servicoRouter.get("/:id?", async (req, res) => {
  try {

    let servico;
    if(req.params.id){
      // Se o ID foi fornecido, filtre as instituições pelo ID
      servico = await db.Servico.findOne({
        where: {
          id: req.params.id
        }
      });
    } else {
      // Se nenhum ID foi fornecido, obtenha todas as instituições
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
})

servicoRouter.post("/",  async (req, res) => {
  try {
    let data = req.body
    console.log(data)
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


servicoRouter.put('/:id',  async (req, res) => {
  try {
    let data = req.body
    let servico = await db.Servico.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!servico) {
      throw new Error('Serviços não encontrado!');
    }

    let {name, description,instituicao_id } = req.body

    servico.instituicao_id = instituicao_id
    servico.name = name
    servico.description = description
    await servico.save()

    res.status(200).json({
      status: true,
      msg: 'Serviços atualizada com sucesso!',
      user :  req.body
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

servicoRouter.delete( '/:id',  async(req, res) =>{
  try {
    let user = await db.Servico.findOne({
      where: {
        id: req.params.id
      }
    })
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
