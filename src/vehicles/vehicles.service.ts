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

    /**
     * Gets all vehicles with params and return spliced data by page
     * @param pageOptionsDto number page for slice data by page
     * @returns sliced data all vehicles
     */
    async getVehicles(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnVehiclesDto>> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount(); //get count all vehicles from database

        // send request to database for gets data by params
        let vehicles: ReturnVehiclesDto[] = await this.vehiclesRepository.find({
            relations: {
                pilots: true,
                films: true
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take
        });

        if (vehicles === null) throw new HttpException('Entities not exist!', HttpStatus.NOT_FOUND) //check existence vehicles in case of absence returns exception

        // sets url for daughter entity for receiving data instead it data
        vehicles.map((dataVehicles: ReturnVehiclesDto) => {
            dataVehicles.pilots = dataVehicles.pilots ? dataVehicles.pilots.map((peoples) => peoples.url) : []
            dataVehicles.films = dataVehicles.films ? dataVehicles.films.map((films) => films.url) : []
        })

        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount }); //sets meta information

        return new PageDto(vehicles, pageMetaDto);
    }

    /**
     * Gets vehicle by id from database and sets url for dauther entity
     * @param idVehicle for get data from database
     * @returns vehicle entity
     */
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

    /**
     * Create index for new entity by last id from database
     * @returns new id for entity
     */
    async createIndexVehicles(): Promise<number> {
        let itemCount: number = await this.vehiclesRepository.createQueryBuilder().getCount()
        return itemCount + 1;
    }

    /**
     * Update data and relations for vehicle entity
     * @param idVehicles found vehicle from database by id
     * @param createVehicles new data for update
     */
    updateVehicles(idVehicles: number, createVehicles: CreateVehiclesDto) {
        const vehicles = this.vehiclesRepository.create(createVehicles)

        vehicles.id = idVehicles;
        vehicles.pilots = createVehicles.pilotsIds.map(id => ({...new People(), id}))
        vehicles.films = createVehicles.filmsIds.map(id => ({...new Films(), id}))
        vehicles.url = formingUrl('vehicles', idVehicles)

        this.vehiclesRepository.save(vehicles);
    }

    /**
     * Delete vehicle by id from database
     * @param idVehicle for delete from database
     */
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