import { Controller, Post, UseGuards, Body, Res, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

import { LocalAuthGuard } from '../auth/guards/local-auth.guards';

import { CreateUserDto } from './dto/createUserDto.dto';
import { Role } from '../auth/roles/role.enum';


@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({name: 'role', enum: Role})
  @Post('auth/register')
  async register(@Body() user: CreateUserDto, @Query('role') role: Role) {
    let idUser = await this.userService.createIndexUsers();
    return this.userService.registerUser(idUser, user, role);
  }
    
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: CreateUserDto, @Res() res: Response) {
    return this.authService.signIn(user, res);
    // return res.send({success: true})
  }
}