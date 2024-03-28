import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { CreateUserDto } from './dto/createUserDto.dto'
import { PassportModule } from '@nestjs/passport';
import { Role } from '../auth/roles/role.enum';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

describe('UserController', () => {
    let controller: UserController;

    const mockUser = {
        username: "kowalski",
        password: "12345"
    }

    const mockReturnUser = {
        id: 1,
        username: "kowalski",
        role: Role.User
    }

    const mockUserService = {
        registerUser: jest.fn().mockResolvedValueOnce(mockReturnUser),
        signIn: jest.fn().mockResolvedValueOnce({ "success": true })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [UserController],
            providers: [AuthService, UsersService, JwtService],
        }).overrideProvider(UsersService).useValue(mockUserService).compile();

        controller = module.get<UserController>(UserController)
    })

    it('should be defined user', () => {
        expect(controller).toBeDefined();
    })

    describe('create user', () => {
        it('should be create user', async () => {
            const newUser: CreateUserDto = { ...mockUser }

            expect(await controller.registerUser(newUser, Role.User)).toEqual(mockReturnUser)
            expect(mockUserService.registerUser).toHaveBeenCalledWith(newUser, Role.User)
        })
    })

    describe('login user', () => {
        it('should be login user', async () => {
            const dto = { ...mockUser }

            expect(await controller.signIn(dto)).toEqual({ "success": true })
            expect(mockUserService.signIn).toHaveBeenCalledWith(dto)
        })
    })
})