import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageMetaDto } from 'src/dto/pageDto/page-meta.dto';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { PeopleDto } from 'src/dto/peoplesDto/people.dto';
import { People } from 'src/entity/people.entity';
import { CreatePeopleDto } from 'src/dto/peoplesDto/createPeople.dto';
import { Films } from 'src/entity/films.entity';
import { Planets } from 'src/entity/planets.entity';
import { Species } from 'src/entity/species.entity';
import { Vehicles } from 'src/entity/vehicles.entity';
import { Starships } from 'src/entity/starships.entity';

@Injectable()
export class PeoplesService {

    constructor(
        @InjectRepository(People)
        private peopleRepository: Repository<People>,
    ) { }

    async getPeoples(pageOptionsDto: PageOptionsDto): Promise<PageDto<PeopleDto>> {
        let itemCount: number = await this.peopleRepository.createQueryBuilder().getCount();
        let data = await this.peopleRepository.find({
            relations: {
                homeworld: true,
                films: true,
                species: true,
                vehicles: true,
                starships: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createIndexPeople(): Promise<number> {
        let itemCount: number = await this.peopleRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    updatePeople(idPeople: number, createPeople: CreatePeopleDto) {
        const peoples = this.peopleRepository.create(createPeople)

        peoples.homeworld = createPeople.homeworldIds.map(id => ({...new Planets(), id}));
        peoples.films = createPeople.filmsIds.map(id => ({...new Films(), id}))
        peoples.species = createPeople.speciesIds.map(id => ({...new Species(), id}))
        peoples.vehicles = createPeople.vehiclesIds.map(id => ({...new Vehicles(), id}))
        peoples.starships = createPeople.starshipsIds.map(id => ({...new Starships(), id}))

        let newPeople = {
            id: idPeople,
            name: createPeople.name,
            height: createPeople.height,
            mass: createPeople.mass,
            hair_color: createPeople.hair_color,
            skin_color: createPeople.skin_color,
            eye_color: createPeople.eye_color,
            birth_year: createPeople.birth_year,
            gender: createPeople.gender,
            homeworld: peoples.homeworld,
            films: peoples.films,
            species: peoples.species,
            vehicles: peoples.vehicles,
            starships: peoples.starships
        }

        this.peopleRepository.save(newPeople);
    }

    deletePeople(id: number) {
        this.peopleRepository.delete(id)
    }
}