import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

import { Role } from '../auth/roles/role.enum';

import { Roles } from '../auth/roles/roles.decorator';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { CreateVehiclesDto } from './dto/createVehiclesDto.dto';
import { ReturnVehiclesDto } from './dto/returnVehiclesDto.dto';

import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';

import { VehiclesService } from './vehicles.service';



@ApiTags('Vehicles')
@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  /**
   * Gets all vehicles from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data vehicles
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnVehiclesDto)
  getVehicles(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnVehiclesDto>> {
    return this.vehiclesService.getVehicles(pageOptionsDto);
  }

  /**
   * Gets one vehicle by id from database
   * @param idVehicle for found entity from database
   * @returns data vehicle
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ResponseInterceptor) //forming base appearance data
  getVehicle(@Param('id', ParseIntPipe) idVehicle: number): Promise<ReturnVehiclesDto> {
    return this.vehiclesService.getVehicle(idVehicle)
  }

  /**
   * Create new vehicle entity and save to database
   * @param newVehicles data new entity
   */
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'The vehicles has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createVehicles(@Body() newVehicles: CreateVehiclesDto) {
   return this.vehiclesService.createVehicle(newVehicles)
  }

  /**
   * Update entity by id and save to database
   * @param id for found vehcile from database
   * @param editVehicles new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateVehicles(@Param('id', ParseIntPipe) id: number, @Body() editVehicles: CreateVehiclesDto) {
    return this.vehiclesService.updateVehicles(id, editVehicles)
  }

  /**
   * Delete entity by id
   * @param id for found vehicle in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteVehicles(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.deleteVehicles(id)
  }
}