import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsService } from './planets.service';
import { Planets } from 'src/entity/planets.entity';
import { PlanetsController } from './planets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Planets])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}