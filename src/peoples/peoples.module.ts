import { Module } from '@nestjs/common';
import { PeoplesController } from './peoples.controller';
import { PeoplesService } from './peoples.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { People } from './entity/people.entity';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([People, Users])],
  controllers: [PeoplesController],
  providers: [PeoplesService, UsersService, JwtService]
})
export class PeoplesModule {}