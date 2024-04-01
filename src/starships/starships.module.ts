import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsService } from './starships.service';
import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Starships } from './entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Starships, Users])],
  controllers: [StarshipsController],
  providers: [StarshipsService, UsersService, JwtService],
})
export class StarshipsModule {}