import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { Species } from 'src/entity/species.entity';
import { SpeciesController } from './species.controller';
import { Planets } from 'src/entity/planets.entity';
import { Users } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Species, Planets, Users])],
  controllers: [SpeciesController],
  providers: [SpeciesService, UsersService],
})
export class SpeciesModule {}