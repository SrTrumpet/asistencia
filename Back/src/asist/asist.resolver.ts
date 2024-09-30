import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { AsistService } from "./asist.service";


export class AsistResolver {

    constructor (private readonly asistService : AsistService){}


}