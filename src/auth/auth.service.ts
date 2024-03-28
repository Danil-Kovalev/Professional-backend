import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../users/dto/createUserDto.dto';
import { ReturnUserDto } from '../users/dto/returnUserDto.dto';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user: ReturnUserDto = await this.usersService.findOne(username);
    if (user && await this.verifyPassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}