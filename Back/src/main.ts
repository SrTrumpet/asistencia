import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Web Asistencia")
    .setDescription("Web para la toma de asistencia, cumple con lo basico, agregar asignaturas, alumnos y profesores")
    .setVersion("1.0")
    .addTag("Primeras pruebas de Swagger")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(3000);
}
bootstrap();
