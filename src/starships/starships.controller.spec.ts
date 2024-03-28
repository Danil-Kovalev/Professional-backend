import { Test, TestingModule } from '@nestjs/testing'
import { StarshipsController } from './starships.controller'
import { StarshipsService } from './starships.service'
import { CreateStarshipsDto } from './dto/createStarshipsDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('StarshipsController', () => {
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

    const mockReturnStarship = {
        id: 1,
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

    const mockReturnUpdateStarship = {
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
        MGLT: 1,
        starship_class: "Deep Space Mobile Battlestation",
        pilotsIds: [],
        filmsIds: []
    }

    const mockStarshipService = {
        getStarships: jest.fn().mockResolvedValueOnce(mockReturnStarship),
        getStarship: jest.fn().mockResolvedValueOnce(mockReturnStarship),
        createStarship: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateStarships: jest.fn((id, dto) => {
            return { id, ...dto }
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
    })

    it('should be defined starship', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllStarships', () => {
        it('should be get all Starships', async () => {
            const dto = { page: 1, skip: 0 };
            expect(await controller.getStarships(dto)).toEqual(mockReturnStarship)
            expect(mockStarshipService.getStarships).toHaveBeenCalledWith(dto)
        })
    })

    describe('getStarshipById', () => {
        it('should be get starship', async () => {
            const dto = 1;

            expect(await controller.getStarship(dto)).toEqual(mockReturnStarship)
            expect(mockStarshipService.getStarship).toHaveBeenCalledWith(dto)
        })
    })

    describe('create starship', () => {
        it('should be create starship', async () => {
            const newStarship: CreateStarshipsDto = { ...mockStarship }

            expect(await controller.createStarships(newStarship)).toEqual({
                id: expect.any(Number),
                ...mockStarship
            })
            expect(mockStarshipService.createStarship).toHaveBeenCalledWith(newStarship)
        })
    })

    describe('update Starship', () => {
        it('should be updated starship', async () => {
            const updateStarship = { ...mockStarship, MGLT: 1 }

            expect(await controller.updateStarships(1, updateStarship)).toEqual({
                id: 1,
                ...mockReturnUpdateStarship
            })
            expect(mockStarshipService.updateStarships).toHaveBeenCalled()
        })
    })

    describe('delete Starship', () => {
        it('should be deleted starship and get success result', async () => {
            const dto = 1;

            expect(await controller.deleteStarships(dto)).toEqual({ "success": true })
            expect(mockStarshipService.deleteStarships).toHaveBeenCalled()
        })
    })
})