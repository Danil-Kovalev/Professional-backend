import { Module } from '@nestjs/common';
import { PeoplesController } from './peoples.controller';
import { PeoplesService } from './peoples.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from 'src/entity/people.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People, Users])],
  controllers: [PeoplesController],
  providers: [PeoplesService, UsersService]
})
export class PeoplesModule {}