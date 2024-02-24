import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import { PlanetsDto } from 'src/dto/planetsDto/planets.dto';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreatePlanetsDto } from 'src/dto/planetsDto/createPlanets.dto';

@ApiTags('Planets')
@Controller('planets')
@UseInterceptors(ClassSerializerInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(PlanetsDto)
  getPlanets(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<PlanetsDto>> {
    return this.planetsService.getPlanets(pageOptionsDto);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The planets has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createPlanets(@Body() newPlanets: CreatePlanetsDto) {
    this.planetsService.createPlanet(newPlanets)
  }

  @Put(':id')
  updatePlanets(@Param('id', ParseIntPipe) id: number, @Body() editPlanets: PlanetsDto) {
   this.planetsService.updatePlanets(id, editPlanets)
  }

  @Delete(':id')
  deletePlanets(@Param('id', ParseIntPipe) id: number) {
    this.planetsService.deletePlanets(id)
  }
}