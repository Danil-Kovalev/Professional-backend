import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateStarshipsDto } from "src/dto/starshipsDto/createStarshipsDto.dto";
import { StarShipsDto } from "src/dto/starshipsDto/starships.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Starships } from "src/entity/starships.entity";
import { Repository } from "typeorm";


@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starships)
        private starshipsRepository: Repository<Starships>
    ) { }

    async getStarships(pageOptionsDto: PageOptionsDto): Promise<PageDto<StarShipsDto>> {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount();
        let data = await this.starshipsRepository.find({
            relations: {
                pilots: true,
                films: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createStarships(essence: CreateStarshipsDto) {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount()
        const starships = this.starshipsRepository.create(essence)

        starships.pilots = essence.pilotsIds.map(id => ({...new People(), id}))
        starships.films = essence.filmsIds.map(id => ({...new Films(), id}))

        let newStarships = {
            id: itemCount + 1,
            name: essence.name,
            model: essence.model,
            manufacturer: essence.manufacturer,
            cost_in_credits: essence.cost_in_credits,
            length: essence.length,
            max_atmosphering_speed: essence.max_atmosphering_speed,
            crew: essence.crew,
            passengers: essence.passengers,
            hyperdrive_rating: essence.hyperdrive_rating,
            MGLT: essence.MGLT,
            starship_class: essence.starship_class,
            pilots: starships.pilots,
            films: starships.films
        }

        this.starshipsRepository.save(newStarships);
    }

    updateStarships(id: number, editStarships: StarShipsDto) {
        const queryBuilder = this.starshipsRepository.createQueryBuilder();
        queryBuilder
            .update()
            .set(editStarships)
            .where("id = :idStarships", { idStarships: id })
            .execute();
    }

    deleteStarships(id: number) {
        this.starshipsRepository.delete(id)
    }
}