import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { StarshipsService } from './starships.service';
import { Starships } from './entity/starships.entity';



describe('PeoplesService', () => {
    let service: StarshipsService;
    let starshipsRepository: Repository<Starships>;

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

    const mockReturnStarships = {
        data: [{
            ...mockReturnStarship
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

    const mockStarshipsRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnStarship]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnStarship)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StarshipsService, {
                provide: getRepositoryToken(Starships, dataSourceOptions),
                useValue: mockStarshipsRepository
            }],
        }).compile();

        service = module.get<StarshipsService>(StarshipsService)
        starshipsRepository = module.get<Repository<Starships>>(getRepositoryToken(Starships))

    })

    it('should be defined starships service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined starships repository', () => {
        expect(starshipsRepository).toBeDefined();
    })

    describe('getStarships', () => {
        it('should be return starships with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getStarships(dto)).toEqual(mockReturnStarships)
        })
    })

    describe('getStarship', () => {
        it('should be return starship with data', async () => {
            expect(await service.getStarship(1)).toEqual(mockReturnStarship)
        })
    })

    describe('createStarships', () => {
        it('should be create starship and return it data', async () => {
            expect(await service.createStarship(mockStarship)).toEqual(mockStarship)
        })
    })

    describe('updateStarships', () => {
        it('should be update starships and return it data', async () => {
            const dto = { ...mockStarship, episode_id: 5 }
            expect(await service.updateStarships(1, dto)).toEqual(dto)
        })
    })

    describe('deleteStarships', () => {
        it('should be delete starship and return success result', async () => {
            expect(service.deleteStarships(1)).toEqual({ "success": true })
        })
    })
})