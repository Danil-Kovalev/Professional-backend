import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateStarshipsDto } from "src/dto/starshipsDto/createStarshipsDto.dto";
import { ReturnStarshipsDto } from "src/dto/starshipsDto/returnStarshipsDto.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Starships } from "src/entity/starships.entity";
import { formingUrl } from "src/utils/formingUrl";
import { Repository } from "typeorm";


@Injectable()
export class StarshipsService {
    constructor(
        @InjectRepository(Starships)
        private starshipsRepository: Repository<Starships>
    ) { }

    async getStarships(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnStarshipsDto>> {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount();
        let starships: ReturnStarshipsDto[] = await this.starshipsRepository.find({
            relations: {
                pilots: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (starships === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        starships.map((dataStarships: ReturnStarshipsDto) => {
            dataStarships.pilots = dataStarships.pilots ? dataStarships.pilots.map((peoples) => peoples.url) : []
            dataStarships.films = dataStarships.films ? dataStarships.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(starships, pageMetaDto);
    }

    async getStarship(idStarship: number): Promise<ReturnStarshipsDto> {
        let starships: ReturnStarshipsDto = await this.starshipsRepository.findOne({
            relations: {
                pilots: true,
                films: true
            },
            where: {
                id: idStarship
            }
        })

        if (starships === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        starships.pilots = starships.pilots ? starships.pilots.map((peoples) => peoples.url) : []
        starships.films = starships.films ? starships.films.map((films) => films.url) : []

        return starships;
    }

    async createIndexStarships(): Promise<number> {
        let itemCount: number = await this.starshipsRepository.createQueryBuilder().getCount()
        return itemCount + 1;
    }

    updateStarships(idStarships: number, createStarships: CreateStarshipsDto) {
        const starships = this.starshipsRepository.create(createStarships)

        starships.id = idStarships;
        starships.pilots = createStarships.pilotsIds.map(id => ({...new People(), id}))
        starships.films = createStarships.filmsIds.map(id => ({...new Films(), id}))
        starships.url = formingUrl('starships', idStarships)

        this.starshipsRepository.save(starships);
    }

    deleteStarships(idStarship: number) {
        const starship = this.starshipsRepository.findOne({
            where: {
                id: idStarship
            }
        })
        this.starshipsRepository.delete(idStarship)
    }
}