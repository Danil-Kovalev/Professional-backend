import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';
import { dataSourceOptions } from '../configs/db.config';
import { Repository } from 'typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from './entity/vehicles.entity';




describe('PeoplesService', () => {
    let service: VehiclesService;
    let vehiclesRepository: Repository<Vehicles>;

    const mockVehicle = {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: 0,
        length: 4.5,
        max_atmosphering_speed: 650,
        crew: 2,
        passengers: 0,
        cargo_capacity: 10,
        consumables: "none",
        pilotsIds: [],
        filmsIds: []
    }

    const mockReturnVehicle = {
        id: 1,
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: 0,
        length: 4.5,
        max_atmosphering_speed: 650,
        crew: 2,
        passengers: 0,
        cargo_capacity: 10,
        consumables: "none",
        pilotsIds: [],
        filmsIds: []
    }

    const mockReturnVehicles = {
        data: [{
            ...mockReturnVehicle
        }],
        meta: {
            hasNextPage: false,
            hasPreviousPage: false,
            itemCount: 1,
            page: 1,
            pageCount: 1,
            take: 10,
        }
    }

    const mockVehiclesRepository = {
        count: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockImplementation((dto) => dto),
        find: jest.fn().mockResolvedValueOnce([mockReturnVehicle]),
        findOne: jest.fn().mockImplementation(() => Promise.resolve(mockReturnVehicle)),
        delete: jest.fn().mockResolvedValueOnce(1),
        save: jest.fn().mockImplementation((film) => Promise.resolve({ id: 1, ...film }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VehiclesService, {
                provide: getRepositoryToken(Vehicles, dataSourceOptions),
                useValue: mockVehiclesRepository
            }],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService)
        vehiclesRepository = module.get<Repository<Vehicles>>(getRepositoryToken(Vehicles))

    })

    it('should be defined vehicles service', () => {
        expect(service).toBeDefined();
    })

    it('should be defined vehicles repository', () => {
        expect(vehiclesRepository).toBeDefined();
    })

    describe('getVehicles', () => {
        it('should be return vehicles with data', async () => {
            const dto = { page: 1, skip: 0 }
            expect(await service.getVehicles(dto)).toEqual(mockReturnVehicles)
        })
    })

    describe('getVehicle', () => {
        it('should be return vehicle with data', async () => {
            expect(await service.getVehicle(1)).toEqual(mockReturnVehicle)
        })
    })

    describe('createVehicles', () => {
        it('should be create vehicle and return it data', async () => {
            expect(await service.createVehicle(mockVehicle)).toEqual(mockVehicle)
        })
    })

    describe('updateVehicles', () => {
        it('should be update vehicles and return it data', async () => {
            const dto = { ...mockVehicle, episode_id: 5 }
            expect(await service.updateVehicles(1, dto)).toEqual(dto)
        })
    })

    describe('deleteVehicles', () => {
        it('should be delete vehicle and return success result', async () => {
            expect(service.deleteVehicles(1)).toEqual({ "success": true })
        })
    })
})