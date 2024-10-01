//GraphQL
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

//Variables para la solicitud
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './entity/auth.response';
import { ForgorPassDto } from './dto/forgot-pass.dto';
import { LoginDto } from './dto/login.dto';

