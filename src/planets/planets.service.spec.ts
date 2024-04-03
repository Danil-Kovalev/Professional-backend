import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { PlanetsService } from './planets.service';
import { Planets } from './entity/planets.entity';

describe('PlanetsService', () => {
    let service: PlanetsService;
    let planetsRepository: Repository<Planets>;

    const mockPlanets = {
        name: "Yavin IV",
        rotation_period: 24,
        orbital_period: 4818,
        diameter: 10200,
        climate: "temperate, tropical",
        gravity: "1 standard",
        terrain: "jungle, rainforests",
        surface_water: 8,
        population: 1000,
        residentsIds: [],
        filmsIds: []
    }

    const mockReturnPlanet = {
        id: 1,
        name: "Yavin IV",
        rotation_period: 24,
        orbital_period: 4818,
        diameter: 10200,
        climate: "temperate, tropical",
        gravity: "1 standard",
        terrain: "jungle, rainforests",
        surface_water: 8,
        population: 1000,
        residentsIds: [],
        filmsIds: []
    }

    const mockReturnPlanets = {
        data: [{
            ...mockReturnPlanet
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

    const mockPlanetsRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnPlanet]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnPlanet)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlanetsService, {
                provide: getRepositoryToken(Planets, dataSourceOptions),
                useValue: mockPlanetsRepository
            }],
        }).compile();

        service = module.get<PlanetsService>(PlanetsService)
        planetsRepository = module.get<Repository<Planets>>(getRepositoryToken(Planets))

    })

    it('should be defined planet service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined planet repository', () => {
        expect(planetsRepository).toBeDefined();
    })

    describe('getPlanets', () => {
        it('should be return planets with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getPlanets(dto)).toEqual(mockReturnPlanets)
        })
    })

    describe('getPlanet', () => {
        it('should be return planet with data', async () => {
            expect(await service.getPlanet(1)).toEqual(mockReturnPlanet)
        })
    })

    describe('createPlanets', () => {
        it('should be create planet and return it data', async () => {
            expect(await service.createPlanet(mockPlanets)).toEqual(mockPlanets)
        })
    })

    describe('updatePlanets', () => {
        it('should be update planet and return it data', async () => {
            const dto = { ...mockPlanets, episode_id: 5 }
            expect(await service.updatePlanets(1, dto)).toEqual(dto)
        })
    })

    describe('deletePlanets', () => {
        it('should be delete planet and return success result', async () => {
            expect(service.deletePlanets(1)).toEqual({ "success": true })
        })
    })
})