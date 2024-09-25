import { Resolver, Args, Mutation, Query, Context} from '@nestjs/graphql';
import { SubjectService } from './subject.service';

@Resolver()
export class SubjectResolver{
    
    constructor (private readonly authService : SubjectService){}

    
}