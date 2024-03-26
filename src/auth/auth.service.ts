import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../users/dto/createUserDto.dto';
import { ReturnUserDto } from '../users/dto/returnUserDto.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(user: CreateUserDto): Promise<{ token }> {
    let idUser = await this.usersService.getIdUser(user.username)
    const userLogin: ReturnUserDto = await this.usersService.findOne(user.username);

    const payload = { sub: idUser, username: userLogin.username, role: userLogin.role};
    const token = await this.jwtService.signAsync(payload, { secret: `${process.env.JWT_SECRET}` })
    return { token };

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