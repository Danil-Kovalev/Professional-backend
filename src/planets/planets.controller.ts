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

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnPlanetsDto)
  getPlanets(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPlanetsDto>> {
    return this.planetsService.getPlanets(pageOptionsDto);
  }

  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getPlanet(@Param('id', ParseIntPipe) idPlanets: number): Promise<ReturnPlanetsDto> {
    return this.planetsService.getPlanet(idPlanets)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The planets has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPlanets(@Body() newPlanets: CreatePlanetsDto) {
    let indexNewPlanets: number = await this.planetsService.createIndexPlanet()
    this.planetsService.updatePlanets(indexNewPlanets, newPlanets)
  }

  @Put(':id')
  updatePlanets(@Param('id', ParseIntPipe) id: number, @Body() editPlanets: CreatePlanetsDto) {
   this.planetsService.updatePlanets(id, editPlanets)
  }

  @Delete(':id')
  deletePlanets(@Param('id', ParseIntPipe) id: number) {
    this.planetsService.deletePlanets(id)
  }
}