import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '012345'
  };

describe('Testa o endopoint `/login`', () => {
    let chaiHttpResponse: Response;
 
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves( mockUser as Users );
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('A rota deve receber o campo email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockUser.email);
       
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('A rota deve receber o campo password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockUser.password);
       
    expect(chaiHttpResponse).to.have.status(401);
  });

  it('Verifica se todos dados foram passados corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockUser);
       
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('password');
  })
 
});

describe('Testa o endopoint `/login/validate`', () => {
  let chaiHttpResponse: Response;

before(async () => {
  sinon
    .stub(Users, "findOne")
    .resolves( mockUser as Users );
});

after(()=>{
  (Users.findOne as sinon.SinonStub).restore();
})

it('Verifica se os dados foram passados corretamente', async () => {
  const login = await chai
     .request(app)
     .post('/login')
     .send({ email: 'teste@teste.com', password: '0123456' });

     const chaiHttpResponse = await chai
     .request(app).get('/login/validate')
     .set('Authorization', login.body.token);
     
  expect(chaiHttpResponse).to.have.status(200);
})

});
