import { Test, TestingModule } from '@nestjs/testing'
import { FilmsController } from './films.controller';
import { FilmsService } from './fims.service';
import { CreateFilmsDto } from './dto/createFilmsDto.dto';
import { PassportModule } from '@nestjs/passport';

describe('FilmsController', () => {
    let service: FilmsService
    let controller: FilmsController;

    const mockFilm = {
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "It is a period of civil war.",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: new Date(),
        charactersIds: [],
        starshipsIds: [],
        vehiclesIds: [],
        speciesIds: [],
        planetsIds: [],
    }

    const mockFilmsService = {
        getFilms: jest.fn().mockResolvedValueOnce([mockFilm]),
        getFilm: jest.fn().mockResolvedValueOnce([mockFilm]),
        createFilm: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateFilms: jest.fn(dto => {
            return { ...mockFilm, episode_id: 5 }
        }),
        deleteFilms: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [FilmsController],
            providers: [FilmsService],
        }).overrideProvider(FilmsService).useValue(mockFilmsService).compile();

        controller = module.get<FilmsController>(FilmsController)
        service = module.get<FilmsService>(FilmsService)
    })

    it('should be defined film', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllFilms', () => {
        it('should be get all films', async () => {
            const result = await service.getFilms({ page: 1, skip: 0 });
            expect(service.getFilms).toHaveBeenCalled()
            expect(result).toEqual([mockFilm])
        })
    })

    describe('getFilmById', () => {
        it('should be get film', async () => {
            const result = await service.getFilm(1);
            expect(service.getFilm).toHaveBeenCalled()
            expect(result).toEqual([mockFilm])
        })
    })

    describe('createFilm', () => {
        it('should be create film', async () => {
            const newFilm: CreateFilmsDto = { ...mockFilm }

            const result = await service.createFilm(newFilm);

            expect(service.createFilm).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockFilm
            })
        })
    })

    describe('updateFilm', () => {
        it('should be updated film', async () => {
            const updateFilm = { ...mockFilm, episode_id: 5 }
            const result = await service.updateFilms(1, updateFilm);

            expect(service.updateFilms).toHaveBeenCalled()
            expect(result).toEqual(updateFilm)
        })
    })

    describe('deleteFilm', () => {
        it('should be deleted film and get success result', async () => {
            const result = await mockFilmsService.deleteFilms(1)

            expect(service.deleteFilms).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})