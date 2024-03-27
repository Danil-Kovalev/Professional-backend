import { Test, TestingModule } from '@nestjs/testing'
import { Express } from 'express';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { CreateImagesDto } from './dto/createImages.dto';

describe('UserController', () => {
    let service: ImagesService
    let controller: ImagesController;

    const mockImage = {
        idPeople: 1,
        file: File
    }

    const mockImageService = {
        createImage: jest.fn().mockResolvedValueOnce(mockImage)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ImagesController],
            providers: [ImagesService],
        }).overrideProvider(ImagesService).useValue(mockImageService).compile();

        controller = module.get<ImagesController>(ImagesController)
        service = module.get<ImagesService>(ImagesService)
    })

    it('should be defined image', () => {
        expect(controller).toBeDefined();
    })
})