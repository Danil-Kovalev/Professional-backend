import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageMetaDto } from "../dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "../dto/pageDto/page-options.dto";
import { PageDto } from "../dto/pageDto/page.dto";
import { CreateSpeciesDto } from "./dto/createSpeciesDto.dto";
import { ReturnSpeciesDto } from "./dto/returnSpeciesDto.dto";

import { Films } from "../films/entity/films.entity";
import { People } from "../peoples/entity/people.entity";
import { Planets } from "../planets/entity/planets.entity";
import { Species } from "./entity/species.entity";

import { formingUrl } from "../utils/formingUrl";
;


@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,

        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }

    /**
     * Gets all species with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all species
     */
    async getSpecies(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnSpeciesDto>> {
        let itemCount: number = await this.speciesRepository.createQueryBuilder().getCount(); //get count all vehicles from database

        // send request to database for gets data by params
        let species: ReturnSpeciesDto[] = await this.speciesRepository.find({
            relations: {
                planet: true,
                people: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (species === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND) //check existence species in case of absence returns exception

        
        // sets url for daughter entity for receiving data instead it data
        species.map((dataSpecies: ReturnSpeciesDto) => {
            let planet: Planets = dataSpecies.planet as Planets
            dataSpecies.planet = dataSpecies.planet as Planets ? planet.url : ""
            dataSpecies.people = dataSpecies.people ? dataSpecies.people.map((peoples) => peoples.url) : []
            dataSpecies.films = dataSpecies.films ? dataSpecies.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(species, pageMetaDto);
    }

    /**
     * Gets specie by id from database and sets url for dauther entity
     * @param idSpecie for get data from database
     * @returns specie entity
     */
    async getSpecie(idSpecie: number): Promise<ReturnSpeciesDto> {
        let species: ReturnSpeciesDto = await this.speciesRepository.findOne({
            relations: {
                planet: true,
                people: true,
                films: true
            },
            where: {
                id: idSpecie
            }
        })

        if (species === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        let planet: Planets = species.planet as Planets

        species.planet = species.planet as Planets ? planet.url : ""
        species.people = species.people ? species.people.map((people) => people.url) : []
        species.films = species.films ? species.films.map((films) => films.url) : []

        return species;
    }

    /**
     * Create specie with new id and return data created entity
     * @param newSpecie data for new entity
     * @returns created data
     */
    async createSpecie(newSpecie: CreateSpeciesDto) {
        let index = await this.speciesRepository.count();
        index++;
        return this.updateSpecies(index, newSpecie)
    }

    /**
     * Update data and relations for specie entity
     * @param idSpecies found specie from database by id
     * @param createSpecies new data for update
     */
    async updateSpecies(idSpecies: number, createSpecies: CreateSpeciesDto) {
        const species = this.speciesRepository.create(createSpecies)

        const planets = await this.planetsRepository.findOne({
            where: {
                id: createSpecies.planetsIds
            }
        })

        species.id = idSpecies
        if (planets !== null) species.planet = planets
        species.people = createSpecies.peopleIds.map(id => ({ ...new People(), id }))
        species.films = createSpecies.filmsIds.map(id => ({ ...new Films(), id }))
        species.url = formingUrl('species', idSpecies)
    
        return this.speciesRepository.save(species)
    }

    /**
     * Delete specie by id from database
     * @param idSpecie for delete from database
     */
    async deleteSpecies(idSpecie: number) {
        const specie = this.speciesRepository.findOne({
            where: {
                id: idSpecie
            }
        })

        if(specie === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        this.speciesRepository.delete(idSpecie)
        
        return { "success": true }
    }
}