import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles/role.enum';
import { CreateUserDto } from 'src/dto/usersDto/createUserDto.dto';
import { ReturnUserDto } from 'src/dto/usersDto/returnUserDto.dto';
import { Users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
    ) { }

  async findOne(usernameUser: string): Promise<ReturnUserDto> {
    let users = this.usersRepository.findOne({
      where: {
        username: usernameUser
      }
    })
    return users;
  }

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

  async registerUser(idUser: number, newUser: CreateUserDto, role: Role) {
    let users = this.usersRepository.create(newUser);
    users.id = idUser;
    users.role = role;
    this.usersRepository.save(users);
  }
}