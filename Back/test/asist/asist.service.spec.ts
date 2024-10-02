import { Test, TestingModule } from '@nestjs/testing';
import { AsistService } from 'src/asist/asist.service';
import { Repository } from 'typeorm';
import { AsistEntity } from 'src/asist/entities/asist.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { CreateAsistDto } from 'src/asist/dto/create-asist.dto';
import { UserRoles } from 'src/user/enums/user-roles.enums';

describe('AsistService', () => {
    let service: AsistService;
    let asistRepository: Repository<AsistEntity>;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AsistService,
            {
            provide: getRepositoryToken(AsistEntity),
            useClass: Repository,
            },
            {
            provide: UserService,
            useValue: {
                findUserById: jest.fn(),
            },
            },
        ],
        }).compile();

        service = module.get<AsistService>(AsistService);
        asistRepository = module.get<Repository<AsistEntity>>(getRepositoryToken(AsistEntity));
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('addAsistencias', () => {
        it('should add attendance for users', async () => {
        const createAsistDto: CreateAsistDto = { asistencias: [{ idUser: 1, idSubject: 1, asist: 1 }] };
        const asistEntity = new AsistEntity();

        jest.spyOn(asistRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(asistRepository, 'save').mockResolvedValue(asistEntity);

        const result = await service.addAsistencias(createAsistDto);

        expect(result).toEqual([asistEntity]);
        expect(asistRepository.findOne).toHaveBeenCalledWith({ where: { idUser: 1, idSubject: 1 } });
        expect(asistRepository.save).toHaveBeenCalledTimes(1);
        });

        it('should update existing attendance', async () => {
        const createAsistDto: CreateAsistDto = { asistencias: [{ idUser: 1, idSubject: 1, asist: 1 }] };
        const existingAsistEntity = { asist: 1, idUser: 1, idSubject: 1 } as AsistEntity;
        const updatedAsistEntity = { asist: 2, idUser: 1, idSubject: 1 } as AsistEntity;

        jest.spyOn(asistRepository, 'findOne').mockResolvedValue(existingAsistEntity);
        jest.spyOn(asistRepository, 'save').mockResolvedValue(updatedAsistEntity);

        const result = await service.addAsistencias(createAsistDto);

        expect(result).toEqual([updatedAsistEntity]);
        expect(asistRepository.findOne).toHaveBeenCalledWith({ where: { idUser: 1, idSubject: 1 } });
        expect(asistRepository.save).toHaveBeenCalledWith(existingAsistEntity);
        });
    });

    describe('listUsersBySubject', () => {
        it('should return users with attendance and absences', async () => {
        const asistencias = [
            { idUser: 1, idSubject: 1, asist: 5, absences: 1 } as AsistEntity,
        ];

        jest.spyOn(asistRepository, 'find').mockResolvedValue(asistencias);
        jest.spyOn(userService, 'findUserById').mockResolvedValue({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            rut: '12345678-9',          // Agregar el rut
            email: 'test@example.com',   // Agregar el email
            role: UserRoles.Student,     // Usar el enum UserRoles para role
        });

        const result = await service.listUsersBySubject(1);

        expect(result).toEqual([
            {
            user: {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                rut: '12345678-9',          // Incluir en la respuesta
                email: 'test@example.com',   // Incluir en la respuesta
                role: UserRoles.Student,     // Incluir en la respuesta
            },
            totalAsist: 5,
            totalAbsences: 1,
            },
        ]);
        expect(asistRepository.find).toHaveBeenCalledWith({ where: { idSubject: 1 } });
        });

        it('should throw NotFoundException if no attendance found', async () => {
        jest.spyOn(asistRepository, 'find').mockResolvedValue([]);

        await expect(service.listUsersBySubject(1)).rejects.toThrow(NotFoundException);
        });
    });
});
