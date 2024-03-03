import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
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

    async getImage(idImage: number): Promise<string> {
        let file = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })
        if (file === null) throw new HttpException('File not exist', HttpStatus.BAD_REQUEST)
        else return file.fileName;

    }

    async createImage(file: Express.Multer.File, data: CreateImagesDto, idImage: number) {
        let fileNameImage: string = file.filename;

        let peoples = await this.peoplesRepository.findOne({
            where: {
                id: data.idPeople
            }
        })

        let images = this.imagesRepository.create();

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

    async deleteImage(idImage: number) {
        let file = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })
        unlink('./uploads/'.concat(file.fileName), () => {})
        this.imagesRepository.remove(file);
    }

}