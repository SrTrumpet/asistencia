import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsistEntity } from "./entities/asist.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AsistEntity])],
})

export class AsistModule{};