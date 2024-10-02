import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { UserRoles } from 'src/user/enums/user-roles.enums'; 

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UserService;
    let jwtService: JwtService;
    let authRepository: Repository<AuthEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthService,
            {
            provide: UserService,
            useValue: {
                findByRut: jest.fn(),
            },
            },
            {
            provide: JwtService,
            useValue: {
                signAsync: jest.fn(),
            },
            },
            {
            provide: getRepositoryToken(AuthEntity),
            useClass: Repository,
            },
        ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
        authRepository = module.get<Repository<AuthEntity>>(getRepositoryToken(AuthEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should throw UnauthorizedException if user not found', async () => {
            const loginDto: LoginDto = { rut: '12345678-9', password: 'password' };
            jest.spyOn(usersService, 'findByRut').mockResolvedValue(null);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if auth entity not found', async () => {
            const loginDto: LoginDto = { rut: '12345678-9', password: 'password' };
            const user = { 
                id: 1, 
                email: 'test@example.com', 
                firstName: 'Test', 
                lastName: 'User', 
                rut: '12345678-9',
                role: UserRoles.Student
            };
            jest.spyOn(usersService, 'findByRut').mockResolvedValue(user);
            jest.spyOn(authRepository, 'findOne').mockResolvedValue(null);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if password is invalid', async () => {
            const loginDto: LoginDto = { rut: '12345678-9', password: 'password' };
            const user = { 
                id: 1, 
                email: 'test@example.com', 
                firstName: 'Test', 
                lastName: 'User', 
                rut: '12345678-9',
                role: UserRoles.Student
            }; 
            const authEntity = { 
                id: 1, 
                idUser: 1, 
                password: 'hashed-password'  
            };
            jest.spyOn(usersService, 'findByRut').mockResolvedValue(user);
            jest.spyOn(authRepository, 'findOne').mockResolvedValue(authEntity);
            jest.spyOn(bcryptjs, 'compare').mockResolvedValue(false);

            await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should return AuthResponse if login is successful', async () => {
            const loginDto: LoginDto = { rut: '12345678-9', password: 'password' };
            const user = { 
                id: 1, 
                email: 'test@example.com', 
                firstName: 'Test', 
                lastName: 'User', 
                rut: '12345678-9',
                role: UserRoles.Student
            }; 
            const authEntity = { 
                id: 1, 
                idUser: 1, 
                password: 'hashed-password'  
            };
            const token = 'test-token';

            jest.spyOn(usersService, 'findByRut').mockResolvedValue(user);
            jest.spyOn(authRepository, 'findOne').mockResolvedValue(authEntity);
            jest.spyOn(bcryptjs, 'compare').mockResolvedValue(true);
            jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

            const result = await service.login(loginDto);

            expect(result).toEqual({ message: 'Login exitoso', token });
        });
    });
});
