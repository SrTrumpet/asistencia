import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between, LessThan} from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ){}

    async addNewUser(createUserDto: CreateUserDto){
        return await this.userRepository.save(createUserDto);
    }

    async deleteUser(rut: string): Promise<boolean> {
        const user = await this.userRepository.findOne({where: {rut}});
        if (!user){
            throw new BadRequestException('Usuario no encontrado');
        }
        await this.userRepository.remove(user);
        return true;
    }

    async updateUser(rut: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { rut } });
    
        if (!user) {
            throw new BadRequestException(`Usuario con rut ${rut} no encontrado`);
        }

        if (updateUserDto.firstName) {
            user.firstName = updateUserDto.firstName;
        }
        if (updateUserDto.lastName) {
            user.lastName = updateUserDto.lastName;
        }
        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }
    
        return await this.userRepository.save(user);
    }

    async findByRut(rut: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { rut } });
        if (!user) {
            throw new BadRequestException(`Usuario con RUT ${rut} no encontrado`);
        }
        return user;
    }

    async findUserById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
          select: ['id', 'firstName', 'lastName', 'rut'], // Seleccionar solo los campos necesarios
        });
    
        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
    
        return user;
    }
}