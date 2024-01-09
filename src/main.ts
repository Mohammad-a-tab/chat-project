import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('SAM Apis')
    .setDescription('Specific Application')
    .setVersion('3.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addBearerAuth()
    .addTag('SAM')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.useWebSocketAdapter(
    new IoAdapter(http.createServer(app.getHttpServer())),
  );
  app.use(express.static(path.join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
