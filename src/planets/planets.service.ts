import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlanetsDto } from "src/dto/planetsDto/createPlanets.dto";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { PlanetsDto } from "src/dto/planetsDto/planets.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Planets } from "src/entity/planets.entity";
import { Repository } from "typeorm";


@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }


    async getPlanets(pageOptionsDto: PageOptionsDto): Promise<PageDto<PlanetsDto>> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount();
        let data = await this.planetsRepository.find({
            relations: {
                residents: true,
                films: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createIndexPlanet(): Promise<number> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    updatePlanets(idPlanets: number, createPlanets: CreatePlanetsDto) {
        const planets = this.planetsRepository.create(createPlanets)

        planets.residents = createPlanets.residentsIds.map(id => ({...new People(), id}))
        planets.films = createPlanets.filmsIds.map(id => ({...new Films(), id}))

        let newPlanet = {
            id: idPlanets,
            name: createPlanets.name,
            rotation_period: createPlanets.rotation_period,
            orbital_period: createPlanets.orbital_period,
            diameter: createPlanets.diameter,
            climate: createPlanets.climate,
            gravity: createPlanets.gravity,
            terrain: createPlanets.terrain,
            surface_water: createPlanets.surface_water,
            population: createPlanets.population,
            residents: planets.residents,
            films: planets.films
        }
        
        this.planetsRepository.save(newPlanet)
    }

    deletePlanets(id: number) {
        this.planetsRepository.delete(id)
    }
}