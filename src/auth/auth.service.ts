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

  async signIn(user: CreateUserDto, res: Response) {
    let idUser = await this.usersService.getIdUser(user.username)
    const userLogin: ReturnUserDto = await this.usersService.findOne(user.username);

    const payload = { sub: idUser, username: userLogin.username, role: userLogin.role};
    const token = await this.jwtService.signAsync(payload, { secret: `${process.env.JWT_SECRET}` })
    res.cookie('IsAuthenticated', true, {maxAge: 2*60*60*1000})
    res.cookie('Authentication', token, {httpOnly: true, maxAge: 2*60*60*1000})
    return { "success": true }

  }

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