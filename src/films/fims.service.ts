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

    async createFilms(essence: CreateFilmsDto) {
        let itemCount: number = await this.filmsRepository.createQueryBuilder().getCount();
        const films = this.filmsRepository.create(essence)

        films.characters = essence.charactersIds.map(id => ({...new People(), id}))
        films.starships = essence.starshipsIds.map(id => ({...new Starships(), id}))
        films.vehicles = essence.vehiclesIds.map(id => ({...new Vehicles(), id}))
        films.species = essence.speciesIds.map(id => ({...new Species(), id}))
        films.planets = essence.planetsIds.map(id => ({...new Planets(), id}))

        let newFilms = {
            id: itemCount + 1,
            title: essence.title,
            episode_id: essence.episode_id,
            opening_crawl: essence.opening_crawl,
            director: essence.director,
            producer: essence.producer,
            release_date: essence.release_date,
            characters: films.characters,
            starships: films.starships,
            vehicles: films.vehicles,
            species: films.species,
            planets: films.planets
        }

        this.filmsRepository.save(newFilms)
    }

    updateFilms(id: number, editFilms: FilmsDto) {
        const queryBuilder = this.filmsRepository.createQueryBuilder();
        queryBuilder
            .update()
            .set(editFilms)
            .where("id = :idPeople", { idPeople: id })
            .execute();
    }

    deleteFilms(id: number) {
        this.filmsRepository.delete(id)
    }
}