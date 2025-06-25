const request = require('supertest');
const express = require('express');

// MOCKS DEVEM VIR ANTES DOS IMPORTS REAIS

jest.mock('cryptr', () => {
  return jest.fn().mockImplementation(() => ({
    encrypt: (value) => `encrypted-${value}`,
    decrypt: (value) => value.replace('encrypted-', '')
  }));
});

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token')
}));

jest.mock('../src/Validations/UserValidation', () => ({
  userCreate: jest.fn(() => (req, res, next) => next()),
}));

jest.mock('../src/Validations/LoginValidation', () => ({
  login: jest.fn(() => (req, res, next) => next()),
}));

jest.mock('../src/models', () => ({
  User: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

// IMPORTAR APÓS OS MOCKS
const authRouter = require('../src/Controller/AuthController');
const db = require('../src/models');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('AuthController', () => {
  afterEach(() => jest.clearAllMocks());

  it('POST /auth/criar-conta cria novo usuário se e-mail for único', async () => {
    db.User.findAll.mockResolvedValue([]);
    db.User.create.mockResolvedValue({ id: 1, email: 'joao@teste.com' });

    const res = await request(app)
        .post('/auth/criar-conta')
        .send({ nome: 'João', email: 'joao@teste.com', password: 'Senha123!' });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('joao@teste.com');
  });

  it('POST /auth/criar-conta falha se e-mail já existir', async () => {
    db.User.findAll.mockResolvedValue([{ id: 1 }]);

    const res = await request(app)
        .post('/auth/criar-conta')
        .send({ nome: 'João', email: 'joao@teste.com', password: 'Senha123!' });

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/já está sendo usado/);
  });

  it('POST /auth/login autentica usuário com sucesso', async () => {
    db.User.findOne.mockResolvedValue({
      id: 1,
      email: 'joao@teste.com',
      password: 'encrypted-Senha123!'
    });

    const res = await request(app)
        .post('/auth/login')
        .send({ email: 'joao@teste.com', password: 'Senha123!' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe('fake-jwt-token');
  });

  it('POST /auth/login falha se senha for incorreta', async () => {
    db.User.findOne.mockResolvedValue({
      id: 1,
      email: 'joao@teste.com',
      password: 'encrypted-outraSenha'
    });

    const res = await request(app)
        .post('/auth/login')
        .send({ email: 'joao@teste.com', password: 'Senha123!' });

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/incorretos/);
  });

  it('POST /auth/login falha se usuário não for encontrado', async () => {
    db.User.findOne.mockResolvedValue(null);

    const res = await request(app)
        .post('/auth/login')
        .send({ email: 'naoexiste@teste.com', password: '1234' });

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/não encontrado/);
  });
});
