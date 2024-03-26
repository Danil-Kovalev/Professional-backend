import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlanetsService } from './planets.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

import { Role } from '../auth/roles/role.enum';

import { Roles } from '../auth/roles/roles.decorator';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { CreatePlanetsDto } from './dto/createPlanets.dto';
import { ReturnPlanetsDto } from './dto/returnPlanetsDto.dto';

import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';


@ApiTags('Planets')
@Controller('planets')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  /**
   * Gets all planets from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnPlanetsDto)
  getPlanets(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPlanetsDto>> {
    return this.planetsService.getPlanets(pageOptionsDto);
  }

  /**
   * Gets one planet by id from database
   * @param idPlanets for found entity from database
   * @returns data planet
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ResponseInterceptor)
  getPlanet(@Param('id', ParseIntPipe) idPlanets: number): Promise<ReturnPlanetsDto> {
    return this.planetsService.getPlanet(idPlanets)
  }

 /**
   * Create new planet entity and save to database
   * @param newPlanets data new entity
   */
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'The planets has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPlanets(@Body() newPlanets: CreatePlanetsDto) {
    return this.planetsService.createPlanet(newPlanets);
  }
  /**
   * Update entity by id and save to database
   * @param id for found planet from database
   * @param editPlanets new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updatePlanets(@Param('id', ParseIntPipe) id: number, @Body() editPlanets: CreatePlanetsDto) {
   this.planetsService.updatePlanets(id, editPlanets)
  }

  /**
   * Delete entity by id
   * @param id for found planet in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deletePlanets(@Param('id', ParseIntPipe) id: number) {
    this.planetsService.deletePlanets(id)
  }
}