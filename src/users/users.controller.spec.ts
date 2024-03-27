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
    let serviceAuth: AuthService
    let serviceUser: UsersService
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
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
            controllers: [UserController],
            providers: [AuthService, UsersService, JwtService],
        }).overrideProvider(UsersService).useValue(mockUserService).compile();

        controller = module.get<UserController>(UserController)
        serviceAuth = module.get<AuthService>(AuthService)
        serviceUser = module.get<UsersService>(UsersService)
    })

    it('should be defined user', () => {
        expect(controller).toBeDefined();
    })

    describe('create user', () => {
        it('should be create user', async () => {
            const newUser: CreateUserDto = { ...mockUser }
            const result = await serviceUser.registerUser(1, newUser, Role.User);

            expect(serviceUser.registerUser).toHaveBeenCalled()
            expect(result).toEqual(mockReturnUser)
        })
    })

    describe('login user', () => {
        it('should be login user', async () => {
            jest.spyOn(serviceAuth, 'signIn').mockResolvedValueOnce({ "success": true })

            const result = await serviceAuth.signIn(mockUser, response)

            expect(serviceAuth.signIn).toHaveBeenCalled()
            expect(result).toEqual({ "success": true })
        })
    })
})