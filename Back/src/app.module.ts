import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AsistModule } from './asist/asist.module';
import { SubjectModule } from './subject/subject.module';

import { GraphQLModule } from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports:[
    AsistModule,
    SubjectModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3312,
      database: "db_asist",
      username: "asist_db",
      password: "root",
      autoLoadEntities: true,
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src', 'graphql', 'schema.gql'),
      playground: true,
      context: ({ req }) => ({ req })
    }),


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
