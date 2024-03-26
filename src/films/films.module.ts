import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './fims.service';
import { Films } from 'src/films/entity/films.entity';
import { FilmsController } from './films.controller';
import { Users } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Films, Users])],
  controllers: [FilmsController],
  providers: [FilmsService, UsersService],
})
export class FilmsModule {}