import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from 'src/vehicles/entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { Users } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles, Users])],
  controllers: [VehiclesController],
  providers: [VehiclesService, UsersService],
})
export class VehiclesModule {}