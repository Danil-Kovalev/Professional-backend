import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeoplesModule } from './peoples/peoples.module';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './configs/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PeoplesModule, PlanetsModule, FilmsModule, SpeciesModule, StarshipsModule, VehiclesModule, ImagesModule, AuthModule, UsersModule
  ]
})
export class AppModule {}
