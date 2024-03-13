import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/usersDto/createUserDto.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(user: CreateUserDto): Promise<{ token }> {
    let idUser = await this.usersService.getIdUser(user.username)
    const userLogin = await this.usersService.findOne(user.username);

    const payload = { sub: idUser, username: user.username };
    const token = await this.jwtService.signAsync(payload, { secret: `${process.env.JWT_SECRET}` })
    return { token };

  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
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