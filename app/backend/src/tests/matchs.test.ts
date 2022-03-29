import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matchs';
import user from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockAllMatch = [
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "awayClub": {
          "clubName": "Grêmio"
        },
        "homeClub": {
          "clubName": "São Paulo"
        }
      },
      {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "awayClub": {
          "clubName": "Santos"
        },
        "homeClub": {
          "clubName": "Internacional"
        }
    }
]

describe('Endpoint `/matchs` metódo GET', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockAllMatch as unknown as Match[]);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Verifica se retorna status 200', async() => {
        const chaiHttpResponse = await chai.request(app).get('/matchs')
        .send();
        expect(chaiHttpResponse).to.be.equal(200);
    });

    it('Verifica se retorna os dados corretos', async() => {
        const chaiHttpResponse = await chai.request(app).get('/matchs')
      .send();
    expect(chaiHttpResponse.body).to.be.deep.eq(mockAllMatch);
    });

    it('Verifica se a resposta tem as propriedades necessárias', async () => {
      const chaiHttpResponse = await chai.request(app).get('/matchs');
  
      expect(chaiHttpResponse.body[0]).to.have.property('id');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    });

    it('Verifica se passando a query inProgress=true a resposta é a esperada', async () => {
      const chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true');
  
      expect(chaiHttpResponse.body).to.have.length(4);
    });
  
    it('Verifica se passando a query inProgress=false a resposta é a esperada', async () => {
      const chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=false');
  
      expect(chaiHttpResponse.body).to.have.length(4);
    });

});

describe('Testando a Rota Post /matchs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Match, 'create').resolves({
      id: 4,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
    } as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  });

  it('Verifica se é possível criar uma nova partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .send(mockAllMatch[0]);

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Verifica se as propriedades necessárias são retornadas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .send(mockAllMatch[0]);

    expect(chaiHttpResponse).to.have.property('id');
    expect(chaiHttpResponse).to.have.property('homeTeam');
    expect(chaiHttpResponse).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse).to.have.property('awayTeam');
    expect(chaiHttpResponse).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse).to.have.property('inProgress');
  });
});

describe('Testando a Rota Patch /matchs/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Match, 'update').resolves(0 as any);
  });

  after(() => {
    (Match.update as sinon.SinonStub).restore();
  });

  it('Verifica se o status é o correto', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matchs/1').send({
      homeTeamGoals: 2,
      awayTeamGoals: 0,
    });

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Verifica se as propriedades estão corretas', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matchs/1').send({
      homeTeamGoals: 2,
      awayTeamGoals: 0,
    });

    expect(chaiHttpResponse).to.have.property('id');
    expect(chaiHttpResponse).to.have.property('homeTeam');
    expect(chaiHttpResponse).to.have.property('awayTeam');
    expect(chaiHttpResponse).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse).to.have.property('awayTeamGoals');
  });
});

describe('Testando a Rota Patch /matchs/:id/finish', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Match, 'update');
  });

  after(() => {
    (Match.update as sinon.SinonStub).restore();
  });

  it('Verifica se o status é o correto', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matchs/1/finish');

    expect(chaiHttpResponse).to.have.status(200);
  });
});