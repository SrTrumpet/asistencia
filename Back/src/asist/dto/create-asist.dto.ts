import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsistItemDto {
    idUser: number;
    idSubject: number;
    asist: number;
}

export class CreateAsistDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAsistItemDto)
    asistencias: CreateAsistItemDto[];
}