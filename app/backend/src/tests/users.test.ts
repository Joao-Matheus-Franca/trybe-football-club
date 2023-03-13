import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
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
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
});

describe('Testes de integração da API Trybe Futebol Clube', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {sinon.restore()})

  it('Testando POST na rota "/login"', async () => {
    sinon.stub(usersModel, 'findAll').resolves([mockUser])

    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com' , password: 'secret_admin' })

    expect(typeof chaiHttpResponse.body.token).to.be.equal('string')
  })

  it('Testando POST na rota "/login"', async () => {
    sinon.stub(usersModel, 'findAll').resolves([mockUser])

    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({ email: '@admin.com' , password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(401)
  })

  it('Testando POST na rota "/login"', async () => {
    sinon.stub(usersModel, 'findAll').resolves([mockUser])

    const chaiHttpResponse = await chai
      .request(app).post('/login')
      .send({ email: '' , password: 'secret_admin' })

    expect(chaiHttpResponse.status).to.be.equal(400)
  })
})