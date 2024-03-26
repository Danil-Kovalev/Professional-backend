import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesController } from './vehicles.controller'
import { VehiclesService } from './vehicles.service'
import { CreateVehiclesDto } from './dto/createVehiclesDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('VehiclesController', () => {
    let service: VehiclesService
    let controller: VehiclesController;

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

    const mockVehicleService = {
        getVehicles: jest.fn().mockResolvedValueOnce([mockVehicle]),
        getVehicle: jest.fn().mockResolvedValueOnce([mockVehicle]),
        createVehicle: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateVehicles: jest.fn(dto => {
            return { ...mockVehicle, passengers: 1 }
        }),
        deleteVehicles: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [VehiclesController],
            providers: [VehiclesService],
        }).overrideProvider(VehiclesService).useValue(mockVehicleService).compile();

        controller = module.get<VehiclesController>(VehiclesController)
        service = module.get<VehiclesService>(VehiclesService)
    })

    it('should be defined vehicle', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllVehicles', () => {
        it('should be get all Vehicles', async () => {
            const result = await service.getVehicles({ page: 1, skip: 0 });
            expect(service.getVehicles).toHaveBeenCalled()
            expect(result).toEqual([mockVehicle])
        })
    })

    describe('getVehicleById', () => {
        it('should be get vehicle', async () => {
            const result = await service.getVehicle(1);
            expect(service.getVehicle).toHaveBeenCalled()
            expect(result).toEqual([mockVehicle])
        })
    })

    describe('create vehicle', () => {
        it('should be create vehicle', async () => {
            const newVehicle: CreateVehiclesDto = { ...mockVehicle }
            const result = await service.createVehicle(newVehicle);

            expect(service.createVehicle).toHaveBeenCalled()
            expect(result).toEqual({
                id: expect.any(Number),
                ...mockVehicle
            })
        })
    })

    describe('update Vehicle', () => {
        it('should be updated vehicle', async () => {
            const updateVehicle = { ...mockVehicle, passengers: 1 }
            const result = await service.updateVehicles(1, updateVehicle);

            expect(service.updateVehicles).toHaveBeenCalled()
            expect(result).toEqual(updateVehicle)
        })
    })

    describe('delete Vehicle', () => {
        it('should be deleted vehicle and get success result', async () => {
            const result = await mockVehicleService.deleteVehicles(1)

            expect(service.deleteVehicles).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})