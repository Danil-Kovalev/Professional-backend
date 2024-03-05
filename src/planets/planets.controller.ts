import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreatePlanetsDto } from 'src/dto/planetsDto/createPlanets.dto';
import { ReturnPlanetsDto } from 'src/dto/planetsDto/returnPlanetsDto.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';

@ApiTags('Planets')
@Controller('planets')
@UseInterceptors(ClassSerializerInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  /**
   * Gets all planets from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
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
  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getPlanet(@Param('id', ParseIntPipe) idPlanets: number): Promise<ReturnPlanetsDto> {
    return this.planetsService.getPlanet(idPlanets)
  }

 /**
   * Create new planet entity and save to database
   * @param newPlanets data new entity
   */
  @Post()
  @ApiResponse({ status: 201, description: 'The planets has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPlanets(@Body() newPlanets: CreatePlanetsDto) {
    let indexNewPlanets: number = await this.planetsService.createIndexPlanet()
    this.planetsService.updatePlanets(indexNewPlanets, newPlanets)
  }
  /**
   * Update entity by id and save to database
   * @param id for found planet from database
   * @param editPlanets new data for update entity in database
   */
  @Put(':id')
  updatePlanets(@Param('id', ParseIntPipe) id: number, @Body() editPlanets: CreatePlanetsDto) {
   this.planetsService.updatePlanets(id, editPlanets)
  }

  /**
   * Delete entity by id
   * @param id for found planet in database and delete it
   */
  @Delete(':id')
  deletePlanets(@Param('id', ParseIntPipe) id: number) {
    this.planetsService.deletePlanets(id)
  }
}