import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { SpeciesDto } from 'src/dto/speciesDto/species.dto';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { Species } from 'src/entity/species.entity';
import { CreateSpeciesDto } from 'src/dto/speciesDto/createSpeciesDto.dto';

@ApiTags('Species')
@Controller('species')
@UseInterceptors(ClassSerializerInterceptor)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(SpeciesDto)
  getSpecies(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<SpeciesDto>> {
    return this.speciesService.getSpecies(pageOptionsDto)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The species has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createSpecies(@Body() newSpecies: CreateSpeciesDto) {
    this.speciesService.createSpecies(newSpecies)
  }

  @Put(':id')
  updateSpecies(@Param('id', ParseIntPipe) id: number, @Body() editSpecies: SpeciesDto) {
    this.speciesService.updateSpecies(id, editSpecies)
  }

  @Delete(':id')
  deleteSpecies(@Param('id', ParseIntPipe) id: number) {
    this.speciesService.deleteSpecies(id);
  }
}