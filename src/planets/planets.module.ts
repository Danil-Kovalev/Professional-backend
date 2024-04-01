import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Planets } from './entity/planets.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Planets, Users])],
  controllers: [PlanetsController],
  providers: [PlanetsService, UsersService, JwtService],
})
export class PlanetsModule {}