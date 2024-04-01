import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Vehicles } from './entity/vehicles.entity';
import { VehiclesController } from './vehicles.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Vehicles, Users])],
  controllers: [VehiclesController],
  providers: [VehiclesService, UsersService, JwtService],
})
export class VehiclesModule {}