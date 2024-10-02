import { Test, TestingModule } from '@nestjs/testing';
import { AsistResolver } from 'src/asist/asist.resolver';
import { AsistService } from 'src/asist/asist.service';
import { CreateAsistDto } from 'src/asist/dto/create-asist.dto';
import { UserWithAttendanceDto } from 'src/asist/dto/user-with-attendance.dto';
import { UserRoles } from 'src/user/enums/user-roles.enums';

describe('AsistResolver', () => {
  let resolver: AsistResolver;
  let asistService: AsistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AsistResolver,
        {
          provide: AsistService,
          useValue: {
            addAsistencias: jest.fn(),
            listUsersBySubject: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AsistResolver>(AsistResolver);
    asistService = module.get<AsistService>(AsistService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('takeAsist', () => {
    it('should call asistService.addAsistencias and return true', async () => {
      const createAsistDto: CreateAsistDto = { asistencias: [] };
      jest.spyOn(asistService, 'addAsistencias').mockResolvedValue([]);

      const result = await resolver.takeAsist(createAsistDto);

      expect(asistService.addAsistencias).toHaveBeenCalledWith(createAsistDto);
      expect(result).toEqual(true);
    });
  });

  describe('listUsersBySubject', () => {
    it('should call asistService.listUsersBySubject and return list of users with attendance', async () => {
        const idSubject = 1;
        const userWithAttendance: UserWithAttendanceDto[] = [
            { 
                user: { 
                    id: 1, 
                    firstName: 'Test', 
                    lastName: 'User', 
                    rut: '12345678-9',  
                    email: 'test@example.com',  
                    role: UserRoles.Student  // Usar el valor del enum UserRoles.Student
                }, 
                totalAsist: 5, 
                totalAbsences: 1 
            },
        ];

        jest.spyOn(asistService, 'listUsersBySubject').mockResolvedValue(userWithAttendance);

        const result = await resolver.listUsersBySubject(idSubject);

        expect(asistService.listUsersBySubject).toHaveBeenCalledWith(idSubject);
        expect(result).toEqual(userWithAttendance);
    });
});
});
