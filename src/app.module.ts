import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './configs/data-source';
import { PeoplesModule } from './peoples/peoples.module';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ImagesController } from './images/images.controller';
import { ImagesModule } from './images/images.module';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), PeoplesModule, PlanetsModule, FilmsModule, SpeciesModule, StarshipsModule, VehiclesModule, ImagesModule]
})
export class AppModule {}
