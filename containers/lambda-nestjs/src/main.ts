// import { ValidationPipe } from '@nestjs/common';
// require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from './config/config';
import { ValidationPipe } from './pipes/class-validator/validation.pipe';
import { GlobalExceptionsFilters } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Serverless Nest Mongo')
  .setDescription('Desafio Desarollador Fullstack')
  .setVersion('1.0')
  .addTag('items')
  .addTag('auth')
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('documentation', app, document)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionsFilters());
  await app.listen(config.default.develoment.port);
}
bootstrap();
