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

  /**
   * Gets all peoples from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data species
   */
  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnPeopleDto)
  getPeoples(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnPeopleDto>> {
    return this.peoplesService.getPeoples(pageOptionsDto);
  }

  /**
   * Gets one people by id from database
   * @param idPeople for found entity from database
   * @returns data people
   */
  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getPeople(@Param('id', ParseIntPipe) idPeople: number): Promise<ReturnPeopleDto> {
    return this.peoplesService.getPeople(idPeople)
  }

  /**
   * Create new people entity and save to database
   * @param newPeople data new entity
   */
  @Post()
  @ApiResponse({ status: 201, description: 'The people has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPeoples(@Body() newPeople: CreatePeopleDto) {
    let indexNewPeople: number = await this.peoplesService.createIndexPeople();
    this.peoplesService.updatePeople(indexNewPeople, newPeople);
  }

  /**
   * Update entity by id and save to database
   * @param id for found people from database
   * @param editPeople new data for update entity in database
   */
  @Put(':id')
  updatePeople(@Param('id', ParseIntPipe) id: number, @Body() editPeople: CreatePeopleDto) {
    this.peoplesService.updatePeople(id, editPeople);
  }

  /**
   * Delete entity by id
   * @param id for found people in database and delete it
   */
  @Delete(':id')
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    this.peoplesService.deletePeople(id);
  }
}