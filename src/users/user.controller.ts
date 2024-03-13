import { Controller, Request, Post, UseGuards, Get, Body, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guards';
import { CreateUserDto } from 'src/dto/usersDto/createUserDto.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('auth/register')
  async register(@Body() user: CreateUserDto) {
    let idUser = await this.userService.createIndexUsers();
    this.userService.registerUser(idUser, user);
  }
    
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: CreateUserDto, @Res() res: Response) {
    const { token } = await this.authService.signIn(user);
    res.cookie('IsAuthenticated', true, {maxAge: 2*60*60*1000})
    res.cookie('Authentication', token, {httpOnly: true, maxAge: 2*60*60*1000})
    return res.send({success: true})
  }
}