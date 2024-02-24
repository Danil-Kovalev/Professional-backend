import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsService } from './fims.service';
import { Films } from 'src/entity/films.entity';
import { FilmsController } from './films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}