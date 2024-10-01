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


@Injectable()
export class AuthService {
constructor(private readonly usersService: UserService,
    private readonly jwtService: JwtService,
) {}


}