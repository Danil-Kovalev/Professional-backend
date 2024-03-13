import { Module } from '@nestjs/common';
import { PeoplesController } from './peoples.controller';
import { PeoplesService } from './peoples.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from 'src/entity/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [PeoplesController],
  providers: [PeoplesService]
})
export class PeoplesModule {}