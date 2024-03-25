import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeoplesService } from './peoples.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';
import { ReturnPeopleDto } from '../dto/peoplesDto/returnPeople.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { CreatePeopleDto } from '../dto/peoplesDto/createPeople.dto';


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
    return this.peoplesService.createPeople(newPeople);
  }

  /**
   * Update entity by id and save to database
   * @param id for found people from database
   * @param editPeople new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updatePeople(@Param('id', ParseIntPipe) id: number, @Body() editPeople: CreatePeopleDto) {
    return this.peoplesService.updatePeople(id, editPeople);
  }

  /**
   * Delete entity by id
   * @param id for found people in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deletePeople(@Param('id', ParseIntPipe) id: number) {
    return this.peoplesService.deletePeople(id);
  }
}