import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/createUserDto.dto';
import { ReturnUserDto } from './dto/returnUserDto.dto';

import { Users } from './entity/user.entity';
import { Role } from '../auth/roles/role.enum';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) { }

  /**
   * Find user by username
   * @param usernameUser
   * @returns user with it username
   */
  async findOne(usernameUser: string): Promise<ReturnUserDto> {
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
   * Register user and write data to database
   * @param idUser new id user
   * @param newUser data user
   * @param role user
   */
  async registerUser(idUser: number, newUser: CreateUserDto, role: Role) {
    let users = this.usersRepository.create(newUser);
    users.id = idUser;
    users.role = role;
    this.usersRepository.save(users);
    return { id: users.id, username: users.username, role: users.role }
  }
}