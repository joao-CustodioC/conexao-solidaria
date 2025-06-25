const request = require('supertest');
const express = require('express');
const homeRouter = require('../src/Controller/HomeController')
const db = require('../src/models');

jest.mock('../src/models', () => ({
    Instituicao: {findAll: jest.fn()},
    User: {findAll: jest.fn()},
}));

const app = express();
app.use('/home', homeRouter);

describe('GET /home', () => {
    it('deve retornar lista de instituições e usuários', async () => {
        db.Instituicao.findAll.mockResolvedValue([{id: 1, nome: 'ONG A'}]);
        db.User.findAll.mockResolvedValue([{id: 1, nome: 'Usuário A'}]);

        const res = await request(app).get('/home');

        expect(res.status).toBe(200);
        expect(res.body.resultados.instituicoes.length).toBe(1);
        expect(res.body.resultados.users.length).toBe(1);
    });

    it('deve retornar erro ao falhar na busca', async () => {
        db.Instituicao.findAll.mockRejectedValue(new Error('Falha interna'));

        const res = await request(app).get('/home');

        expect(res.status).toBe(500);
        expect(res.body.error).toMatch(/Falha interna/);
    });
});
