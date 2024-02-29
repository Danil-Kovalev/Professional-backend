import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Images } from 'src/entity/images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from 'src/entity/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Images, People])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
