import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthService } from "../auth/auth.service";
import { Users } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UsersService } from "./users.service";


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, AuthService, JwtService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}
