import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/films (GET)', () => {
    return request(app.getHttpServer())
      .get('/films')
      .expect(401)
  });

  it('/people (GET)', () => {
    return request(app.getHttpServer())
      .get('/people')
      .expect(401)
  });

  it('/planets (GET)', () => {
    return request(app.getHttpServer())
      .get('/planets')
      .expect(401)
  });

  it('/species (GET)', () => {
    return request(app.getHttpServer())
      .get('/species')
      .expect(401)
  });

  it('/starships (GET)', () => {
    return request(app.getHttpServer())
      .get('/starships')
      .expect(401)
  });

  it('/vehicles (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicles')
      .expect(401)
  });
});
