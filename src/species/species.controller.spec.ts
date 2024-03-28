import { Test, TestingModule } from '@nestjs/testing'
import { SpeciesController } from './species.controller'
import { SpeciesService } from './species.service'
import { CreateSpeciesDto } from './dto/createSpeciesDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('SpeciesController', () => {
    let controller: SpeciesController;

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

    const mockReturnUpdateSpecie = {
        name: "Human",
        classification: "mammal",
        designation: "sentient",
        average_heigh: 180,
        skin_colors: "caucasian, black, asian, hispanic",
        eye_colors: "brown, blue, green, hazel, grey, amber",
        hair_colors: "blonde, brown, black, red",
        average_lifespan: 100,
        planetsIds: 1,
        language: "Galactic Basic",
        peopleIds: [],
        filmsIds: []
    }

    const mockSpeciesService = {
        getSpecies: jest.fn().mockResolvedValueOnce(mockReturnSpecie),
        getSpecie: jest.fn().mockResolvedValueOnce(mockReturnSpecie),
        createSpecie: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateSpecies: jest.fn((id, dto) => {
            return { id, ...dto }
        }),
        deleteSpecies: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [SpeciesController],
            providers: [SpeciesService],
        }).overrideProvider(SpeciesService).useValue(mockSpeciesService).compile();

        controller = module.get<SpeciesController>(SpeciesController)
    })

    it('should be defined specie', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllSpecies', () => {
        it('should be get all Species', async () => {
            const dto = { page: 1, skip: 0 };
            
            expect(await controller.getSpecies(dto)).toEqual(mockReturnSpecie)
            expect(mockSpeciesService.getSpecies).toHaveBeenCalledWith(dto)
        })
    })

    describe('getSpecieById', () => {
        it('should be get Specie', async () => {
            const dto = 1;
            
            expect(await controller.getSpecie(dto)).toEqual(mockReturnSpecie)
            expect(mockSpeciesService.getSpecie).toHaveBeenCalled()
        })
    })

    describe('createSpecie', () => {
        it('should be create Specie', async () => {
            const newSpecie: CreateSpeciesDto = { ...mockSpecie }

            expect(await controller.createSpecies(newSpecie)).toEqual({
                id: expect.any(Number),
                ...mockSpecie
            })
            expect(mockSpeciesService.createSpecie).toHaveBeenCalledWith(newSpecie)
        })
    })

    describe('updateSpecie', () => {
        it('should be updated Specie', async () => {
            const updateSpecie = { ...mockSpecie, average_lifespan: 100 }

            expect(await controller.updateSpecies(1, updateSpecie)).toEqual({
                id: 1,
                ...mockReturnUpdateSpecie
            })
            expect(mockSpeciesService.updateSpecies).toHaveBeenCalled()
        })
    })

    describe('deleteSpecie', () => {
        it('should be deleted Specie and get success result', async () => {
            const dto = 1;

            expect(await controller.deleteSpecies(dto)).toEqual({ "success": true })
            expect(mockSpeciesService.deleteSpecies).toHaveBeenCalledWith(dto)
        })
    })
})