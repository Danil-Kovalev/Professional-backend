import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FilmsService } from './fims.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

import { Role } from '../auth/roles/role.enum';

import { Roles } from '../auth/roles/roles.decorator';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { CreateFilmsDto } from './dto/createFilmsDto.dto';
import { ReturnFilmsDto } from './dto/returnFilmsDto.dto';

import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';


@ApiTags('Films')
@Controller('films')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  /**
   * Gets all films from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnFilmsDto)
  getFilms(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnFilmsDto>> {
    return this.filmsService.getFilms(pageOptionsDto);
  }

  /**
   * Gets one film by id from database
   * @param idFilms for found entity from database
   * @returns data film
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ResponseInterceptor)
  getFilm(@Param('id', ParseIntPipe) idFilms: number): Promise<ReturnFilmsDto> {
    return this.filmsService.getFilm(idFilms)
  }

  /**
   * Create new film entity and save to database
   * @param newFilms data new entity
   */
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'The films has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createFilms(@Body() newFilms: CreateFilmsDto) {
    return this.filmsService.createFilm(newFilms)
  }

  /**
   * Update entity by id and save to database
   * @param id for found film from database
   * @param editFilm new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateFilms(@Param('id', ParseIntPipe) id: number, @Body() editFilm: CreateFilmsDto) {
    return this.filmsService.updateFilms(id, editFilm);
  }

  /**
   * Delete entity by id
   * @param id for found film in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteFilms(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.deleteFilms(id);
  }
}