require('dotenv').config()
const express = require('express')
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CHAVE_KEY);
const userRouter = express.Router()
const db = require('../db/models')
const {userCreate, userUpdate, deleteUpdate} = require("../Validations/UserValidation");

userRouter.delete('/instituicao', async (req, res) => {
  try {
    let {user_id, instituicao_id, servico_id} = req.body
    let voluntariado = await db.Voluntariado.findOne({
      where: {
        user_id,
        instituicao_id,
        servico_id
      }
    })

    await voluntariado.destroy()
    if (!voluntariado) throw new Error('Nao encontrado');
    res.status(200).json({
      status: true,
      msg: 'Voluntáriado exluido!',
    });
  } catch (e) {
  }

})
userRouter.post('/instituicao/servico', async (req, res) =>{
  try {
    let {user_id, instituicao_id, servico_id} = req.body
    let voluntariado = await db.Voluntariado.create({
      user_id: user_id,
      instituicao_id,
      servico_id
    })

    res.status(201).json({
      status: true,
      msg: 'Voluntáriado com sucesso!',
      voluntariado
    });
  } catch (e) {
    res.status(500).json({error: error.message});
  }
})

userRouter.get("/:id?", async (req, res) => {
  try {
    let users;
    if(req.params.id){
      // Se o ID foi fornecido, filtre as instituições pelo ID
      users = await db.User.findOne({
        where: {
          id: req.params.id
        }
      });
    } else {
      users = await db.User.findAll({
        include: [
          {
            association: 'servicos',
          },
          {
            association: 'instituicoes',
          },
        ],
      });
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

userRouter.post("/", userCreate(), async (req, res) => {
  try {
    let data = req.body
    data.password = cryptr.encrypt(data.password);
    const checkUser = await db.User.findAll({
      where: {
        email: data.email
      }
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
    res.status(500).json({error: error.message});
  }
});


userRouter.put('/:id', userUpdate(), async (req, res) => {
  try {
    let data = req.body
    data.password = cryptr.encrypt(data.password);
    let user = await db.User.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    let {name, email} = req.body

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

userRouter.delete( '/:id', deleteUpdate(), async(req, res) =>{
  try {
    let user = await db.User.findOne({
      where: {
        id: req.params.id
      }
    })
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
