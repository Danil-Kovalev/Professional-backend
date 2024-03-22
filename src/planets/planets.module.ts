import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsService } from './planets.service';
import { Planets } from 'src/entity/planets.entity';
import { PlanetsController } from './planets.controller';
import { Users } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planets, Users])],
  controllers: [PlanetsController],
  providers: [PlanetsService, UsersService],
})
export class PlanetsModule {}