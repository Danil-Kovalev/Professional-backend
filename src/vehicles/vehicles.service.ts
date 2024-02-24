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

    async createVehicles(essence: CreateVehiclesDto) {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount()
        const vehicles = this.vehiclesRepository.create(essence)

        vehicles.pilots = essence.pilotsIds.map(id => ({...new People(), id}))
        vehicles.films = essence.filmsIds.map(id => ({...new Films(), id}))

        let newVehicles = {
            id: itemCount + 1,
            name: essence.name,
            model: essence.model,
            manufacturer: essence.manufacturer,
            cost_in_credits: essence.cost_in_credits,
            length: essence.length,
            max_atmosphering_speed: essence.max_atmosphering_speed,
            crew: essence.crew,
            passengers: essence.passengers,
            cargo_capacity: essence.cargo_capacity,
            consumables: essence.consumables,
            pilots: vehicles.pilots,
            films: vehicles.films
        }

        this.vehiclesRepository.save(newVehicles);
    }

    updateVehicles(id: number, editVehicles: VehiclesDto) {
        const queryBuilder = this.vehiclesRepository.createQueryBuilder();
        queryBuilder
            .update()
            .set(editVehicles)
            .where("id = :idVehicles", { idVehicles: id })
            .execute();
    }

    deleteVehicles(id: number) {
        this.vehiclesRepository.delete(id)
    }
}