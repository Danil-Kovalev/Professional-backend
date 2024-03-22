import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { VehiclesService } from './vehicles.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { CreateVehiclesDto } from 'src/dto/vehiclesDto/createVehiclesDto.dto';
import { ReturnVehiclesDto } from 'src/dto/vehiclesDto/returnVehiclesDto.dto';
import { ResponseInterceptor } from 'src/interceptors/baseResponse.interceptor';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';

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
    let indexNewVehicles: number = await this.vehiclesService.createIndexVehicles();
    this.vehiclesService.updateVehicles(indexNewVehicles, newVehicles)
  }

  /**
   * Update entity by id and save to database
   * @param id for found vehcile from database
   * @param editVehicles new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateVehicles(@Param('id', ParseIntPipe) id: number, @Body() editVehicles: CreateVehiclesDto) {
    this.vehiclesService.updateVehicles(id, editVehicles)
  }

  /**
   * Delete entity by id
   * @param id for found vehicle in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteVehicles(@Param('id', ParseIntPipe) id: number) {
    this.vehiclesService.deleteVehicles(id)
  }
}