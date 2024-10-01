import { Resolver, Args, Mutation, Query, Context} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver()
export class UserResolver{
    
    constructor (private readonly userService : UserService){}

    @Mutation(() => UserEntity, {description: 'Create a new student by providing the name, rut, lastname, email and role'})
    async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<UserEntity>{
        return this.userService.addNewUser(createUserDto);
    }

    @Mutation(() => Boolean)
    async removeUser(@Args('rut') rut :string): Promise<boolean>{
        return this.userService.deleteUser(rut);
    }

    @Mutation(() => UserEntity, { description: 'Actualiza un usuario' })
    async updateUser(
        @Args('rut') rut: string,
        @Args('updateUserDto') updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.userService.updateUser(rut, updateUserDto);
    }

    @Query(() => UserEntity, { description: 'Busca un usuario por RUT' })
    async findByRut(@Args('rut') rut: string): Promise<UserEntity> {
        return this.userService.findByRut(rut);
    }
}