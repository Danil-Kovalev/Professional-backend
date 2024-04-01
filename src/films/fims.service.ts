import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageOptionsDto } from "../dto/pageDto/page-options.dto";
import { PageDto } from "../dto/pageDto/page.dto";
import { ReturnFilmsDto } from "./dto/returnFilmsDto.dto";
import { PageMetaDto } from "../dto/pageDto/page-meta.dto";
import { CreateFilmsDto } from "./dto/createFilmsDto.dto";

import { Films } from "./entity/films.entity";
import { People } from "../peoples/entity/people.entity";
import { Starships } from "../starships/entity/starships.entity";
import { Vehicles } from "../vehicles/entity/vehicles.entity";
import { Species } from "../species/entity/species.entity";
import { Planets } from "../planets/entity/planets.entity";

import { formingUrl } from "../utils/formingUrl";




@Injectable()
export class FilmsService {
    constructor(
        @InjectRepository(Films)
        private filmsRepository: Repository<Films>
    ) { }

    /**
     * Gets all films with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all films
     */
    async getFilms(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnFilmsDto>> {
        let itemCount: number = await this.filmsRepository.count(); //get count all films from database

        // send request to database for gets data by params
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

        //check existence films in case of absence returns exception
        if (films === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        // sets url for daughter entity for receiving data instead it data
        films.map((dataFilms: ReturnFilmsDto) => {
            dataFilms.characters = dataFilms.characters ? dataFilms.characters.map((films) => films.url) : []
            dataFilms.starships = dataFilms.starships ? dataFilms.starships.map((starships) => starships.url) : []
            dataFilms.vehicles = dataFilms.vehicles ? dataFilms.vehicles.map((vehicles) => vehicles.url) : []
            dataFilms.species = dataFilms.species ? dataFilms.species.map((species) => species.url) : []
            dataFilms.planets = dataFilms.planets ? dataFilms.planets.map((planets) => planets.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(films, pageMetaDto);
    }

    /**
     * Gets film by id from database and sets url for dauther entity
     * @param idFilm for get data from database
     * @returns film entity
     */
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

    /**
     * Create film with new id and return data created entity
     * @param newFilm data for new entity
     * @returns created data
     */
    async createFilm(newFilm: CreateFilmsDto) {
        let index = await this.filmsRepository.count();
        index++;
        return this.updateFilms(index, newFilm)
    }

    /**
     * Update data and relations for film entity
     * @param idFilms found film from database by id
     * @param createFilms new data for update
     */
    updateFilms(idFilms: number, createFilms: CreateFilmsDto) {
        const films = this.filmsRepository.create(createFilms)

        films.id = idFilms;
        films.characters = createFilms.charactersIds.map(id => ({...new People(), id}))
        films.starships = createFilms.starshipsIds.map(id => ({...new Starships(), id}))
        films.vehicles = createFilms.vehiclesIds.map(id => ({...new Vehicles(), id}))
        films.species = createFilms.speciesIds.map(id => ({...new Species(), id}))
        films.planets = createFilms.planetsIds.map(id => ({...new Planets(), id}))
        films.url = formingUrl('films', idFilms)

        return this.filmsRepository.save(films)
    }

    /**
     * Delete film by id from database
     * @param idFilm for delete from database
     */
    deleteFilms(idFilm: number) {
        const film = this.filmsRepository.findOne({
            where: {
                id: idFilm
            }
        })

        if(film === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)
        
        this.filmsRepository.delete(idFilm)

        return { "success": true }
    }
}