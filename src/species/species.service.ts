import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { spec } from "node:test/reporters";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateSpeciesDto } from "src/dto/speciesDto/createSpeciesDto.dto";
import { ReturnSpeciesDto } from "src/dto/speciesDto/returnSpeciesDto.dto";
import { Films } from "src/entity/films.entity";
import { Planets } from "src/entity/planets.entity";
import { Species } from "src/entity/species.entity";
import { Repository } from "typeorm";
import { formingUrl } from "src/utils/formingUrl";
import { People } from "src/entity/people.entity";


@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,

        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }

    async getSpecies(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnSpeciesDto>> {
        let itemCount: number = await this.speciesRepository.createQueryBuilder().getCount();
        let species: ReturnSpeciesDto[] = await this.speciesRepository.find({
            relations: {
                planet: true,
                people: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (species === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        species.map((dataSpecies: ReturnSpeciesDto) => {
            let planet: Planets = dataSpecies.planet as Planets
            dataSpecies.planet = dataSpecies.planet as Planets ? planet.url : ""
            dataSpecies.people = dataSpecies.people ? dataSpecies.people.map((peoples) => peoples.url) : []
            dataSpecies.films = dataSpecies.films ? dataSpecies.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(species, pageMetaDto);
    }

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

    async createIndexSpecies(): Promise<number> {
        let itemCount: number = await this.speciesRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

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
    
        this.speciesRepository.save(species)
    }

    async deleteSpecies(idSpecie: number) {
        const specie = this.speciesRepository.findOne({
            where: {
                id: idSpecie
            }
        })

        if(specie === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        this.speciesRepository.delete(idSpecie)
    }
}