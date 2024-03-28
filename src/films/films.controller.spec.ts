import { Test, TestingModule } from '@nestjs/testing'
import { FilmsController } from './films.controller';
import { FilmsService } from './fims.service';
import { CreateFilmsDto } from './dto/createFilmsDto.dto';
import { PassportModule } from '@nestjs/passport';

describe('FilmsController', () => {
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

    const mockReturnFilm = {
        id: 1,
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
        planetsIds: []
    }

    const mockReturnUpdateFilm = {
        title: "A New Hope",
        episode_id: 5,
        opening_crawl: "It is a period of civil war.",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: new Date(),
        charactersIds: [],
        starshipsIds: [],
        vehiclesIds: [],
        speciesIds: [],
        planetsIds: []
    }

    const mockFilmsService = {
        getFilms: jest.fn().mockResolvedValueOnce(mockReturnFilm),
        getFilm: jest.fn().mockResolvedValueOnce(mockReturnFilm),
        createFilm: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateFilms: jest.fn((id, dto) => {
            return { id, ...dto }
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
    })

    it('should be defined film', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllFilms', () => {
        it('should be get all films', async () => {
            const dto = { page: 1, skip: 0 };

            expect(await controller.getFilms(dto)).toEqual(mockReturnFilm)
            expect(mockFilmsService.getFilms).toHaveBeenCalledWith(dto)
        })
    })

    describe('getFilmById', () => {
        it('should be get film', async () => {
            const dto = 1;
            expect(await controller.getFilm(1)).toEqual(mockReturnFilm)
            expect(mockFilmsService.getFilm).toHaveBeenCalledWith(dto)
        })
    })

    describe('createFilm', () => {
        it('should be create film', async () => {
            const newFilm: CreateFilmsDto = { ...mockFilm }

            expect(await controller.createFilms(newFilm)).toEqual({
                id: expect.any(Number),
                ...mockFilm
            })
            expect(mockFilmsService.createFilm).toHaveBeenCalledWith(newFilm)
        })
    })

    describe('updateFilm', () => {
        it('should be updated film', async () => {
            const updateFilm = { ...mockFilm, episode_id: 5 }

            expect(await controller.updateFilms(1, updateFilm)).toEqual({
                id: 1,
                ...mockReturnUpdateFilm
            })
            expect(mockFilmsService.updateFilms).toHaveBeenCalled()
        })
    })

    describe('deleteFilm', () => {
        it('should be deleted film and get success result', async () => {
            const dto = 1;
            expect(await controller.deleteFilms(1)).toEqual({ "success": true })
            expect(mockFilmsService.deleteFilms).toHaveBeenCalledWith(dto)
        })
    })
})