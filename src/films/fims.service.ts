import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFilmsDto } from "src/dto/filmsDto/createFilmsDto.dto";
import { ReturnFilmsDto } from "src/dto/filmsDto/returnFilmsDto.dto";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Planets } from "src/entity/planets.entity";
import { Species } from "src/entity/species.entity";
import { Starships } from "src/entity/starships.entity";
import { Vehicles } from "src/entity/vehicles.entity";
import { formingUrl } from "src/utils/formingUrl";
import { Repository } from "typeorm";


@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Films)
        private filmsRepository: Repository<Films>
    ) { }

    async getFilms(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnFilmsDto>> {
        let itemCount: number = await this.filmsRepository.createQueryBuilder().getCount();
        let films: ReturnFilmsDto[] = await this.filmsRepository.find({
            relations: {
                characters: true,
                starships: true,
                vehicles: true,
                species: true,
                planets: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (films === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        films.map((dataFilms: ReturnFilmsDto) => {
            dataFilms.characters = dataFilms.characters ? dataFilms.characters.map((films) => films.url) : []
            dataFilms.starships = dataFilms.starships ? dataFilms.starships.map((starships) => starships.url) : []
            dataFilms.vehicles = dataFilms.vehicles ? dataFilms.vehicles.map((vehicles) => vehicles.url) : []
            dataFilms.species = dataFilms.species ? dataFilms.species.map((species) => species.url) : []
            dataFilms.planets = dataFilms.planets ? dataFilms.planets.map((planets) => planets.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(films, pageMetaDto);
    }

    async getFilm(idFilm: number): Promise<ReturnFilmsDto> {
        let films: ReturnFilmsDto = await this.filmsRepository.findOne({
            relations: {
                characters: true,
                species: true,
                vehicles: true,
                starships: true,
                planets: true
            },
            where: {
                id: idFilm
            }
        })

        if (films === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        films.characters = films.characters ? films.characters.map((people) => people.url) : []
        films.species = films.species ? films.species.map((species) => species.url) : []
        films.vehicles = films.vehicles ? films.vehicles.map((vehicles) => vehicles.url) : []
        films.starships = films.starships ? films.starships.map((starships) => starships.url) : []
        films.planets = films.planets ? films.planets.map((planets) => planets.url) : []

        return films;
    }

    async createIndexFilms(): Promise<number> {
        let itemCount: number = await this.filmsRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    updateFilms(idFilms: number, createFilms: CreateFilmsDto) {
        const films = this.filmsRepository.create(createFilms)

        films.id = idFilms;
        films.characters = createFilms.charactersIds.map(id => ({...new People(), id}))
        films.starships = createFilms.starshipsIds.map(id => ({...new Starships(), id}))
        films.vehicles = createFilms.vehiclesIds.map(id => ({...new Vehicles(), id}))
        films.species = createFilms.speciesIds.map(id => ({...new Species(), id}))
        films.planets = createFilms.planetsIds.map(id => ({...new Planets(), id}))
        films.url = formingUrl('films', idFilms)

        this.filmsRepository.save(films)
    }

    deleteFilms(idFilm: number) {
        const film = this.filmsRepository.findOne({
            where: {
                id: idFilm
            }
        })

        if(film === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)
        
        this.filmsRepository.delete(idFilm)
    }
}