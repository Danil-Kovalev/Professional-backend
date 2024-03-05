import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreateSpeciesDto } from 'src/dto/speciesDto/createSpeciesDto.dto';
import { ReturnSpeciesDto } from 'src/dto/speciesDto/returnSpeciesDto.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';

@ApiTags('Species')
@Controller('species')
@UseInterceptors(ClassSerializerInterceptor)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  /**
   * Gets all species from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
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
  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getSpecie(@Param('id', ParseIntPipe) idSpecie: number): Promise<ReturnSpeciesDto> {
    return this.speciesService.getSpecie(idSpecie)
  }

  /**
   * Create new specie entity and save to database
   * @param newSpecies data new entity
   */
  @Post()
  @ApiResponse({ status: 201, description: 'The species has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async createSpecies(@Body() newSpecies: CreateSpeciesDto) {
    let indexNewSpecies: number = await this.speciesService.createIndexSpecies();
    this.speciesService.updateSpecies(indexNewSpecies, newSpecies);
  }

   /**
   * Update entity by id and save to database
   * @param id for found specie from database
   * @param editSpecies new data for update entity in database
   */
  @Put(':id')
  updateSpecies(@Param('id', ParseIntPipe) id: number, @Body() editSpecies: CreateSpeciesDto) {
    this.speciesService.updateSpecies(id, editSpecies)
  }

  /**
   * Delete entity by id
   * @param id for found specie in database and delete it
   */
  @Delete(':id')
  deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    this.speciesService.deleteSpecies(id);
  }
}