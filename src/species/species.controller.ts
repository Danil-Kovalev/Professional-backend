import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SpeciesService } from './species.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

import { Role } from '../auth/roles/role.enum';

import { Roles } from '../auth/roles/roles.decorator';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { CreateSpeciesDto } from './dto/createSpeciesDto.dto';
import { ReturnSpeciesDto } from './dto/returnSpeciesDto.dto';

import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';

@ApiTags('Species')
@Controller('species')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  /**
   * Gets all species from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnSpeciesDto)
  getSpecies(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnSpeciesDto>> {
    return this.speciesService.getSpecies(pageOptionsDto)
  }

  /**
   * Gets one specie by id from database
   * @param idSpecie for found entity from database
   * @returns data specie
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ResponseInterceptor)
  getSpecie(@Param('id', ParseIntPipe) idSpecie: number): Promise<ReturnSpeciesDto> {
    return this.speciesService.getSpecie(idSpecie)
  }

  /**
   * Create new specie entity and save to database
   * @param newSpecies data new entity
   */
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'The species has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async createSpecies(@Body() newSpecies: CreateSpeciesDto) {
    return this.speciesService.createSpecie(newSpecies)
  }

   /**
   * Update entity by id and save to database
   * @param id for found specie from database
   * @param editSpecies new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateSpecies(@Param('id', ParseIntPipe) id: number, @Body() editSpecies: CreateSpeciesDto) {
    return this.speciesService.updateSpecies(id, editSpecies)
  }

  /**
   * Delete entity by id
   * @param id for found specie in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}