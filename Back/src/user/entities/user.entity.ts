import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {ObjectType, Field, ID} from '@nestjs/graphql';
import { UserRoles } from '../enums/user-roles.enums';

@ObjectType()
@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;
    
    @Column()
    @Field()
    rut: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    role: UserRoles;
}