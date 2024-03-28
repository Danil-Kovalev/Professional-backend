import { Test, TestingModule } from '@nestjs/testing'
import { PlanetsController } from './planets.controller'
import { PlanetsService } from './planets.service'
import { CreatePlanetsDto } from './dto/createPlanets.dto'
import { PassportModule } from '@nestjs/passport';

describe('PlanetsController', () => {
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

    const mockReturnUpdatePlanet = {
        name: "Yavin IV",
        rotation_period: 24,
        orbital_period: 4818,
        diameter: 10200,
        climate: "temperate, tropical",
        gravity: "1 standard",
        terrain: "jungle, rainforests",
        surface_water: 10,
        population: 1000,
        residentsIds: [],
        filmsIds: []
    }

    const mockPlanetsService = {
        getPlanets: jest.fn().mockResolvedValueOnce(mockReturnPlanet),
        getPlanet: jest.fn().mockResolvedValueOnce(mockReturnPlanet),
        createPlanet: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updatePlanets: jest.fn((id, dto) => {
            return { id, ...dto }
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
    })

    it('should be defined planet', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllPlanets', () => {
        it('should be get all planets', async () => {
            const dto = { page: 1, skip: 0 };

            expect(await controller.getPlanets(dto)).toEqual(mockReturnPlanet)
            expect(mockPlanetsService.getPlanets).toHaveBeenCalledWith(dto)
        })
    })

    describe('getPlanetById', () => {
        it('should be get Planet', async () => {
            const dto = 1;
            
            expect(await controller.getPlanet(dto)).toEqual(mockReturnPlanet)
            expect(mockPlanetsService.getPlanet).toHaveBeenCalledWith(dto)
        })
    })

    describe('createPlanet', () => {
        it('should be create Planet', async () => {
            const newPlanet: CreatePlanetsDto = { ...mockPlanet }

            expect(await controller.createPlanets(newPlanet)).toEqual({
                id: expect.any(Number),
                ...mockPlanet
            })
            expect(mockPlanetsService.createPlanet).toHaveBeenCalledWith(newPlanet)
        })
    })

    describe('updatePlanet', () => {
        it('should be updated Planet', async () => {
            const updatePlanet = { ...mockPlanet, surface_water: 10 }

            expect(await controller.updatePlanets(1, updatePlanet)).toEqual({
                id: 1,
                ...mockReturnUpdatePlanet
            })
            expect(mockPlanetsService.updatePlanets).toHaveBeenCalled()
        })
    })

    describe('deletePlanet', () => {
        it('should be deleted Planet and get success result', async () => {
            const dto = 1;

            expect(await controller.deletePlanets(dto)).toEqual({ "success": true })
            expect(mockPlanetsService.deletePlanets).toHaveBeenCalledWith(dto)
        })
    })
})