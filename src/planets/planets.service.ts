import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlanetsDto } from "src/dto/planetsDto/createPlanets.dto";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { Films } from "src/entity/films.entity";
import { Planets } from "src/entity/planets.entity";
import { Repository } from "typeorm";
import { formingUrl } from "src/utils/formingUrl";
import { ReturnPlanetsDto } from "src/dto/planetsDto/returnPlanetsDto.dto";
import { People } from "src/entity/people.entity";


@Injectable()
export class PlanetsService {
    constructor(
        @InjectRepository(Planets)
        private planetsRepository: Repository<Planets>
    ) { }


    async getPlanets(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPlanetsDto>> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount();
        let planets: ReturnPlanetsDto[] = await this.planetsRepository.find({
            relations: {
                residents: true,
                films: true
            }
        });

        planets = planets.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        planets.map((dataPlanets: ReturnPlanetsDto) => {
            dataPlanets.residents = dataPlanets.residents ? dataPlanets.residents.map((people) => people.url) : []
            dataPlanets.films = dataPlanets.films ? dataPlanets.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(planets, pageMetaDto);
    }

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

        if (planet === null) throw new HttpException('Entity not exist!', HttpStatus.BAD_REQUEST)

        planet.residents = planet.residents ? planet.residents.map((people) => people.url) : []
        planet.films = planet.films ? planet.films.map((films) => films.url) : []

        return planet;
    }

    async createIndexPlanet(): Promise<number> {
        let itemCount: number = await this.planetsRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    updatePlanets(idPlanets: number, createPlanets: CreatePlanetsDto) {
        const planets = this.planetsRepository.create(createPlanets)

        planets.id = idPlanets;
        planets.residents = createPlanets.residentsIds.map(id => ({...new People(), id}))
        planets.films = createPlanets.filmsIds.map(id => ({...new Films(), id}))
        planets.url = formingUrl('planets', idPlanets)
        
        this.planetsRepository.save(planets)
    }

    deletePlanets(id: number) {
        this.planetsRepository.delete(id)
    }
}