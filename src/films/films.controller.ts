import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilmsService } from './fims.service';
import { FilmsDto } from 'src/dto/filmsDto/films.dto';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreateFilmsDto } from 'src/dto/filmsDto/createFilmsDto.dto';

@ApiTags('Films')
@Controller('films')
@UseInterceptors(ClassSerializerInterceptor)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(FilmsDto)
  getFilms(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<FilmsDto>> {
    return this.filmsService.getFilms(pageOptionsDto);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The films has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createFilms(@Body() newFilms: CreateFilmsDto) {
    let indexNewFilms: number = await this.filmsService.createIndexFilms()
    this.filmsService.updateFilms(indexNewFilms, newFilms);
  }

  @Put(':id')
  updateFilms(@Param('id', ParseIntPipe) id: number, @Body() editPeople: CreateFilmsDto) {
    this.filmsService.updateFilms(id, editPeople);
  }

  @Delete(':id')
  deleteFilms(@Param('id', ParseIntPipe) id: number) {
    this.filmsService.deleteFilms(id);
  }
}