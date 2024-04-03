import { Test, TestingModule } from '@nestjs/testing'
import { FilmsService } from './fims.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from './entity/films.entity';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';

describe('FilmsService', () => {
    let service: FilmsService;
    let filmsRepository: Repository<Films>;

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

    const mockReturnFilm = {
        id: 1,
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "It is a period of civil war.",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: new Date(),
        url: "http://localhost:4000/films/1",
        characters: [],
        starships: [],
        vehicles: [],
        species: [],
        planets: []
    }

    const mockReturnFilms = {
        data: [{
            ...mockReturnFilm
        }],
        meta: {
            hasNextPage: false,
            hasPreviousPage: false,
            itemCount: 1,
            page: 1,
            pageCount: 1,
            take: 10,
        }
    }

    const mockFilmsRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnFilm]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnFilm)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FilmsService, {
                provide: getRepositoryToken(Films, dataSourceOptions),
                useValue: mockFilmsRepository
            }],
        }).compile();

        service = module.get<FilmsService>(FilmsService)
        filmsRepository = module.get<Repository<Films>>(getRepositoryToken(Films))

    })

    it('should be defined film service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined film repository', () => {
        expect(filmsRepository).toBeDefined();
    })

    describe('getFilms', () => {
        it('should be return films with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getFilms(dto)).toEqual(mockReturnFilms)
        })
    })

    describe('getFilm', () => {
        it('should be return film with data', async () => {
            expect(await service.getFilm(1)).toEqual(mockReturnFilm)
        })
    })

    describe('createFilms', () => {
        it('should be create film and return it data', async () => {
            expect(await service.createFilm(mockFilm)).toEqual(mockFilm)
        })
    })

    describe('updateFilms', () => {
        it('should be update film and return it data', async () => {
            const dto = { ...mockFilm, episode_id: 5 }
            expect(await service.updateFilms(1, dto)).toEqual(dto)
        })
    })

    describe('deleteFilm', () => {
        it('should be delete film and return success result', async () => {
            expect(service.deleteFilms(1)).toEqual({ "success": true })
        })
    })
})