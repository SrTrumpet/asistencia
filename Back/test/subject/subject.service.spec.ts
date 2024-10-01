import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from 'src/subject/subject.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/subject/entities/subject.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('SubjectService', () => {
    let service: SubjectService;
    let repository: Repository<SubjectEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            SubjectService,
            {
            provide: getRepositoryToken(SubjectEntity),
            useClass: Repository,
            },
        ],
        }).compile();

        service = module.get<SubjectService>(SubjectService);
        repository = module.get<Repository<SubjectEntity>>(getRepositoryToken(SubjectEntity));
    });

    it('should add a new subject', async () => {
        const createSubjectDto = { name: 'Math', numberOfClasses: 10 };
        const subjectEntity = { id: 1, ...createSubjectDto };
        jest.spyOn(repository, 'save').mockResolvedValue(subjectEntity as SubjectEntity);

        expect(await service.addNewSubject(createSubjectDto)).toEqual(subjectEntity);
        expect(repository.save).toHaveBeenCalledWith(createSubjectDto);
    });

    it('should throw an error when subject not found for deletion', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);
        await expect(service.deleteSubject('Math')).rejects.toThrow(BadRequestException);
    });

    it('should delete a subject', async () => {
        const subjectEntity = { id: 1, name: 'Math', numberOfClasses: 10 };
        jest.spyOn(repository, 'findOne').mockResolvedValue(subjectEntity as SubjectEntity);
        jest.spyOn(repository, 'remove').mockResolvedValue(subjectEntity as any);

        expect(await service.deleteSubject('Math')).toBe(true);
        expect(repository.remove).toHaveBeenCalledWith(subjectEntity);
    });

    it('should update a subject', async () => {
        const updateSubjectDto = { name: 'Math', numberOfClasses: 20 };
        const subjectEntity = { id: 1, name: 'Math', numberOfClasses: 10 };
        jest.spyOn(repository, 'findOne').mockResolvedValue(subjectEntity as SubjectEntity);
        jest.spyOn(repository, 'save').mockResolvedValue({ ...subjectEntity, numberOfClasses: 20 });

        const result = await service.updateSubject(updateSubjectDto);
        expect(result.numberOfClasses).toBe(20);
        expect(repository.save).toHaveBeenCalled();
    });
});
