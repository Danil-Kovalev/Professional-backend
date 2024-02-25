import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateVehiclesDto } from "src/dto/vehiclesDto/createVehiclesDto.dto";
import { VehiclesDto } from "src/dto/vehiclesDto/vehicles.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Vehicles } from "src/entity/vehicles.entity";
import { Repository } from "typeorm";


@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicles)
        private vehiclesRepository: Repository<Vehicles>
    ) { }

    async getVehicles(pageOptionsDto: PageOptionsDto): Promise<PageDto<VehiclesDto>> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount();
        let data = await this.vehiclesRepository.find({
            relations: {
                pilots: true,
                films: true
            }
        });
        data = data.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(data, pageMetaDto);
    }

    async createIndexVehicles(): Promise<number> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount()
        return itemCount + 1;
    }

    updateVehicles(idVehicles: number, createVehicles: CreateVehiclesDto) {
        const vehicles = this.vehiclesRepository.create(createVehicles)

        vehicles.pilots = createVehicles.pilotsIds.map(id => ({...new People(), id}))
        vehicles.films = createVehicles.filmsIds.map(id => ({...new Films(), id}))

        let newVehicles = {
            id: idVehicles,
            name: createVehicles.name,
            model: createVehicles.model,
            manufacturer: createVehicles.manufacturer,
            cost_in_credits: createVehicles.cost_in_credits,
            length: createVehicles.length,
            max_atmosphering_speed: createVehicles.max_atmosphering_speed,
            crew: createVehicles.crew,
            passengers: createVehicles.passengers,
            cargo_capacity: createVehicles.cargo_capacity,
            consumables: createVehicles.consumables,
            pilots: vehicles.pilots,
            films: vehicles.films
        }

        this.vehiclesRepository.save(newVehicles);
    }

    deleteVehicles(id: number) {
        this.vehiclesRepository.delete(id)
    }
}