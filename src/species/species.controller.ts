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

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnSpeciesDto)
  getSpecies(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnSpeciesDto>> {
    return this.speciesService.getSpecies(pageOptionsDto)
  }

  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getSpecie(@Param('id', ParseIntPipe) idSpecie: number): Promise<ReturnSpeciesDto> {
    return this.speciesService.getSpecie(idSpecie)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The species has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async createSpecies(@Body() newSpecies: CreateSpeciesDto) {
    let indexNewSpecies: number = await this.speciesService.createIndexSpecies();
    this.speciesService.updateSpecies(indexNewSpecies, newSpecies);
  }

  @Put(':id')
  updateSpecies(@Param('id', ParseIntPipe) id: number, @Body() editSpecies: CreateSpeciesDto) {
    this.speciesService.updateSpecies(id, editSpecies)
  }

  @Delete(':id')
  deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    this.speciesService.deleteSpecies(id);
  }
}