const request = require('supertest');
const express = require('express');
const userRouter = require('../src/Controller/UserController')
const db = require('../src/models');

// Mock do Cryptr
jest.mock('cryptr', () => {
  return jest.fn().mockImplementation(() => ({
    encrypt: (text) => `encrypted-${text}`,
  }));
});

// Mock do banco de dados
jest.mock('../src/models', () => ({
  User: {
    findAll: jest.fn(),
    create: jest.fn()
  }
}));

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('UserController - POST /users', () => {
  it('deve criar um novo usuário se o e-mail for único', async () => {
    db.User.findAll.mockResolvedValue([]); // nenhum usuário com esse email
    db.User.create.mockResolvedValue({ id: 1, name: 'João', email: 'joao@teste.com' });

    const res = await request(app)
        .post('/users')
        .send({
          name: 'João',
          email: 'joao@teste.com',
          password: 'Senha123!'
        });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.user.name).toBe('João');
    expect(db.User.create).toHaveBeenCalled();
  });

  it('deve retornar erro se o e-mail já existir', async () => {
    db.User.findAll.mockResolvedValue([{ id: 1, email: 'joao@teste.com' }]);

    const res = await request(app)
        .post('/users')
        .send({
          name: 'João',
          email: 'joao@teste.com',
          password: 'Senha123!'
        });

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/Email já está sendo usado/);
  });
});
