import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './entity/auth.response';
import { ForgorPassDto } from './dto/forgot-pass.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';


@Resolver()
export class AuthResolver{

    constructor (private readonly authService : AuthService){}

    @Mutation(() => AuthResponse)
    async login(@Args() loginDto: LoginDto): Promise<AuthResponse> {
        return this.authService.login(loginDto);
    }

}

