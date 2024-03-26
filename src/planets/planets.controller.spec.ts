import { Test, TestingModule } from '@nestjs/testing'
import { PlanetsController } from './planets.controller'
import { PlanetsService } from './planets.service'
import { CreatePlanetsDto } from './dto/createPlanets.dto'
import { PassportModule } from '@nestjs/passport';

describe('PlanetsController', () => {
    let service: PlanetsService
    let controller: PlanetsController;

    const mockPlanet = {
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

    const mockPlanetsService = {
        getPlanets: jest.fn().mockResolvedValueOnce([mockPlanet]),
        getPlanet: jest.fn().mockResolvedValueOnce([mockPlanet]),
        createPlanet: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updatePlanets: jest.fn(dto => {
            return { ...mockPlanet, surface_water: 10 }
        }),
        deletePlanets: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [PlanetsController],
            providers: [PlanetsService],
        }).overrideProvider(PlanetsService).useValue(mockPlanetsService).compile();

        controller = module.get<PlanetsController>(PlanetsController)
        service = module.get<PlanetsService>(PlanetsService)
    })

    it('should be defined planet', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllPlanets', () => {
        it('should be get all planets', async () => {
            const result = await service.getPlanets({ page: 1, skip: 0 });
            expect(service.getPlanets).toHaveBeenCalled()
            expect(result).toEqual([mockPlanet])
        })
    })

    describe('getPlanetById', () => {
        it('should be get Planet', async () => {
            const result = await service.getPlanet(1);
            expect(service.getPlanet).toHaveBeenCalled()
            expect(result).toEqual([mockPlanet])
        })
    })

    describe('createPlanet', () => {
        it('should be create Planet', async () => {
            const newPlanet: CreatePlanetsDto = { ...mockPlanet }
            const result = await service.createPlanet(newPlanet);

            expect(service.createPlanet).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockPlanet
            })
        })
    })

    describe('updatePlanet', () => {
        it('should be updated Planet', async () => {
            const updatePlanet = { ...mockPlanet, surface_water: 10 }
            const result = await service.updatePlanets(1, updatePlanet);

            expect(service.updatePlanets).toHaveBeenCalled()
            expect(result).toEqual(updatePlanet)
        })
    })

    describe('deletePlanet', () => {
        it('should be deleted Planet and get success result', async () => {
            const result = await mockPlanetsService.deletePlanets(1)

            expect(service.deletePlanets).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})