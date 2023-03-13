import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/matchesModel';

import { Response } from 'superagent';

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

    it('Testando GET na rota "/teams"', async () => {
        sinon
          .stub(matchesModel, "findAll")
          .resolves([mockMatches]);
    
    const chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.be.equal(200);})
  });