import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';

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
    let indexNewStarships: number = await this.starshipsService.createIndexStarships();
    this.starshipsService.updateStarships(indexNewStarships, newStarships)
  }

  /**
   * Update entity by id and save to database
   * @param id for found starship from database
   * @param editStarships new data for update entity in database
   */
  @Put(':id')
  @Roles(Role.Admin)
  updateStarships(@Param('id', ParseIntPipe) id: number, @Body() editStarships: CreateStarshipsDto) {
    this.starshipsService.updateStarships(id, editStarships);
  }

  /**
   * Delete entity by id
   * @param id for found starship in database and delete it
   */
  @Delete(':id')
  @Roles(Role.Admin)
  deleteStarships(@Param('id', ParseIntPipe) id: number) {
    this.starshipsService.deleteStarships(id);
  }
}