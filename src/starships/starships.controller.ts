import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreateStarshipsDto } from 'src/dto/starshipsDto/createStarshipsDto.dto';
import { ReturnStarshipsDto } from 'src/dto/starshipsDto/returnStarshipsDto.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';

@ApiTags('Starships')
@Controller('starships')
@UseInterceptors(ClassSerializerInterceptor)
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnStarshipsDto)
  getStarships(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnStarshipsDto>> {
    return this.starshipsService.getStarships(pageOptionsDto)
  }

  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getStarship(@Param('id', ParseIntPipe) idStarship: number): Promise<ReturnStarshipsDto> {
    return this.starshipsService.getStarship(idStarship)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The starships has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createStarships(@Body() newStarships: CreateStarshipsDto) {
    let indexNewStarships: number = await this.starshipsService.createIndexStarships();
    this.starshipsService.updateStarships(indexNewStarships, newStarships)
  }

  @Put(':id')
  updateStarships(@Param('id', ParseIntPipe) id: number, @Body() editStarships: CreateStarshipsDto) {
    this.starshipsService.updateStarships(id, editStarships);
  }

  @Delete(':id')
  deleteStarships(@Param('id', ParseIntPipe) id: number) {
    this.starshipsService.deleteStarships(id);
  }
}