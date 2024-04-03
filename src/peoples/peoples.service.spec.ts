import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { PeoplesService } from './peoples.service';
import { People } from './entity/people.entity';

describe('PeoplesService', () => {
    let service: PeoplesService;
    let peoplesRepository: Repository<People>;

    const mockPeople = {
        name: "Danylo",
        height: 180,
        mass: 87,
        hair_color: "brown",
        skin_color: "white",
        eye_color: "brown",
        birth_year: "13.06.2003",
        gender: "male",
        url: 'http://localhost:4000/peoples/1',
        homeworldIds: [],
        filmsIds: [],
        speciesIds: [],
        vehiclesIds: [],
        starshipsIds: [],
        imagesIds: []
    }

    const mockReturnPeople = {
        id: 1,
        name: "Danylo",
        height: 180,
        mass: 87,
        hair_color: "brown",
        skin_color: "white",
        eye_color: "brown",
        birth_year: "13.06.2003",
        gender: "male",
        url: 'http://localhost:4000/peoples/1',
        homeworldIds: [],
        filmsIds: [],
        speciesIds: [],
        vehiclesIds: [],
        starshipsIds: [],
        imagesIds: []
    }

    const mockReturnPeoples = {
        data: [{
            ...mockReturnPeople
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

    const mockPeoplesRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnPeople]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnPeople)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PeoplesService, {
                provide: getRepositoryToken(People, dataSourceOptions),
                useValue: mockPeoplesRepository
            }],
        }).compile();

        service = module.get<PeoplesService>(PeoplesService)
        peoplesRepository = module.get<Repository<People>>(getRepositoryToken(People))

    })

    it('should be defined peoples service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined peoples repository', () => {
        expect(peoplesRepository).toBeDefined();
    })

    describe('getPeoples', () => {
        it('should be return peoples with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getPeoples(dto)).toEqual(mockReturnPeoples)
        })
    })

    describe('getPeople', () => {
        it('should be return people with data', async () => {
            expect(await service.getPeople(1)).toEqual(mockReturnPeople)
        })
    })

    describe('createPeoples', () => {
        it('should be create people and return it data', async () => {
            expect(await service.createPeople(mockPeople)).toEqual(mockPeople)
        })
    })

    describe('updatePeople', () => {
        it('should be update people and return it data', async () => {
            const dto = { ...mockPeople, episode_id: 5 }
            expect(await service.updatePeople(1, dto)).toEqual(dto)
        })
    })

    describe('deletePeople', () => {
        it('should be delete people and return success result', async () => {
            expect(service.deletePeople(1)).toEqual({ "success": true })
        })
    })
})