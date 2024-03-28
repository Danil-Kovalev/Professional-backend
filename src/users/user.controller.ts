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
  async registerUser(@Body() user: CreateUserDto, @Query('role') role: Role) {
    return this.userService.registerUser(user, role);
  }
    
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async signIn(@Body() user: CreateUserDto) {
    return this.userService.signIn(user);
    // res.cookie('IsAuthenticated', true, {maxAge: 2*60*60*1000})
    // res.cookie('Authentication', token, {httpOnly: true, maxAge: 2*60*60*1000})
    // return { "success": true }
  }
}