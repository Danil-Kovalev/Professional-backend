import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsService } from './starships.service';
import { Starships } from 'src/entity/starships.entity';
import { StarshipsController } from './starships.controller';
import { Users } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starships, Users])],
  controllers: [StarshipsController],
  providers: [StarshipsService, UsersService],
})
export class StarshipsModule {}