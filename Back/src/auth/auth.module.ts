import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./entity/auth.entity";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { jwtConstants } from '../auth/constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "src/user/user.module";


@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' }, 
        }),
        TypeOrmModule.forFeature([AuthEntity]), 
        UserModule, 
    ],
    providers: [AuthService, AuthResolver],
})

export class AuthModule{}

