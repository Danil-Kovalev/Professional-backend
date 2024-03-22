import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicles } from 'src/entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { Users } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles, Users])],
  controllers: [VehiclesController],
  providers: [VehiclesService, UsersService],
})
export class VehiclesModule {}