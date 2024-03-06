import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/db.config';
import { PeoplesModule } from './peoples/peoples.module';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }),
    PeoplesModule, PlanetsModule, FilmsModule, SpeciesModule, StarshipsModule, VehiclesModule, ImagesModule
  ]
})
export class AppModule {}
