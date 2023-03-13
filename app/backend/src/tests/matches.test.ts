import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/matchesModel';

import { Response } from 'superagent';

import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

const mockMatches: matchesModel = new matchesModel({
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  });

  describe('Testes de integração da API Trybe Futebol Clube', () => {
    let chaiHttpResponse: Response;
  
    afterEach(()=>{
      sinon.restore();
    })

    it('Testando GET na rota "/matches"', async () => {
        sinon
          .stub(matchesModel, "findAll")
          .resolves([mockMatches]);
    
    const chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.be.equal(200);})

    it('Testando PATCH na rota "/matches"', async () => {
      sinon
        .stub(matchesModel, "findAll")
        .resolves([mockMatches]);

      sinon
       .stub(jwt, 'verify')
       .resolves({ message: 'token' })
  
    const chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
  
    expect(chaiHttpResponse.status).to.be.equal(401);})

    it('Testando PATCH na rota "/matches"', async () => {
      sinon
        .stub(matchesModel, "findAll")
        .resolves([mockMatches]);

      sinon
       .stub(jwt, 'verify')
       .resolves({ message: 'token' })
  
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'aaabbbccc')
      ;
  
    expect(chaiHttpResponse.status).to.be.equal(200);})

    it('Testando POST na rota "/matches"', async () => {
      sinon
       .stub(jwt, 'verify')
       .resolves({ message: 'token' })
  
    const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'aaabbbccc')
      .send({homeTeamId: 1, awayTeamId: 2,
      homeTeamGoals: 0,
      awayTeamGoals: 0});
  
    expect(chaiHttpResponse.status).to.be.equal(201);})

    it('Testando POST na rota "/matches"', async () => {
      sinon
       .stub(jwt, 'verify')
       .resolves({ message: 'token' })
  
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'aaabbbccc')
      .send({homeTeamGoals: 0, awayTeamGoals: 0});
  
    expect(chaiHttpResponse.status).to.be.equal(200);})

    it('Testando GET na rota "/matches"', async () => {
      sinon
        .stub(matchesModel, "findAll")
        .resolves([mockMatches]);
  
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
  
    expect(chaiHttpResponse.status).to.be.equal(200);})

    it('Testando GET na rota "/matches"', async () => {
      sinon
        .stub(matchesModel, "findAll")
        .resolves([mockMatches]);
  
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
  
    expect(chaiHttpResponse.status).to.be.equal(200);})
  });