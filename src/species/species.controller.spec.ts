import { Test, TestingModule } from '@nestjs/testing'
import { SpeciesController } from './species.controller'
import { SpeciesService } from './species.service'
import { CreateSpeciesDto } from './dto/createSpeciesDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('SpeciesController', () => {
    let service: SpeciesService
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

    const mockSpeciesService = {
        getSpecies: jest.fn().mockResolvedValueOnce([mockSpecie]),
        getSpecie: jest.fn().mockResolvedValueOnce([mockSpecie]),
        createSpecie: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateSpecies: jest.fn(dto => {
            return { ...mockSpecie, average_lifespan: 100 }
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
        service = module.get<SpeciesService>(SpeciesService)
    })

    it('should be defined specie', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllSpecies', () => {
        it('should be get all Species', async () => {
            const result = await service.getSpecies({ page: 1, skip: 0 });
            expect(service.getSpecies).toHaveBeenCalled()
            expect(result).toEqual([mockSpecie])
        })
    })

    describe('getSpecieById', () => {
        it('should be get Specie', async () => {
            const result = await service.getSpecie(1);
            expect(service.getSpecie).toHaveBeenCalled()
            expect(result).toEqual([mockSpecie])
        })
    })

    describe('createSpecie', () => {
        it('should be create Specie', async () => {
            const newSpecie: CreateSpeciesDto = { ...mockSpecie }
            const result = await service.createSpecie(newSpecie);

            expect(service.createSpecie).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockSpecie
            })
        })
    })

    describe('updateSpecie', () => {
        it('should be updated Specie', async () => {
            const updateSpecie = { ...mockSpecie, average_lifespan: 100 }
            const result = await service.updateSpecies(1, updateSpecie);

            expect(service.updateSpecies).toHaveBeenCalled()
            expect(result).toEqual(updateSpecie)
        })
    })

    describe('deleteSpecie', () => {
        it('should be deleted Specie and get success result', async () => {
            const result = await mockSpeciesService.deleteSpecies(1)

            expect(service.deleteSpecies).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})