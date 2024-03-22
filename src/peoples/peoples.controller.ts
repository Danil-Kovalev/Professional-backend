import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('Peoples')
@Controller('people')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.User, Role.Admin)
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
  @Roles(Role.User, Role.Admin)
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
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
  updatePeople(@Param('id', ParseIntPipe) id: number, @Body() editPeople: CreatePeopleDto) {
    this.peoplesService.updatePeople(id, editPeople);
  }

  /**
   * Delete entity by id
   * @param id for found people in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    this.peoplesService.deletePeople(id);
  }
}