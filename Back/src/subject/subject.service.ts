import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubjectEntity } from "./entities/subject.entity";
import { CreateSubjectDto } from "./dto/subject.dto";

@Injectable()
export class SubjectService{
    constructor (
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository : Repository<SubjectEntity>
    ){}

    async addNewSubject(createSubjectDto: CreateSubjectDto){
        return await this.subjectRepository.save(createSubjectDto);
    }

    async deleteSubject(){
        
    }

    async updateSubject(){
        
    }
}