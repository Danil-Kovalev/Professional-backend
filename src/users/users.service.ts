import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/createUserDto.dto';
import { ReturnUserDto } from './dto/returnUserDto.dto';

import { Users } from './entity/user.entity';
import { Role } from '../auth/roles/role.enum';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) { }

  /**
   * Find user by username
   * @param usernameUser
   * @returns user with it username
   */
  async findOne(usernameUser: string) {
    let users = this.usersRepository.findOne({
      where: {
        username: usernameUser
      }
    })
    return users;
  }

  /**
   * Get id user by username
   * @param usernameUser
   * @returns id user
   */
  async getIdUser(usernameUser: string): Promise<number> {
    let user = await this.usersRepository.findOne({
      where: {
        username: usernameUser
      }
    })
    return user.id;
  }

  /**
     * Create index for new user by last id from database
     * @returns new id for user
     */
  async createIndexUsers(): Promise<number> {
    let itemCount: number = await this.usersRepository.createQueryBuilder().getCount();
    return itemCount + 1;
  }

  /**
   * Check data user in database, set token to cookie and return success result
   * @param user data for check user in database
   * @returns success result
   */
  async signIn(user: CreateUserDto) {
    const userLogin = await this.findOne(user.username);
    const payload = { sub: userLogin.id, username: userLogin.username, role: userLogin.role};
    const token = await this.jwtService.signAsync(payload, { secret: `${process.env.JWT_SECRET}` })
    return { "success": true };
  }


  /**
   * Register user and write data to database
   * @param idUser new id user
   * @param newUser data user
   * @param role user
   */
  async registerUser(newUser: CreateUserDto, role: Role) {
    let idUser = await this.createIndexUsers();
    let users = this.usersRepository.create(newUser);

    users.id = idUser;
    users.role = role;
    
    this.usersRepository.save(users);
    return { id: users.id, username: users.username, role: users.role }
  }
}