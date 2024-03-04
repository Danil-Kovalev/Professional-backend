import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageMetaDto } from "src/dto/pageDto/page-meta.dto";
import { PageOptionsDto } from "src/dto/pageDto/page-options.dto";
import { PageDto } from "src/dto/pageDto/page.dto";
import { CreateVehiclesDto } from "src/dto/vehiclesDto/createVehiclesDto.dto";
import { ReturnVehiclesDto } from "src/dto/vehiclesDto/returnVehiclesDto.dto";
import { Films } from "src/entity/films.entity";
import { People } from "src/entity/people.entity";
import { Vehicles } from "src/entity/vehicles.entity";
import { formingUrl } from "src/utils/formingUrl";
import { Repository } from "typeorm";


@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicles)
        private vehiclesRepository: Repository<Vehicles>
    ) { }

    async getVehicles(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnVehiclesDto>> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount();
        let vehicles: ReturnVehiclesDto[] = await this.vehiclesRepository.find({
            relations: {
                pilots: true,
                films: true
            }
        });

        if (vehicles === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND)

        vehicles = vehicles.slice(pageOptionsDto.skip, pageOptionsDto.skip + pageOptionsDto.take);

        vehicles.map((dataVehicles: ReturnVehiclesDto) => {
            dataVehicles.pilots = dataVehicles.pilots ? dataVehicles.pilots.map((peoples) => peoples.url) : []
            dataVehicles.films = dataVehicles.films ? dataVehicles.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

        return new PageDto(vehicles, pageMetaDto);
    }

    async getVehicle(idVehicle: number): Promise<ReturnVehiclesDto> {
        let vehicle: ReturnVehiclesDto = await this.vehiclesRepository.findOne({
            relations: {
                pilots: true,
                films: true
            },
            where: {
                id: idVehicle
            }
        })

        if (vehicle === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        vehicle.pilots = vehicle.pilots ? vehicle.pilots.map((peoples) => peoples.url) : []
        vehicle.films = vehicle.films ? vehicle.films.map((films) => films.url) : []

        return vehicle;
    }

    async createIndexVehicles(): Promise<number> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount()
        return itemCount + 1;
    }

    updateVehicles(idVehicles: number, createVehicles: CreateVehiclesDto) {
        const vehicles = this.vehiclesRepository.create(createVehicles)

        vehicles.id = idVehicles;
        vehicles.pilots = createVehicles.pilotsIds.map(id => ({...new People(), id}))
        vehicles.films = createVehicles.filmsIds.map(id => ({...new Films(), id}))
        vehicles.url = formingUrl('vehicles', idVehicles)

        this.vehiclesRepository.save(vehicles);
    }

    deleteVehicles(idVehicle: number) {
        const vehicle = this.vehiclesRepository.findOne({
            where: {
                id: idVehicle
            }
        })

        if (vehicle === null) throw new HttpException('Entity not exist!', HttpStatus.NOT_FOUND)

        this.vehiclesRepository.delete(idVehicle)
    }
}