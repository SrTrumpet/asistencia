import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from 'src/auth/auth.resolver';
import { AuthService } from 'src/auth/auth.service';
import { AuthResponse } from 'src/auth/entity/auth.response';
import { LoginDto } from 'src/auth/dto/login.dto';

describe('AuthResolver', () => {
    let resolver: AuthResolver;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AuthResolver,
            {
            provide: AuthService,
            useValue: {
                login: jest.fn(),
            },
            },
        ],
        }).compile();

        resolver = module.get<AuthResolver>(AuthResolver);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('login', () => {
        it('should call AuthService login and return AuthResponse', async () => {
        const loginDto: LoginDto = { rut: '12345678-9', password: 'password' };
        const authResponse: AuthResponse = { message: 'Login exitoso', token: 'test-token' };

        jest.spyOn(authService, 'login').mockResolvedValue(authResponse);

        const result = await resolver.login(loginDto);

        expect(authService.login).toHaveBeenCalledWith(loginDto);
        expect(result).toEqual(authResponse);
        });
    });
});
