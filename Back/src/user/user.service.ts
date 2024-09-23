import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between, LessThan} from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ){}
}