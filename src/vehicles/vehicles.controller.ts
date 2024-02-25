import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response.decorator';
import { VehiclesService } from './vehicles.service';
import { ExcludeNullInterceptor } from 'src/interceptors/excludeNullException.interceptor';
import { VehiclesDto } from 'src/dto/vehiclesDto/vehicles.dto';
import { PageOptionsDto } from 'src/dto/pageDto/page-options.dto';
import { PageDto } from 'src/dto/pageDto/page.dto';
import { CreateVehiclesDto } from 'src/dto/vehiclesDto/createVehiclesDto.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
@UseInterceptors(ClassSerializerInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(VehiclesDto)
  getVehicles(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<VehiclesDto>> {
    return this.vehiclesService.getVehicles(pageOptionsDto);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The vehicles has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createVehicles(@Body() newVehicles: CreateVehiclesDto) {
    let indexNewVehicles: number = await this.vehiclesService.createIndexVehicles();
    this.vehiclesService.updateVehicles(indexNewVehicles, newVehicles)
  }

  @Put(':id')
  updateVehicles(@Param('id', ParseIntPipe) id: number, @Body() editVehicles: CreateVehiclesDto) {
    this.vehiclesService.updateVehicles(id, editVehicles)
  }

  @Delete(':id')
  deleteVehicles(@Param('id', ParseIntPipe) id: number) {
    this.vehiclesService.deleteVehicles(id)
  }
}