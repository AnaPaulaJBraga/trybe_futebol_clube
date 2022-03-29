import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/clubs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockClubs = [
    {
        "id": 1,
        "clubName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "clubName": "Bahia"
      },
      {
        "id": 3,
        "clubName": "Botafogo"
      },
      {
        "id": 4,
        "clubName": "Corinthians"
      },
      {
        "id": 5,
        "clubName": "Cruzeiro"
      }
]

describe('Endpoint `/clubs` método GET', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Clubs, "findAll")
        .resolves( mockClubs as unknown as Clubs[]);
    });
  
    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })
it('Verifica se retorna status 200', async() => {
    const chaiHttpResponse = await chai.request(app).get('/clubs')
    .send();
    expect(chaiHttpResponse.status).to.be.equal(200);
});

it('Verifica se o retorno está correto', async() => {
    const chaiHttpResponse = await chai.request(app).get('/clubs')
    .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockClubs);
});

});

describe('Endpoint `/clubs/:id` metódo GET', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Clubs, "findAll")
        .resolves( mockClubs as unknown as Clubs[]);
    });
  
    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })
  
    it('Verifica se retorna status 200 quando um id existe no banco de dados', async () => {
      const chaiHttpResponse = await chai.request(app).get('/clubs/1')
        .send();
      expect(chaiHttpResponse.status).to.be.eq(200);
    });
  
    it('Verifica se retorna o time correto com um id que existe no banco', async () => {
      const chaiHttpResponse = await chai.request(app).get('/clubs/1')
        .send();
      expect(chaiHttpResponse.body[0]).to.be.deep.eq(mockClubs[0]);
    })
  });