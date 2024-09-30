import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {ObjectType, Field, ID} from '@nestjs/graphql';

@ObjectType()
export class AsistEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    idUser: number;

    @Column()
    @Field()
    idSubject: number;

    @Column()
    @Field()
    asist: number;

    @Column()
    @Field()
    absences: number;
}