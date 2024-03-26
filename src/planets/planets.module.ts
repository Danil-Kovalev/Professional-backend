import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsService } from './planets.service';
import { Planets } from 'src/planets/entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { Users } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planets, Users])],
  controllers: [PlanetsController],
  providers: [PlanetsService, UsersService],
})
export class PlanetsModule {}