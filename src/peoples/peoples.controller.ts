import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PeoplesService } from './peoples.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { CreatePeopleDto } from 'src/dto/peoplesDto/createPeople.dto';
import { ReturnPeopleDto } from 'src/dto/peoplesDto/returnPeople.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';

@ApiTags('Peoples')
@Controller('people')
@UseInterceptors(ClassSerializerInterceptor)
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnPeopleDto)
  getPeoples(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPeopleDto>> {
    return this.peoplesService.getPeoples(pageOptionsDto);
  }

  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getPeople(@Param('id', ParseIntPipe) idPeople: number): Promise<ReturnPeopleDto> {
    return this.peoplesService.getPeople(idPeople)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The people has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPeoples(@Body() newPeople: CreatePeopleDto) {
    let indexNewPeople: number = await this.peoplesService.createIndexPeople();
    this.peoplesService.updatePeople(indexNewPeople, newPeople);
  }

  @Put(':id')
  updatePeople(@Param('id', ParseIntPipe) id: number, @Body() editPeople: CreatePeopleDto) {
    this.peoplesService.updatePeople(id, editPeople);
  }

  @Delete(':id')
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    this.peoplesService.deletePeople(id);
  }
}