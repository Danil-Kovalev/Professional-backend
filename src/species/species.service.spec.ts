import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { SpeciesService } from './species.service';
import { Species } from './entity/species.entity';


describe('PeoplesService', () => {
    let service: SpeciesService;
    let speciesRepository: Repository<Species>;

    const mockSpecie = {
        name: "Human",
        classification: "mammal",
        designation: "sentient",
        average_heigh: 180,
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        hair_colors: "blonde, brown, black, red",
        average_lifespan: 120,
        planetsIds: 1,
        language: "Galactic Basic",
        peopleIds: [],
        filmsIds: []
    }

    const mockReturnSpecie = {
        id: 1,
        name: "Human",
        classification: "mammal",
        designation: "sentient",
        average_heigh: 180,
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        hair_colors: "blonde, brown, black, red",
        average_lifespan: 120,
        planetsIds: 1,
        language: "Galactic Basic",
        peopleIds: [],
        filmsIds: []
    }

    const mockReturnSpecies = {
        data: [{
            ...mockReturnSpecie
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

    const mockSpeciesRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnSpecie]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnSpecie)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SpeciesService, {
                provide: getRepositoryToken(Species, dataSourceOptions),
                useValue: mockSpeciesRepository
            }],
        }).compile();

        service = module.get<SpeciesService>(SpeciesService)
        speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species))

    })

    it('should be defined species service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined species repository', () => {
        expect(speciesRepository).toBeDefined();
    })

    describe('getSpecies', () => {
        it('should be return species with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getSpecies(dto)).toEqual(mockReturnSpecies)
        })
    })

    describe('getSpecie', () => {
        it('should be return specie with data', async () => {
            expect(await service.getSpecie(1)).toEqual(mockReturnSpecie)
        })
    })

    describe('createSpecies', () => {
        it('should be create specie and return it data', async () => {
            expect(await service.createSpecie(mockSpecie)).toEqual(mockSpecie)
        })
    })

    describe('updateSpecies', () => {
        it('should be update species and return it data', async () => {
            const dto = { ...mockSpecie, episode_id: 5 }
            expect(await service.updateSpecies(1, dto)).toEqual(dto)
        })
    })

    describe('deleteSpecies', () => {
        it('should be delete specie and return success result', async () => {
            expect(service.deleteSpecies(1)).toEqual({ "success": true })
        })
    })
})