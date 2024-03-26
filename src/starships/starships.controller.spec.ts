import { Test, TestingModule } from '@nestjs/testing'
import { StarshipsController } from './starships.controller'
import { StarshipsService } from './starships.service'
import { CreateStarshipsDto } from './dto/createStarshipsDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('StarshipsController', () => {
    let service: StarshipsService
    let controller: StarshipsController;

    const mockStarship = {
        name: "Death Star",
        model: "DS-1 Orbital Battle Station",
        manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
        cost_in_credits: 1000000000000,
        length: 120000,
        max_atmosphering_speed: 0,
        crew: 342953,
        passengers: 843342,
        cargo_capacity: 1000000000000,
        consumables: "3 years",
        hyperdrive_rating: 4,
        MGLT: 10,
        starship_class: "Deep Space Mobile Battlestation",
        pilotsIds: [],
        filmsIds: []
    }

    const mockStarshipService = {
        getStarships: jest.fn().mockResolvedValueOnce([mockStarship]),
        getStarship: jest.fn().mockResolvedValueOnce([mockStarship]),
        createStarship: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateStarships: jest.fn(dto => {
            return { ...mockStarship, MGLT: 1 }
        }),
        deleteStarships: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [StarshipsController],
            providers: [StarshipsService],
        }).overrideProvider(StarshipsService).useValue(mockStarshipService).compile();

        controller = module.get<StarshipsController>(StarshipsController)
        service = module.get<StarshipsService>(StarshipsService)
    })

    it('should be defined starship', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllStarships', () => {
        it('should be get all Starships', async () => {
            const result = await service.getStarships({ page: 1, skip: 0 });
            expect(service.getStarships).toHaveBeenCalled()
            expect(result).toEqual([mockStarship])
        })
    })

    describe('getStarshipById', () => {
        it('should be get starship', async () => {
            const result = await service.getStarship(1);
            expect(service.getStarship).toHaveBeenCalled()
            expect(result).toEqual([mockStarship])
        })
    })

    describe('create starship', () => {
        it('should be create starship', async () => {
            const newStarship: CreateStarshipsDto = { ...mockStarship }
            const result = await service.createStarship(newStarship);

            expect(service.createStarship).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockStarship
            })
        })
    })

    describe('update Starship', () => {
        it('should be updated starship', async () => {
            const updateStarship = { ...mockStarship, MGLT: 1 }
            const result = await service.updateStarships(1, updateStarship);

            expect(service.updateStarships).toHaveBeenCalled()
            expect(result).toEqual(updateStarship)
        })
    })

    describe('delete Starship', () => {
        it('should be deleted starship and get success result', async () => {
            const result = await mockStarshipService.deleteStarships(1)

            expect(service.deleteStarships).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})