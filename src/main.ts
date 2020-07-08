import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { environment } from 'config/environment';
import { DatabaseBootstrap } from 'config/databaseBootstrap';

async function bootstrap() {
  const database = new DatabaseBootstrap();
  await database.initDb();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const options = new DocumentBuilder()
    .setTitle('Application to learn NestJS')
    .setDescription('Application use RavenDB')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(environment.server.port);
}
bootstrap();