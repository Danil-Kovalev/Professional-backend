import { Test, TestingModule } from '@nestjs/testing'
import { FilmsService } from './fims.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Films } from './entity/films.entity';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { People } from '../peoples/entity/people.entity';
import { Planets } from '../planets/entity/planets.entity';
import { Species } from '../species/entity/species.entity';
import { Starships } from '../starships/entity/starships.entity';
import { Vehicles } from '../vehicles/entity/vehicles.entity';

describe('FilmsService', () => {
    let service: FilmsService;

    let peopleRepository: Repository<People>;
    let planetsRepositiry: Repository<Planets>;
    let filmsRepository: Repository<Films>;
    let vehiclesRepositiry: Repository<Vehicles>;
    let speciesRepositiry: Repository<Species>;
    let starshipsRepositiry: Repository<Starships>;

    const PEOPLE_REPOSITORY_TOKEN = getRepositoryToken(People);
    const PLANETS_REPOSITORY_TOKEN = getRepositoryToken(Planets);
    const FILMS_REPOSITORY_TOKEN = getRepositoryToken(Films);
    const VEHICLES_REPOSITORY_TOKEN = getRepositoryToken(Vehicles);
    const SPECIES_REPOSITORY_TOKEN = getRepositoryToken(Species);
    const STARSHIPS_REPOSITORY_TOKEN = getRepositoryToken(Starships);

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
            planets: [],
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
        find: jest.fn().mockResolvedValueOnce(mockReturnFilm),
        map: jest.fn(),
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
        filmsRepository = module.get<Repository<Films>>(FILMS_REPOSITORY_TOKEN)

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