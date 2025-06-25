const request = require('supertest');
const express = require('express');
const servicoRouter = require('../src/Controller/ServicoController');
const db = require('../src/models');

jest.mock('../src/models', () => ({
  Servico: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  }
}));

const app = express();
app.use(express.json());
app.use('/servico', servicoRouter);

describe('ServicoController', () => {
  afterEach(() => jest.clearAllMocks());

  it('GET /servico retorna todos os serviços', async () => {
    db.Servico.findAll.mockResolvedValue([{ id: 1, name: 'Serviço A' }]);

    const res = await request(app).get('/servico');

    expect(res.status).toBe(200);
    expect(res.body.servico).toHaveLength(1);
  });

  it('GET /servico/:id retorna um serviço específico', async () => {
    db.Servico.findOne.mockResolvedValue({ id: 2, name: 'Serviço B' });

    const res = await request(app).get('/servico/2');

    expect(res.status).toBe(200);
    expect(res.body.servico.name).toBe('Serviço B');
  });

  it('POST /servico cria um novo serviço', async () => {
    db.Servico.create.mockResolvedValue({ id: 3, name: 'Novo Serviço' });

    const res = await request(app)
        .post('/servico')
        .send({ name: 'Novo Serviço', description: 'Desc', instituicao_id: 1 });

    expect(res.status).toBe(201);
    expect(res.body.servico.name).toBe('Novo Serviço');
  });

  it('PUT /servico/:id atualiza um serviço', async () => {
    const mockSave = jest.fn();
    db.Servico.findOne.mockResolvedValue({
      id: 1,
      save: mockSave,
    });

    const res = await request(app)
        .put('/servico/1')
        .send({ name: 'Editado', description: 'Nova Desc', instituicao_id: 1 });

    expect(res.status).toBe(200);
    expect(mockSave).toHaveBeenCalled();
  });

  it('DELETE /servico/:id exclui um serviço', async () => {
    const mockDestroy = jest.fn();
    db.Servico.findOne.mockResolvedValue({ id: 1, destroy: mockDestroy });

    const res = await request(app).delete('/servico/1');

    expect(res.status).toBe(200);
    expect(mockDestroy).toHaveBeenCalled();
  });
});
