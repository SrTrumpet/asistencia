import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./entity/auth.entity";


@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity])],

})

export class AuthModule{}

