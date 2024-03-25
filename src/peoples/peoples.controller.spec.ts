import { Test, TestingModule } from '@nestjs/testing'
import { PeoplesController } from './peoples.controller'
import { PeoplesService } from './peoples.service';
import { CreatePeopleDto } from '../dto/peoplesDto/createPeople.dto';
import { PassportModule } from '@nestjs/passport';

describe('PeoplesController', () => {
    let service: PeoplesService
    let controller: PeoplesController;

    const mockPeople = {
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

    const mockPeoplesService = {
        getPeoples: jest.fn().mockResolvedValueOnce([mockPeople]),
        getPeople: jest.fn().mockResolvedValueOnce([mockPeople]),
        createPeople: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updatePeople: jest.fn(dto => {
            return { ...mockPeople, mass: 90 }
        }),
        deletePeople: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [PeoplesController],
            providers: [PeoplesService],
        }).overrideProvider(PeoplesService).useValue(mockPeoplesService).compile();

        controller = module.get<PeoplesController>(PeoplesController)
        service = module.get<PeoplesService>(PeoplesService)
    })

    it('should be defined people', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllPeoples', () => {
        it('should be get all people', async () => {
            const result = await service.getPeoples({ page: 1, skip: 0 });
            expect(service.getPeoples).toHaveBeenCalled()
            expect(result).toEqual([mockPeople])
        })
    })

    describe('getPeopleById', () => {
        it('should be get people', async () => {
            const result = await service.getPeople(1);
            expect(service.getPeople).toHaveBeenCalled()
            expect(result).toEqual([mockPeople])
        })
    })

    describe('createPeople', () => {
        it('should be create people', async () => {
            const newPeople: CreatePeopleDto = {
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

            const result = await service.createPeople(newPeople);

            expect(service.createPeople).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockPeople
            })
        })
    })

    describe('updatePeople', () => {
        it('should be updated people', async () => {
            const updatePeople = { ...mockPeople, mass: 90 }
            const result = await service.updatePeople(1, updatePeople);

            expect(service.updatePeople).toHaveBeenCalled()
            expect(result).toEqual(updatePeople)
        })
    })

    describe('deletePeople', () => {
        it('should be deleted people and get success result', async () => {
            const result = await mockPeoplesService.deletePeople(1)

            expect(service.deletePeople).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})