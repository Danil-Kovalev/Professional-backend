import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilmsModule } from '../src/films/films.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from '../src/films/entity/films.entity';
import { DataSource } from 'typeorm';

describe('FilmsController (e2e)', () => {
  let app: INestApplication;

  const mockFilm = {
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: "It is a period of civil war.",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: new Date(),
    charactersIds: [],
    starshipsIds: [],
    vehiclesIds: [],
    speciesIds: [],
    planetsIds: [],
}

  const mockFilmsRepository = {
    find: jest.fn().mockResolvedValue(mockFilm)
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FilmsModule],
    }).overrideProvider(getRepositoryToken(Films)).useValue(mockFilmsRepository).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/films (GET)', () => {
    return request(app.getHttpServer())
      .get('/films')
      .expect(200)
      .expect(mockFilm)
  });
});
