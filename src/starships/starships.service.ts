import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Starships } from "./entity/starships.entity";
import { Films } from "../films/entity/films.entity";
import { People } from "../peoples/entity/people.entity";

import { PageMetaDto } from "../dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "../dto/pageDto/page-options.dto";
import { PageDto } from "../dto/pageDto/page.dto";
import { CreateStarshipsDto } from "./dto/createStarshipsDto.dto";
import { ReturnStarshipsDto } from "./dto/returnStarshipsDto.dto";

import { formingUrl } from "../utils/formingUrl";



@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starships)
        private starshipsRepository: Repository<Starships>
    ) { }

    /**
     * Gets all starships with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all starships
     */
    async getStarships(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnStarshipsDto>> {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount(); //get count all starships from database

        // send request to database for gets data by params
        let starships: ReturnStarshipsDto[] = await this.starshipsRepository.find({
            relations: {
                pilots: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (starships === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND) //check existence starships in case of absence returns exception

        // sets url for daughter entity for receiving data instead it data
        starships.map((dataStarships: ReturnStarshipsDto) => {
            dataStarships.pilots = dataStarships.pilots ? dataStarships.pilots.map((peoples) => peoples.url) : []
            dataStarships.films = dataStarships.films ? dataStarships.films.map((films) => films.url) : []
        })
 
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(starships, pageMetaDto);
    }

    /**
     * Gets starship by id from database and sets url for dauther entity
     * @param idStarship for get data from database
     * @returns starship entity
     */
    async getStarship(idStarship: number): Promise<ReturnStarshipsDto> {
        let starships: ReturnStarshipsDto = await this.starshipsRepository.findOne({
            relations: {
                pilots: true,
                films: true
            },
            where: {
                id: idStarship
            }
        })

        if (starships === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        starships.pilots = starships.pilots ? starships.pilots.map((peoples) => peoples.url) : []
        starships.films = starships.films ? starships.films.map((films) => films.url) : []

        return starships;
    }

    /**
     * Create starship with new id and return data created entity
     * @param newStarship data for new entity
     * @returns created data
     */
    async createStarship(newStarship: CreateStarshipsDto) {
        let index = await this.starshipsRepository.count();
        index++;
        return this.updateStarships(index, newStarship)
    }

    /**
     * Update data and relations for starship entity
     * @param idStarships found starship from database by id
     * @param createStarships new data for update
     */
    updateStarships(idStarships: number, createStarships: CreateStarshipsDto) {
        const starships = this.starshipsRepository.create(createStarships)

        starships.id = idStarships;
        starships.pilots = createStarships.pilotsIds.map(id => ({...new People(), id}))
        starships.films = createStarships.filmsIds.map(id => ({...new Films(), id}))
        starships.url = formingUrl('starships', idStarships)

        return this.starshipsRepository.save(starships);
    }

    /**
     * Delete starship by id from database
     * @param idStarship for delete from database
     */
    deleteStarships(idStarship: number) {
        this.starshipsRepository.delete(idStarship)

        return { "success": true }
    }
}