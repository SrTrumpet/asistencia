import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail} from "class-validator";

@ArgsType()
export class ForgorPassDto{

    @Field()
    @IsEmail()
    email: string;

}

//mapbox
//draw.oi para mostrar la arquitectura de nuestro proyecto
//demo tecnica, se debe mostrar el inspeccion del navegador