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

describe('Testes de integração da API Trybe Futebol Club', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(teamsModel, "findAll")
      .resolves([mockBahia]);
  });

  afterEach(()=>{
    (teamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Testando GET na rota "/teams"', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
  })
});
