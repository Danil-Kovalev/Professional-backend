import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { imageFilter } from '../utils/image-storage';
import { CreateImagesDto } from './dto/createImages.dto';

@ApiTags('Images')
@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService) { }

    /**
     * Get image by path file and send it like response
     * @param idImage id for found certain image and get file name
     * @param res response file, which get from folder
     * @returns file from folder
     */
    @Get(':id')
    async getImage(@Param('id', ParseIntPipe) idImage: number, @Res() res: Response) {
        let file = await this.imagesService.getImage(idImage);
        res.attachment(file.info.name)
        
        file.stream.pipe(res)
    }

    /**
     * Create new image and save it to storage folder
     * @param data id people entity for create relation
     * @param file which need save in storage
     */
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: imageFilter
    }))
    async createImage(@Body() data: CreateImagesDto, @UploadedFile() file: Express.Multer.File) {
        let newIndexImage: number = await this.imagesService.createIndexImages();
        return this.imagesService.createImage(file, data, newIndexImage);
    }

    /**
     * Delete file form storage and image data from database
     * @param idImage for delete certain image
     */
    @Delete(':id')
    async deleteImage(@Param('id', ParseIntPipe) idImage: number) {
        return this.imagesService.deleteImage(idImage);
    }
}
