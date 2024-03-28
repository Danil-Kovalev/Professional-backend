import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesController } from './vehicles.controller'
import { VehiclesService } from './vehicles.service'
import { CreateVehiclesDto } from './dto/createVehiclesDto.dto'
import { PassportModule } from '@nestjs/passport';

describe('VehiclesController', () => {
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

    const mockReturnUpdateVehicle = {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: 0,
        length: 4.5,
        max_atmosphering_speed: 650,
        crew: 2,
        passengers: 1,
        cargo_capacity: 10,
        consumables: "none",
        pilotsIds: [],
        filmsIds: []
    }

    const mockVehicleService = {
        getVehicles: jest.fn().mockResolvedValueOnce(mockReturnVehicle),
        getVehicle: jest.fn().mockResolvedValueOnce(mockReturnVehicle),
        createVehicle: jest.fn(dto => {
            return { id: 1, ...dto }
        }),
        updateVehicles: jest.fn((id, dto) => {
            return { id, ...dto }
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
    })

    it('should be defined vehicle', () => {
        expect(controller).toBeDefined();
    })

    describe('getAllVehicles', () => {
        it('should be get all Vehicles', async () => {
            const dto = { page: 1, skip: 0 };

            expect(await controller.getVehicles(dto)).toEqual(mockReturnVehicle)
            expect(mockVehicleService.getVehicles).toHaveBeenCalledWith(dto)
        })
    })

    describe('getVehicleById', () => {
        it('should be get vehicle', async () => {
            const dto = 1

            expect(await controller.getVehicle(dto)).toEqual(mockReturnVehicle)
            expect(mockVehicleService.getVehicle).toHaveBeenCalledWith(dto)
        })
    })

    describe('create vehicle', () => {
        it('should be create vehicle', async () => {
            const newVehicle: CreateVehiclesDto = { ...mockVehicle }

            expect(await controller.createVehicles(newVehicle)).toEqual({
                id: expect.any(Number),
                ...mockVehicle
            })
            expect(mockVehicleService.createVehicle).toHaveBeenCalledWith(newVehicle)
        })
    })

    describe('update Vehicle', () => {
        it('should be updated vehicle', async () => {
            const updateVehicle = { ...mockVehicle, passengers: 1 }

            expect(await controller.updateVehicles(1, updateVehicle)).toEqual({
                id: 1,
                ...mockReturnUpdateVehicle
            })
            expect(mockVehicleService.updateVehicles).toHaveBeenCalled()
        })
    })

    describe('delete Vehicle', () => {
        it('should be deleted vehicle and get success result', async () => {
            const dto = 1;

            expect(await controller.deleteVehicles(dto)).toEqual({ "success": true })
            expect(mockVehicleService.deleteVehicles).toHaveBeenCalledWith(dto)
        })
    })
})