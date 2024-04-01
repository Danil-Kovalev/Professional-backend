import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { People } from "../peoples/entity/people.entity";
import { Images } from "./entity/images.entity";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";


@Module({
  imports: [TypeOrmModule.forFeature([Images, People])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
