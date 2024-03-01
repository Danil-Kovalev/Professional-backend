import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImagesDto } from 'src/dto/imagesDto/createImages.dto';
import { imageFilter, imageStorage } from 'src/utils/image-storage';

@ApiTags('Images')
@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService) { }
    
    @Get(':id')
    async getImage(@Param('id', ParseIntPipe) idImage: number, @Res() res) {
        let nameFile = await this.imagesService.getImage(idImage);
        return res.sendFile(nameFile, {root: './uploads'})
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        storage: imageStorage,
        fileFilter: imageFilter
    }))
    async createImage(@Body() data: CreateImagesDto, @UploadedFile() file: Express.Multer.File) {
        let newIndexImage: number = await this.imagesService.createIndexImages();
        this.imagesService.createImage(file, data, newIndexImage);
    }

    @Delete(':id')
    async deleteImage(@Param('id', ParseIntPipe) idImage: number) {
        return this.imagesService.deleteImage(idImage);
    }
}
