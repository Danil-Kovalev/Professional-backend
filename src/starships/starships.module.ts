import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsService } from './starships.service';
import { Starships } from 'src/entity/starships.entity';
import { StarshipsController } from './starships.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}