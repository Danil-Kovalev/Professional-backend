import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { ReturnUserDto } from 'src/dto/usersDto/returnUserDto.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        return req?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any, req: Request) {
    const user: ReturnUserDto = await this.userService.findOne(payload.username);
    if (!payload || !user) throw new UnauthorizedException()
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}