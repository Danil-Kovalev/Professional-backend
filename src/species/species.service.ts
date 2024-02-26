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

        species.planets = planets
        species.people = createSpecies.peopleIds.map(id => ({ ...new People(), id }))
        species.films = createSpecies.filmsIds.map(id => ({ ...new Films(), id }))
    
        let newSpecies = {
            id: idSpecies,
            name: createSpecies.name,
            classification: createSpecies.classification,
            designation: createSpecies.designation,
            average_heigh: createSpecies.average_heigh,
            skin_colors: createSpecies.skin_colors,
            hair_colors: createSpecies.hair_colors,
            eye_colors: createSpecies.eye_colors,
            average_lifespan: createSpecies.average_lifespan,
            language: createSpecies.language,
            planets,
            people: species.people,
            films: species.films
        }
        this.speciesRepository.save(newSpecies)
    }

    async deleteSpecies(idDelete: number) {
        this.speciesRepository.delete(idDelete)
    }
}