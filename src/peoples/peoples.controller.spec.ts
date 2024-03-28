import { Test, TestingModule } from '@nestjs/testing'
import { PeoplesController } from './peoples.controller'
import { PeoplesService } from './peoples.service';
import { CreatePeopleDto } from './dto/createPeople.dto';
import { PassportModule } from '@nestjs/passport';

describe('PeoplesController', () => {
    let controller: PeoplesController;

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

    const mockReturnUpdatePeople = {
        id: 1,
        name: "Danylo",
        height: 180,
        mass: 90,
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
        getPeoples: jest.fn().mockResolvedValueOnce(mockPeople),
        getPeople: jest.fn().mockResolvedValueOnce(mockPeople),
        createPeople: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updatePeople: jest.fn((id, dto) => {
            return { id, ...dto }
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
    })

    it('should be defined people', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllPeoples', () => {
        it('should be get all people', async () => {
            const dto = { page: 1, skip: 0 };
            expect(await controller.getPeoples(dto)).toEqual(mockReturnPeople)
            expect(mockPeoplesService.getPeoples).toHaveBeenCalledWith(dto)
        })
    })

    describe('getPeopleById', () => {
        it('should be get people', async () => {
            const dto = 1;
            
            expect(await controller.getPeople(dto)).toEqual(mockReturnPeople)
            expect(mockPeoplesService.getPeople).toHaveBeenCalledWith(dto)
        })
    })

    describe('createPeople', () => {
        it('should be create people', async () => {
            const newPeople: CreatePeopleDto = { ...mockPeople }

            expect(await controller.createPeoples(newPeople)).toEqual({
                id: expect.any(Number),
                ...mockPeople
            })

            expect(mockPeoplesService.createPeople).toHaveBeenCalledWith(newPeople)
        })
    })

    describe('updatePeople', () => {
        it('should be updated people', async () => {
            const updatePeople = { ...mockPeople, mass: 90 }

            expect(await controller.updatePeople(1, updatePeople)).toEqual({
                id: 1,
                ...mockReturnUpdatePeople
            })
            expect(mockPeoplesService.updatePeople).toHaveBeenCalled()
        })
    })

    describe('deletePeople', () => {
        it('should be deleted people and get success result', async () => {
            const dto = 1;

            expect(await controller.deletePeople(dto)).toEqual({ "success": true })
            expect(mockPeoplesService.deletePeople).toHaveBeenCalledWith(dto)
        })
    })
})