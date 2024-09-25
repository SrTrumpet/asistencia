import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubjectEntity } from "./entities/subject.entity";

@Module({
    imports : [ TypeOrmModule.forFeature([ SubjectEntity ])],
})

export class SubjectModule{}