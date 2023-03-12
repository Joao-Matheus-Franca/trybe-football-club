import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsModel from '../database/models/teamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockBahia: teamsModel = new teamsModel({
  id: 1,
  teamName: 'Bahia'
});

describe('Testes de integração da API Trybe Futebol Clube', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Testando GET na rota "/teams"', async () => {
    sinon
      .stub(teamsModel, "findAll")
      .resolves([mockBahia]);

    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('Testando GET na rota "/teams:id"', async () => {
    sinon
      .stub(teamsModel, "findByPk")
      .resolves(mockBahia);

    const chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
  })
});
