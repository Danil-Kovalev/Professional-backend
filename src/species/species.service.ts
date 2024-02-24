import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { spec } from "node:test/reporters";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateSpeciesDto } from "src/dto/speciesDto/createSpeciesDto.dto";
import { SpeciesDto } from "src/dto/speciesDto/species.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Planets } from "src/entity/planets.entity";
import { Species } from "src/entity/species.entity";
import { Repository } from "typeorm";


@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private speciesRepository: Repository<Species>,

        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }

    async getSpecies(pageOptionsDto: PageOptionsDto): Promise<PageDto<SpeciesDto>> {
        let itemCount: number = await this.speciesRepository.createQueryBuilder().getCount();
        let data = await this.speciesRepository.find({
            relations: {
                planets: true,
                people: true,
                films: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createSpecies(essence: CreateSpeciesDto) {
        let itemCount: number = await this.speciesRepository.createQueryBuilder().getCount();
        const species = this.speciesRepository.create(essence)

        const planets = await this.planetsRepository.findOne({
            where: {
                id: essence.planetsIds
            }
        })

        species.planets = planets
        species.people = essence.peopleIds.map(id => ({...new People(), id}))
        species.films = essence.filmsIds.map(id => ({...new Films(), id}))

        let newSpecies = {
            id: itemCount + 1,
            name: essence.name,
            classification: essence.classification,
            designation: essence.designation,
            average_heigh: essence.average_heigh,
            skin_colors: essence.skin_colors,
            hair_colors: essence.hair_colors,
            eye_colors: essence.eye_colors,
            average_lifespan: essence.average_lifespan,
            planets_id: essence.planetsIds,
            language: essence.language,
            people: species.people,
            films: species.films
        }
        this.speciesRepository.save(newSpecies)
    }

    updateSpecies(id: number, editSpecies: SpeciesDto) {
        const queryBuilder = this.speciesRepository.createQueryBuilder();
        queryBuilder
            .update()
            .set(editSpecies)
            .where("id = :idSpecies", { idSpecies: id })
            .execute();
    }

    deleteSpecies(id: number) {
        this.speciesRepository.delete(id)
    }
}