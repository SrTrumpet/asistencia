import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    } from "@nestjs/common";
    import * as bcryptjs from "bcryptjs";
    import { randomBytes } from 'crypto';
    import { RegisterDto } from "./dto/register.dto";
    import { LoginDto } from "./dto/login.dto";
    import { ForgorPassDto } from "./dto/forgot-pass.dto";
    import { JwtService } from "@nestjs/jwt";
    import { UserService } from "src/user/user.service";
    import * as nodemailer from 'nodemailer';
import { AuthResponse } from "./entity/auth.response";
import { AuthEntity } from "./entity/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";



@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
    ) {}

    async login({ rut, password }: LoginDto): Promise<AuthResponse> {
        const user = await this.usersService.findByRut(rut);
        if (!user) {
            throw new UnauthorizedException("RUT no válido");
        }

        const auth = await this.authRepository.findOne({ where: { idUser: user.id } });
        if (!auth) {
            throw new UnauthorizedException("Usuario sin credenciales de autenticación");
        }

        const isPasswordValid = await bcryptjs.compare(password, auth.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Contraseña no válida");
        }

        const payload = { email: user.email, id: user.id, name: user.firstName };
        const token = await this.jwtService.signAsync(payload);

        return {
            message: "Login exitoso",
            token
        } as AuthResponse;
    }

}