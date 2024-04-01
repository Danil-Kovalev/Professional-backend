import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { Planets } from '../planets/entity/planets.entity';
import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Species } from './entity/species.entity';
import { SpeciesController } from './species.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Species, Planets, Users])],
  controllers: [SpeciesController],
  providers: [SpeciesService, UsersService, JwtService],
})
export class SpeciesModule {}