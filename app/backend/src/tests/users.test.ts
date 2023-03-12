import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import usersModel from '../database/models/usersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser: usersModel = new usersModel({
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
});

describe('Testes de integração da API Trybe Futebol Clube', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {sinon.restore()})

  it('Testando POST na rota "/login"', async () => {
    sinon.stub(usersModel, 'findAll').resolves()

    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com' , password: 'secret_admin' })

    expect(typeof chaiHttpResponse.body.token).to.be.equal('string')
  })
})