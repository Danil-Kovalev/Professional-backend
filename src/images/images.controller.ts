import { Body, Controller, FileTypeValidator, Get, HttpStatus, Param, ParseFilePipe, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImagesDto } from 'src/dto/imagesDto/createImages.dto';
import { diskStorage } from 'multer';
import { imageFilter, imageStorage } from 'src/utils/image-storage';

@ApiTags('Images')
@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService) { }
    
    @Get(':id')
    getImage(@Param('id', ParseIntPipe) idImage: number) {
        return this.imagesService.getImage(idImage);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        storage: imageStorage,
        fileFilter: imageFilter
    }))
    createImage(@Body() data: CreateImagesDto, @UploadedFile() file: Express.Multer.File) {
        this.imagesService.createImage(file, data);
    }
}
