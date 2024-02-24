import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { Species } from 'src/entity/species.entity';
import { SpeciesController } from './species.controller';
import { Planets } from 'src/entity/planets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species, Planets])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}