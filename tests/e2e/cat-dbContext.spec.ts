import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

// TOKENS GERADOS NO JWT.IO APENAS PARA TESTE.
const SECRET = 'SECRET_EXAMPLE';
const TOKEN_CONTEXT_ONE =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvZGUiOiJDT05URVhUX09ORSJ9fQ.AiT1lpGWcqBbI5PLoBPdNnub_C9FdIuvnQJeXOK2iEk';

const TOKEN_CONTEXT_TWO =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNvZGUiOiJDT05URVhUX1RXTyJ9fQ.Pf7ELBTFvTFWGJJ96RtCLKyMocIzarPrAA8YWK1W9SQ';

describe('CatDbContext', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  it(`should return created document in TOKEN_CONTEXT_ONE`, (done) => {
    const createDto = { name: 'Tigrão', breed: 'SRD', age: 6 };
    request(server)
      .post('/cats')
      .set('authorization', TOKEN_CONTEXT_ONE)
      .send(createDto)
      .expect(201)
      .end((err, { body }) => {
        expect(body.name).toEqual(createDto.name);
        expect(body.age).toEqual(createDto.age);
        expect(body.breed).toEqual(createDto.breed);
        done();
      });
  });

  it(`should return created document in TOKEN_CONTEXT_TWO`, (done) => {
    const createDto = { name: 'Tigrão', breed: 'SRD', age: 6 };
    request(server)
      .post('/cats')
      .set('authorization', TOKEN_CONTEXT_TWO)
      .send(createDto)
      .expect(201)
      .end((err, { body }) => {
        expect(body.name).toEqual(createDto.name);
        expect(body.age).toEqual(createDto.age);
        expect(body.breed).toEqual(createDto.breed);
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
