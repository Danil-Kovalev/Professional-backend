import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

import { Role } from '../auth/roles/role.enum';

import { Roles } from '../auth/roles/roles.decorator';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response.decorator';

import { PageOptionsDto } from '../dto/pageDto/page-options.dto';
import { PageDto } from '../dto/pageDto/page.dto';
import { CreateStarshipsDto } from './dto/createStarshipsDto.dto';
import { ReturnStarshipsDto } from './dto/returnStarshipsDto.dto';

import { ResponseInterceptor } from '../interceptors/baseResponse.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/excludeNullException.interceptor';

import { StarshipsService } from './starships.service';


@ApiTags('Starships')
@Controller('starships')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  /**
   * Gets all starships from database and slice by number page
   * @param pageOptionsDto number page
   * @returns data starsships
   */
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ExcludeNullInterceptor)
  @ApiPaginatedResponse(ReturnStarshipsDto)
  getStarships(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReturnStarshipsDto>> {
    return this.starshipsService.getStarships(pageOptionsDto)
  }

   /**
   * Gets one starship by id from database
   * @param idStarship for found entity from database
   * @returns data starship
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(ResponseInterceptor)
  getStarship(@Param('id', ParseIntPipe) idStarship: number): Promise<ReturnStarshipsDto> {
    return this.starshipsService.getStarship(idStarship)
  }

  /**
   * Create new starship entity and save to database
   * @param newStarships data new entity
   */
  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 201, description: 'The starships has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createStarships(@Body() newStarships: CreateStarshipsDto) {
    return this.starshipsService.createStarship(newStarships)
  }

  /**
   * Update entity by id and save to database
   * @param id for found starship from database
   * @param editStarships new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateStarships(@Param('id', ParseIntPipe) id: number, @Body() editStarships: CreateStarshipsDto) {
    return this.starshipsService.updateStarships(id, editStarships);
  }

  /**
   * Delete entity by id
   * @param id for found starship in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteStarships(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.deleteStarships(id);
  }
}