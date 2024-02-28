import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImagesDto } from 'src/dto/imagesDto/createImages.dto';
import { Images } from 'src/entity/images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,
    ) { }

    getImage(id: number) {
        
    }

    createImage(file: Express.Multer.File, data: CreateImagesDto) {
        
    }
}
