import { Test, TestingModule } from '@nestjs/testing';
import { SubjectResolver } from 'src/subject/subject.resolver';
import { SubjectService } from 'src/subject/subject.service';
import { CreateSubjectDto } from 'src/subject/dto/createSubject.dto';
import { SubjectEntity } from 'src/subject/entities/subject.entity';

describe('SubjectResolver', () => {
    let resolver: SubjectResolver;
    let service: SubjectService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [SubjectResolver, {
            provide: SubjectService,
            useValue: {
            addNewSubject: jest.fn(),
            deleteSubject: jest.fn(),
            updateSubject: jest.fn(),
            },
        }],
        }).compile();

        resolver = module.get<SubjectResolver>(SubjectResolver);
        service = module.get<SubjectService>(SubjectService);
    });

    it('should create a subject', async () => {
        const createSubjectDto: CreateSubjectDto = { name: 'Math', numberOfClasses: 10 };
        const subject: SubjectEntity = { id: 1, name: 'Math', numberOfClasses: 10 };
        jest.spyOn(service, 'addNewSubject').mockResolvedValue(subject);

        expect(await resolver.createSubject(createSubjectDto)).toEqual(subject);
        expect(service.addNewSubject).toHaveBeenCalledWith(createSubjectDto);
    });

    it('should delete a subject', async () => {
        jest.spyOn(service, 'deleteSubject').mockResolvedValue(true);

        expect(await resolver.removeSubject('Math')).toBe(true);
        expect(service.deleteSubject).toHaveBeenCalledWith('Math');
    });

    it('should update a subject', async () => {
        const updateSubjectDto: CreateSubjectDto = { name: 'Math', numberOfClasses: 20 };
        const updatedSubject: SubjectEntity = { id: 1, name: 'Math', numberOfClasses: 20 };
        jest.spyOn(service, 'updateSubject').mockResolvedValue(updatedSubject);

        expect(await resolver.updateSubject(updateSubjectDto)).toEqual(updatedSubject);
        expect(service.updateSubject).toHaveBeenCalledWith(updateSubjectDto);
    });
});
