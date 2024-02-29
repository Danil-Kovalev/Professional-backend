import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BASIC_PATH_IMAGE } from 'src/constants/constants';
import { CreateImagesDto } from 'src/dto/imagesDto/createImages.dto';
import { Images } from 'src/entity/images.entity';
import { People } from 'src/entity/people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,

        @InjectRepository(People)
        private peoplesRepository: Repository<People>
    ) { }

    async getImage(idImage: number) {
        let nameFile = await this.imagesRepository.findOne({
            select: {
                fileName: true
            },
            where: {
                id: idImage
            }
        })
    }

    async createImage(file: Express.Multer.File, data: CreateImagesDto, idImage: number) {
        let fileNameImage: string = file.filename;
        //    pathFile = BASIC_PATH_IMAGE.concat(pathFile.replaceAll('\\', '\/'))

        let peoples = await this.peoplesRepository.findOne({
            where: {
                id: data.idPeople
            }
        })

        let images = await this.imagesRepository.create();

        images.people = peoples;

        let newImage = {
            id: idImage,
            fileName: fileNameImage,
            peoples
       }

       this.imagesRepository.save(newImage);
    }


    async createIndexImages(): Promise<number> {
        let itemCount: number = await this.imagesRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

}