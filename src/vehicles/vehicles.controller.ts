import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
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

@ApiTags('Vehicles')
@Controller('vehicles')
@UseInterceptors(ClassSerializerInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Get()
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnVehiclesDto)
  getVehicles(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnVehiclesDto>> {
    return this.vehiclesService.getVehicles(pageOptionsDto);
  }

  @UseInterceptors(ResponseInterceptor)
  @Get(':id')
  getVehicle(@Param('id', ParseIntPipe) idVehicle: number): Promise<ReturnVehiclesDto> {
    return this.vehiclesService.getVehicle(idVehicle)
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