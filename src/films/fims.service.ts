import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFilmsDto } from "src/dto/filmsDto/createFilmsDto.dto";
import { FilmsDto } from "src/dto/filmsDto/films.dto";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Planets } from "src/entity/planets.entity";
import { Species } from "src/entity/species.entity";
import { Starships } from "src/entity/starships.entity";
import { Vehicles } from "src/entity/vehicles.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Films)
        private filmsRepository: Repository<Films>
    ) { }

    async getFilms(pageOptionsDto: PageOptionsDto): Promise<PageDto<FilmsDto>> {
        let itemCount: number = await this.filmsRepository.createQueryBuilder().getCount();
        let data = await this.filmsRepository.find({
            relations: {
                characters: true,
                starships: true,
                vehicles: true,
                species: true,
                planets: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createIndexFilms(): Promise<number> {
        let itemCount: number = await this.filmsRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    updateFilms(idFilms: number, createFilms: CreateFilmsDto) {
        const films = this.filmsRepository.create(createFilms)

        films.characters = createFilms.charactersIds.map(id => ({...new People(), id}))
        films.starships = createFilms.starshipsIds.map(id => ({...new Starships(), id}))
        films.vehicles = createFilms.vehiclesIds.map(id => ({...new Vehicles(), id}))
        films.species = createFilms.speciesIds.map(id => ({...new Species(), id}))
        films.planets = createFilms.planetsIds.map(id => ({...new Planets(), id}))

        let newFilms = {
            id: idFilms,
            title: createFilms.title,
            episode_id: createFilms.episode_id,
            opening_crawl: createFilms.opening_crawl,
            director: createFilms.director,
            producer: createFilms.producer,
            release_date: createFilms.release_date,
            characters: films.characters,
            starships: films.starships,
            vehicles: films.vehicles,
            species: films.species,
            planets: films.planets
        }

        this.filmsRepository.save(newFilms)
    }

    deleteFilms(id: number) {
        this.filmsRepository.delete(id)
    }
}