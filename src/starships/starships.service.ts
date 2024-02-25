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

    async createIndexStarships(): Promise<number> {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount()
        return itemCount + 1;
    }

    updateStarships(idStarships: number, createStarships: CreateStarshipsDto) {
        const starships = this.starshipsRepository.create(createStarships)

        starships.pilots = createStarships.pilotsIds.map(id => ({...new People(), id}))
        starships.films = createStarships.filmsIds.map(id => ({...new Films(), id}))

        let newStarships = {
            id: idStarships,
            name: createStarships.name,
            model: createStarships.model,
            manufacturer: createStarships.manufacturer,
            cost_in_credits: createStarships.cost_in_credits,
            length: createStarships.length,
            max_atmosphering_speed: createStarships.max_atmosphering_speed,
            crew: createStarships.crew,
            passengers: createStarships.passengers,
            hyperdrive_rating: createStarships.hyperdrive_rating,
            MGLT: createStarships.MGLT,
            starship_class: createStarships.starship_class,
            pilots: starships.pilots,
            films: starships.films
        }

        this.starshipsRepository.save(newStarships);
    }

    deleteStarships(id: number) {
        this.starshipsRepository.delete(id)
    }
}