import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS crash course API')
    .setDescription('Diving deep into Nests features')
    .setVersion('1.0')
    .addTag('nestjs-nuggets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log('Application started on: ' + 'http://localhost:' + port);
}
bootstrap();
