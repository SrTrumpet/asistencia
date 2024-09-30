//Guardar Grupo de Estudiantes
//Marcar Asistencia
//

import { Repository } from 'typeorm';
import { AsistEntity } from "./entities/asist.entity";
import { Injectable } from '@nestjs/common';
import { CreateAsistDto } from './dto/create-asist.dto';

@Injectable()
export class AsistService{

    constructor(
    private readonly asistRepository : Repository<AsistEntity>
    ){}

    async addAsistencias(createAsistDto: CreateAsistDto): Promise<AsistEntity[]> {
        const { asistencias } = createAsistDto;
        const updatedAsistEntities: AsistEntity[] = [];
    
        for (const asistencia of asistencias) {
            const { idUser, idSubject, asist } = asistencia;
        
        let existingAsist = await this.asistRepository.findOne({
            where: { idUser, idSubject },
        });
    
        if (existingAsist) {
            if (asist === 1) {
                existingAsist.asist += 1;
            }
            updatedAsistEntities.push(await this.asistRepository.save(existingAsist));
        } else {
            const newAsist = this.asistRepository.create(asistencia);
            updatedAsistEntities.push(await this.asistRepository.save(newAsist));
        }
        }
        return updatedAsistEntities;
    }

}
