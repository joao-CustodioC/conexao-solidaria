const request = require('supertest');
const express = require('express');
const instituicaoRouter = require('../src/Controller/InstituicaoController');
const db = require('../src/models');

jest.mock('../src/models', () => ({
    Instituicao: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
    },
    Doacao: {
        create: jest.fn(),
    }
}));

const app = express();
app.use(express.json());
app.use('/instituicoes', instituicaoRouter);

describe('InstituicaoController', () => {
    afterEach(() => jest.clearAllMocks());

    it('GET /instituicoes deve retornar todas as instituições', async () => {
        db.Instituicao.findAll.mockResolvedValue([{id: 1, name: 'Instituição A'}]);

        const res = await request(app).get('/instituicoes');

        expect(res.status).toBe(200);
        expect(res.body.instituicoes).toHaveLength(1);
    });

    it('GET /instituicoes/:id deve retornar uma instituição', async () => {
        db.Instituicao.findOne.mockResolvedValue({id: 1, name: 'Instituição A'});

        const res = await request(app).get('/instituicoes/1');

        expect(res.status).toBe(200);
        expect(res.body.instituicoes.name).toBe('Instituição A');
    });

    it('POST /instituicoes deve criar nova instituição', async () => {
        db.Instituicao.create.mockResolvedValue({id: 1, name: 'Nova Instituição'});

        const res = await request(app)
            .post('/instituicoes')
            .send({name: 'Nova Instituição', description: 'ONG'});

        expect(res.status).toBe(201);
        expect(res.body.instituicao.name).toBe('Nova Instituição');
    });

    it('PUT /instituicoes/:id deve atualizar instituição existente', async () => {
        const mockSave = jest.fn();
        db.Instituicao.findOne.mockResolvedValue({
            id: 1,
            name: 'Antigo Nome',
            description: 'Desc',
            save: mockSave,
        });

        const res = await request(app)
            .put('/instituicoes/1')
            .send({name: 'Novo Nome', description: 'Nova Desc'});

        expect(res.status).toBe(200);
        expect(mockSave).toHaveBeenCalled();
    });

    it('DELETE /instituicoes/:id deve excluir uma instituição', async () => {
        const mockDestroy = jest.fn();
        db.Instituicao.findOne.mockResolvedValue({id: 1, destroy: mockDestroy});

        const res = await request(app).delete('/instituicoes/1');

        expect(res.status).toBe(200);
        expect(mockDestroy).toHaveBeenCalled();
    });

    it('POST /instituicoes/doacao/:instituicao_id deve registrar doação', async () => {
        db.Doacao.create.mockResolvedValue({
            id: 1,
            valor: '50.00',
            user_id: 2,
            instituicao_id: 3,
        });

        const res = await request(app)
            .post('/instituicoes/doacao/3')
            .send({user_id: 2, valor: '50,00'});

        expect(res.status).toBe(201);
        expect(res.body.doacao.valor).toBe('50.00');
    });
});
