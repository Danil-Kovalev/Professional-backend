import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageMetaDto } from 'src/dto/pageDto/page-meta.dto';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { People } from 'src/entity/people.entity';
import { CreatePeopleDto } from 'src/dto/peoplesDto/createPeople.dto';
import { Films } from 'src/entity/films.entity';
import { Planets } from 'src/entity/planets.entity';
import { Species } from 'src/entity/species.entity';
import { Vehicles } from 'src/entity/vehicles.entity';
import { Starships } from 'src/entity/starships.entity';
import { Images } from 'src/entity/images.entity';
import { formingUrl } from 'src/utils/formingUrl';
import { ReturnPeopleDto } from 'src/dto/peoplesDto/returnPeople.dto';

@Injectable()
export class PeoplesService {

    constructor(
        @InjectRepository(People)
        private peopleRepository: Repository<People>,
    ) { }

    /**
     * Gets all peoples with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all peoples
     */
    async getPeoples(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPeopleDto>> {
        let itemCount: number = await this.peopleRepository.createQueryBuilder().getCount(); //get count all peoples from database

        // send request to database for gets data by params
        let people: ReturnPeopleDto[] = await this.peopleRepository.find({
            relations: {
                homeworld: true,
                films: true,
                species: true,
                vehicles: true,
                starships: true,
                images: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        //check existence peoples in case of absence returns exception
        if (people === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        // sets url for daughter entity for receiving data instead it data
        people.map((dataPeople: ReturnPeopleDto) => {
            dataPeople.homeworld = dataPeople.homeworld ? dataPeople.homeworld.map((planet) => planet.url) : []
            dataPeople.films = dataPeople.films ? dataPeople.films.map((films) => films.url) : []
            dataPeople.species = dataPeople.species ? dataPeople.species.map((species) => species.url) : []
            dataPeople.vehicles = dataPeople.vehicles ? dataPeople.vehicles.map((vehicles) => vehicles.url) : []
            dataPeople.starships = dataPeople.starships ? dataPeople.starships.map((starships) => starships.url) : []
            dataPeople.images = dataPeople.images ? dataPeople.images.map((images) => images.url) : []
        })
 
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(people, pageMetaDto);
    }

    /**
     * Gets people by id from database and sets url for dauther entity
     * @param idPeople for get data from database
     * @returns people entity
     */
    async getPeople(idPeople: number): Promise<ReturnPeopleDto> {
        let people: ReturnPeopleDto = await this.peopleRepository.findOne({
            relations: {
                homeworld: true,
                films: true,
                species: true,
                vehicles: true,
                starships: true,
                images: true
            },
            where: {
                id: idPeople
            }
        })

        if (people === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        people.homeworld = people.homeworld ? people.homeworld.map((planet) => planet.url) : []
        people.films = people.films ? people.films.map((films) => films.url) : []
        people.species = people.species ? people.species.map((species) => species.url) : []
        people.vehicles = people.vehicles ? people.vehicles.map((vehicles) => vehicles.url) : []
        people.starships = people.starships ? people.starships.map((starships) => starships.url) : []
        people.images = people.images ? people.images.map((images) => images.url) : []

        return people;

    }

    /**
     * Create index for new entity by last id from database
     * @returns new id for entity
     */
    async createIndexPeople(): Promise<number> {
        let itemCount: number = await this.peopleRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    /**
     * Update data and relations for people entity
     * @param idPeople found people from database by id
     * @param createPeople new data for update
     */
    updatePeople(idPeople: number, createPeople: CreatePeopleDto) {
        const peoples = this.peopleRepository.create(createPeople)

        peoples.id = idPeople
        peoples.homeworld = createPeople.homeworldIds.map(id => ({ ...new Planets(), id }));
        peoples.films = createPeople.filmsIds.map(id => ({ ...new Films(), id }))
        peoples.species = createPeople.speciesIds.map(id => ({ ...new Species(), id }))
        peoples.vehicles = createPeople.vehiclesIds.map(id => ({ ...new Vehicles(), id }))
        peoples.starships = createPeople.starshipsIds.map(id => ({ ...new Starships(), id }))
        peoples.images = createPeople.imagesIds.map(id => ({ ...new Images(), id }))
        peoples.url = formingUrl('peoples', idPeople)

        this.peopleRepository.save(peoples);
    }

    /**
     * Delete people by id from database
     * @param idPeople for delete from database
     */
    deletePeople(idPeople: number) {
        const people = this.peopleRepository.findOne({
            where: {
                id: idPeople
            }
        })

        if(people === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        this.peopleRepository.delete(idPeople)
    }
}