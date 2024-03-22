import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilmsService } from './fims.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreateFilmsDto } from 'src/dto/filmsDto/createFilmsDto.dto';
import { ReturnFilmsDto } from 'src/dto/filmsDto/returnFilmsDto.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

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
    let indexNewFilms: number = await this.filmsService.createIndexFilms()
    this.filmsService.updateFilms(indexNewFilms, newFilms);
  }

  /**
   * Update entity by id and save to database
   * @param id for found film from database
   * @param editFilm new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateFilms(@Param('id', ParseIntPipe) id: number, @Body() editFilm: CreateFilmsDto) {
    this.filmsService.updateFilms(id, editFilm);
  }

  /**
   * Delete entity by id
   * @param id for found film in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteFilms(@Param('id', ParseIntPipe) id: number) {
    this.filmsService.deleteFilms(id);
  }
}