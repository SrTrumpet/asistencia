import { InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class LoginDto{

    rut: string;

}