import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
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

    /**
     * Send request to database, that get file name by id and return this file name
     * @param idImage id for get image
     * @returns 
     */
    async getImage(idImage: number): Promise<string> {
        let file = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })
        if (file === null) throw new HttpException('File not exist', HttpStatus.NOT_FOUND)
        else return file.fileName;

    }

    /**
     * Send id, file name and entity for relation to database
     * @param file for get new genereted name and send to database
     * @param data id people entity
     * @param idImage generated id for new image
     */
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

    /**
     * Create id for image by last id in database
     * @returns generated id
     */
    async createIndexImages(): Promise<number> {
        let itemCount: number = await this.imagesRepository.createQueryBuilder().getCount();
        return itemCount + 1;
    }

    /**
     * Delete image by id from database
     * @param idImage id for delete concrete image from databse
     */
    async deleteImage(idImage: number) {
        let file = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })
        unlink('./uploads/'.concat(file.fileName), () => { })
        this.imagesRepository.remove(file);
    }

}