import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { CreateImagesDto } from 'src/dto/imagesDto/createImages.dto';
import { Images } from 'src/entity/images.entity';
import { People } from 'src/entity/people.entity';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk'
import { formingUrl } from 'src/utils/formingUrl';
import { extname } from 'path';

@Injectable()
export class ImagesService {

    private readonly s3: AWS.S3

    constructor(
        @InjectRepository(Images)
        private imagesRepository: Repository<Images>,

        @InjectRepository(People)
        private peoplesRepository: Repository<People>
    ) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
    }

    /**
     * Send request to database, that get file name by id and return this file name
     * @param idImage id for get image
     * @returns 
     */
    async getImage(idImage: number) {
        let file = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })

        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: file.name
        }
        if (file) {
            const stream = await this.s3.getObject(params).createReadStream();
            return {
                stream,
                info: file,
            }
        }
    }

    /**
     * Send id, file name and entity for relation to database
     * @param file for get new genereted name and send to database
     * @param data id people entity
     * @param idImage generated id for new image
     */
    async createImage(file: Express.Multer.File, data: CreateImagesDto, idImage: number) {
        let fileNewName: string = `${Date.now()}-img${extname(file.originalname)}`;
        let s3 = new AWS.S3({
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });

        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: String(fileNewName),
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'eu-north-1',
            },
        };

        let s3Response = await s3.upload(params).promise();

        let peoples = await this.peoplesRepository.findOne({
            where: {
                id: data.idPeople
            }
        })

        let images = this.imagesRepository.create();

        images.id = idImage
        images.name = fileNewName
        images.urlAPI = formingUrl('images', idImage)
        images.urlImage = s3Response.Location
        images.people = peoples;

        this.imagesRepository.save(images);
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
        let image = await this.imagesRepository.findOne({
            where: {
                id: idImage
            }
        })

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });

        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            Key: image.name
        }).promise();
        this.imagesRepository.remove(image);
    }

}