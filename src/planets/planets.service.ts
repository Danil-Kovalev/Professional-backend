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

    async createPlanet(essence: CreatePlanetsDto) {
        const queryBuilder = this.planetsRepository.createQueryBuilder();
        let itemCount: number = await queryBuilder.getCount();
        const planets = this.planetsRepository.create(essence)

        planets.residents = essence.residentsIds.map(id => ({...new People(), id}))
        planets.films = essence.filmsIds.map(id => ({...new Films(), id}))

        let newPlanet = {
            id: itemCount + 1,
            name: essence.name,
            rotation_period: essence.rotation_period,
            orbital_period: essence.orbital_period,
            diameter: essence.diameter,
            climate: essence.climate,
            gravity: essence.gravity,
            terrain: essence.terrain,
            surface_water: essence.surface_water,
            population: essence.population,
            residents: planets.residents,
            films: planets.films
        }
        
        this.planetsRepository.save(newPlanet)
    }

    updatePlanets(id: number, editPlanets: PlanetsDto) {
        const queryBuilder = this.planetsRepository.createQueryBuilder();
        queryBuilder
            .update()
            .set(editPlanets)
            .where("id = :idPlanets", { idPlanets: id })
            .execute();
    }

    deletePlanets(id: number) {
        this.planetsRepository.delete(id)
    }
}