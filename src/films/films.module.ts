import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './fims.service';
import { Users } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { Films } from './entity/films.entity';
import { FilmsController } from './films.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Films, Users])],
  controllers: [FilmsController],
  providers: [FilmsService, UsersService, JwtService],
})
export class FilmsModule {}