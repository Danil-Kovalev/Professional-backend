import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { Species } from 'src/species/entity/species.entity';
import { SpeciesController } from './species.controller';
import { Planets } from 'src/planets/entity/planets.entity';
import { Users } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Species, Planets, Users])],
  controllers: [SpeciesController],
  providers: [SpeciesService, UsersService],
})
export class SpeciesModule {}