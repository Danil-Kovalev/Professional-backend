import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageMetaDto } from "../dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "../dto/pageDto/page-options.dto";
import { PageDto } from "../dto/pageDto/page.dto";
import { CreatePlanetsDto } from "./dto/createPlanets.dto";
import { ReturnPlanetsDto } from "./dto/returnPlanetsDto.dto";

import { Films } from "../films/entity/films.entity";
import { People } from "../peoples/entity/people.entity";
import { Planets } from "./entity/planets.entity";

import { formingUrl } from "../utils/formingUrl";



@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }

    /**
     * Gets all planets with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all planets
     */
    async getPlanets(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPlanetsDto>> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount(); //get count all planets from database

        // send request to database for gets data by params
        let planets: ReturnPlanetsDto[] = await this.planetsRepository.find({
            relations: {
                residents: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (planets === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND) //check existence planets in case of absence returns exception

         // sets url for daughter entity for receiving data instead it data
        planets.map((dataPlanets: ReturnPlanetsDto) => {
            dataPlanets.residents = dataPlanets.residents ? dataPlanets.residents.map((people) => people.url) : []
            dataPlanets.films = dataPlanets.films ? dataPlanets.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(planets, pageMetaDto);
    }

    /**
     * Gets planet by id from database and sets url for dauther entity
     * @param idPlanet for get data from database
     * @returns planet entity
     */
    async getPlanet(idPlanet: number): Promise<ReturnPlanetsDto> {
        let planet: ReturnPlanetsDto = await this.planetsRepository.findOne({
            relations: {
                residents: true,
                films: true
            },
            where: {
                id: idPlanet
            }
        })

        if (planet === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        planet.residents = planet.residents ? planet.residents.map((people) => people.url) : []
        planet.films = planet.films ? planet.films.map((films) => films.url) : []

        return planet;
    }

     /**
     * Create planet with new id and return data created entity
     * @param newPlanet data for new entity
     * @returns created data
     */
     async createPlanet(newPlanet: CreatePlanetsDto) {
        let index = await this.createIndexPlanet();
        return this.updatePlanets(index, newPlanet)
    }

    /**
     * Create index for new entity by last id from database
     * @returns new id for entity
     */
    async createIndexPlanet(): Promise<number> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    /**
     * Update data and relations for planet entity
     * @param idPlanets found planet from database by id
     * @param createPlanets new data for update
     */
    updatePlanets(idPlanets: number, createPlanets: CreatePlanetsDto) {
        const planets = this.planetsRepository.create(createPlanets)

        planets.id = idPlanets;
        planets.residents = createPlanets.residentsIds.map(id => ({...new People(), id}))
        planets.films = createPlanets.filmsIds.map(id => ({...new Films(), id}))
        planets.url = formingUrl('planets', idPlanets)
        
        return this.planetsRepository.save(planets)
    }

    /**
     * Delete planet by id from database
     * @param idPlanet for delete from database
     */
    deletePlanets(idPlanet: number) {
        const planet = this.planetsRepository.find({
            where: {
                id: idPlanet
            }
        })

        if (planet === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        this.planetsRepository.delete(idPlanet)

        return { "success": true }
    }
}